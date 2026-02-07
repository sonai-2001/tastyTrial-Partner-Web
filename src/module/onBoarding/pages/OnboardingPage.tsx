'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import OnboardingStep from '../components/OnboardingStep';
import ServiceSelection from '../components/OnboardingSteps/ServiceSelector';
import RestaurantDetails from '../components/OnboardingSteps/RestaurantDetails';
import ServiceAvailability from '../components/OnboardingSteps/ServiceAvailability';
import PaymentDetails from '../components/OnboardingSteps/PaymentDetails';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const onNextStep = () => setStep((s) => Math.min(s + 1, 4));
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
  return (
    <Card className="w-full max-w-6xl shadow-xl">
      <CardContent className="grid gap-5 md:grid-cols-3 p-8">
        {/* Steps */}
        <div className="hidden md:block">
          <OnboardingStep currentStep={step-1} />
        </div>

        {/* Form */}
        <div className="md:col-span-2 max-h-[75vh] overflow-y-auto pr-2 ">{renderStepForm()}</div>
      </CardContent>
    </Card>
  );
}
