const steps = ['Restaurant details', 'Owner details', 'Documents', 'Finish'];

export default function RegisterSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isActive
                      ? 'border-2 border-primary text-primary'
                      : 'border text-muted-foreground'
                }`}
            >
              {index + 1}
            </div>

            <span className={`text-sm ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
