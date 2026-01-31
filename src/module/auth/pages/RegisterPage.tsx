'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import RegisterSteps from '../components/RegisterStep';
import StepAccount from '../components/registerSteps/StepAccount';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const onNextStep = () => setStep((s) => Math.min(s + 1, 6));
  // const onBackStep = () => setStep((s) => Math.max(s - 1, 1));

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return <StepAccount onNext={onNextStep} />;
      case 2:
        return <div>Step 2</div>;
      case 3:
        return <div>Step 3</div>;
      case 4:
        return <div>Step 4</div>;
      case 5:
        return <div>Step 5</div>;
      case 6:
        return <div>Step 6</div>;
    }
  };
  return (
    <Card className="w-full max-w-4xl shadow-xl">
      <CardContent className="grid gap-10 md:grid-cols-3 p-8">
        {/* Steps */}
        <div className="hidden md:block">
          <RegisterSteps currentStep={step} />
        </div>

        {/* Form */}
        <div className="md:col-span-2">{renderStepForm()}</div>
      </CardContent>
    </Card>
  );
}
