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
import { useGetUserData, useOnboardingUpdate } from '../hooks/useOnboardingHooks';
import { onboardingSchema, TOnboardingFormValues } from '../schemas/onboardingSchema';

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
  const { data: userData, isLoading } = useGetUserData();
  const updateOnboarding = useOnboardingUpdate();

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
      // Pre-fill form with existing user data
      const details = userData.data.moreprofileDetails as any;
      
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
      const initialAvailability: any = {};
      days.forEach(day => {
        const existing = details?.availability?.[day];
        initialAvailability[day] = {
          enabled: existing ? !!existing.enabled : false,
          open: existing?.open || '',
          close: existing?.close || '',
        };
      });

      reset({
        serviceType: details?.serviceType || '',
        restaurantName: details?.restaurantName || '',
        ownerName: details?.ownerName || '',
        email: userData.data.email || '',
        phone: details?.phone || '',
        address: details?.address || '',
        city: details?.city || '',
        pincode: details?.pincode || '',
        cuisines: details?.cuisines || [],
        gstNumber: details?.gstNumber || '',
        fssaiLicenseNumber: details?.fssaiLicenseNumber || '',
        restaurantImages: details?.restaurantImages || [],
        availability: initialAvailability,
        accountHolderName: details?.accountHolderName || '',
        bankName: details?.bankName || '',
        accountNumber: details?.accountNumber || '',
        ifscCode: details?.ifscCode || '',
        upiId: details?.upiId || '',
      });

      // Set initial step from backend if available
      if (details?.onboardingStep) {
        setStep(details.onboardingStep);
      }
    }
  }, [userData, reset]);

  const onNextStep = async () => {
    const fieldsToValidate = stepFields[step];
    const isValid = await trigger(fieldsToValidate as any);

    if (isValid) {
      const currentValues = getValues();
      const nextStep = Math.min(step + 1, 4);

      // Filter availability to only include enabled days
      const filteredAvailability = Object.entries(currentValues.availability || {}).reduce(
        (acc, [day, data]) => {
          if (data.enabled) {
            acc[day] = data;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      // Determine if we should update the step in the backend
      const lastStepFromBackend = (userData?.data?.moreprofileDetails as any)?.onboardingStep || 1;
      const stepToBackend = Math.max(lastStepFromBackend, nextStep);

      updateOnboarding.mutate({
        ...currentValues,
        availability: filteredAvailability,
        onboardingStep: stepToBackend,
      });

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
