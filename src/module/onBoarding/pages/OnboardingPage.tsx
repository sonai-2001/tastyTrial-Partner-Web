'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';

import OnboardingStep from '../components/OnboardingStep';
import PaymentDetails from '../components/OnboardingSteps/PaymentDetails';
import RestaurantDetails from '../components/OnboardingSteps/RestaurantDetails';
import ServiceAvailability from '../components/OnboardingSteps/ServiceAvailability';
import ServiceSelection from '../components/OnboardingSteps/ServiceSelector';
import { onboardingSchema, TOnboardingFormValues } from '../schemas/onboardingSchema';
import { useGetOnboardingDetails, useUpdateOnboarding } from '@/api/hooks/onboarding/hooks';
import { IUpdateOnboardingDto } from '@/api/hooks/onboarding/schema';

const stepFields: Record<number, (keyof TOnboardingFormValues)[]> = {
  1: ['serviceType'],
  2: [
    'restaurantName',
    'ownerName',
    'email',
    'phone',
    'address',
    'city',
    'pincode',
    'cuisines',
    'fssaiLicenseNumber',
    'restaurantImages',
  ],
  3: ['availability'],
  4: ['accountHolderName', 'bankName', 'accountNumber', 'ifscCode'],
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const { data: userData, isLoading } = useGetOnboardingDetails();
  const updateOnboarding = useUpdateOnboarding();

  const methods = useForm<TOnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onChange',
    defaultValues: {
      serviceType: 'delivery',
      restaurantName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      cuisines: [],
      gstNumber: '',
      fssaiLicenseNumber: '',
      restaurantImages: [],
      availability: {
        Monday: { enabled: false, open: '', close: '' },
        Tuesday: { enabled: false, open: '', close: '' },
        Wednesday: { enabled: false, open: '', close: '' },
        Thursday: { enabled: false, open: '', close: '' },
        Friday: { enabled: false, open: '', close: '' },
        Saturday: { enabled: false, open: '', close: '' },
        Sunday: { enabled: false, open: '', close: '' },
      },
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
    },
  });

  const { trigger, getValues, reset } = methods;

  useEffect(() => {
    if (userData?.data) {
      const details = userData.data;

      const initialAvailability: any = {};
      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ] as const;

      // Map API array back to form object
      days.forEach((dayName) => {
        const existing = details.serviceAvailability?.find((d) => d.day === dayName);
        initialAvailability[dayName] = {
          enabled: existing ? !!existing.isOpen : false,
          open: existing?.openTime || '',
          close: existing?.closeTime || '',
        };
      });

      reset({
        serviceType:
          details.serviceType === 'delivery_dining'
            ? 'both'
            : details.serviceType === 'delivery_only'
              ? 'delivery'
              : details.serviceType === 'dining_only'
                ? 'dining'
                : 'delivery',
        restaurantName: details.restaurantDetails?.restaurantName || '',
        ownerName: details.restaurantDetails?.ownerName || '',
        email: details.restaurantDetails?.email || '',
        phone: details.restaurantDetails?.phone || '',
        address: details.restaurantDetails?.address || '',
        city: details.restaurantDetails?.city || '',
        pincode: details.restaurantDetails?.pincode || '',
        cuisines: details.restaurantDetails?.cuisines || [],
        gstNumber: details.restaurantDetails?.gstNumber || '',
        fssaiLicenseNumber: details.restaurantDetails?.fssaiNumber || '',
        restaurantImages: details.restaurantDetails?.images || [],
        availability: initialAvailability,
        accountHolderName: details.paymentDetails?.accountHolderName || '',
        bankName: details.paymentDetails?.bankName || '',
        accountNumber: details.paymentDetails?.accountNumber || '',
        ifscCode: details.paymentDetails?.ifscCode || '',
        upiId: details.paymentDetails?.upiId || '',
      });

      if (details.step) {
        setStep(details.step);
      }
    }
  }, [userData, reset]);

  const onNextStep = async () => {
    const fieldsToValidate = stepFields[step];
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      const currentValues = getValues();
      const nextStep = Math.min(step + 1, 4);

      // Determine if we should update the step in the backend
      const lastStepFromBackend = userData?.data?.step || 1;
      const stepToBackend = Math.max(lastStepFromBackend, nextStep);

      // Transform form data to payload structure
      const payload: IUpdateOnboardingDto = {
        step: stepToBackend,
        serviceType: (currentValues.serviceType === 'both'
          ? 'delivery_dining'
          : currentValues.serviceType === 'delivery'
            ? 'delivery_only'
            : 'dining_only') as IUpdateOnboardingDto['serviceType'],
        restaurantDetails: {
          restaurantName: currentValues.restaurantName,
          ownerName: currentValues.ownerName,
          email: currentValues.email,
          phone: currentValues.phone,
          address: currentValues.address,
          city: currentValues.city,
          pincode: currentValues.pincode,
          cuisines: currentValues.cuisines,
          gstNumber: currentValues.gstNumber,
          fssaiNumber: currentValues.fssaiLicenseNumber,
          images: currentValues.restaurantImages,
        },
        serviceAvailability: Object.entries(currentValues.availability).map(([day, data]) => ({
          day,
          openTime: data.open,
          closeTime: data.close,
          isOpen: data.enabled,
        })),
        paymentDetails: {
          accountHolderName: currentValues.accountHolderName,
          bankName: currentValues.bankName,
          accountNumber: currentValues.accountNumber,
          ifscCode: currentValues.ifscCode,
          upiId: currentValues.upiId,
        },
      };


      updateOnboarding.mutate(payload);

      setStep(nextStep);
    }
  };

  const onBackStep = () => setStep((s) => Math.max(s - 1, 1));

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return <ServiceSelection onNext={onNextStep} />;
      case 2:
        return <RestaurantDetails onNext={onNextStep} onBack={onBackStep} />;
      case 3:
        return <ServiceAvailability onNext={onNextStep} onBack={onBackStep} />;
      case 4:
        return <PaymentDetails onNext={onNextStep} onBack={onBackStep} />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-6xl shadow-xl">
      <CardContent className="grid gap-5 md:grid-cols-3 p-8">
        {/* Steps */}
        <div className="hidden md:block">
          <OnboardingStep currentStep={step - 1} />
        </div>

        {/* Form */}
        <div className="md:col-span-2 max-h-[75vh] overflow-y-auto pr-2 ">
          <FormProvider {...methods}>{renderStepForm()}</FormProvider>
        </div>
      </CardContent>
    </Card>
  );
}
