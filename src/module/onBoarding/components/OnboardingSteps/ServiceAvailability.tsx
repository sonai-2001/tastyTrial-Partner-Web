

'use client';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { TOnboardingFormValues } from '../../schemas/onboardingSchema';

type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const ServiceAvailability = ({ onNext, onBack }: StepAccountProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TOnboardingFormValues>();

  const availability = watch('availability');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Availability</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill the time the restaurant is available for booking.
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-4">
        {daysOfWeek.map((day) => {
          const isEnabled = availability?.[day]?.enabled;
          const dayErrors = errors.availability?.[day] as any;
          return (
            <div key={day} className="space-y-1">
              <div
                className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center ${
                  isEnabled && dayErrors ? 'border-destructive' : ''
                }`}
              >
                {/* Checkbox */}
                <div className="flex items-center gap-2 w-32">
                  <Checkbox
                    id={`enabled-${day}`}
                    checked={!!isEnabled}
                    onCheckedChange={(checked) =>
                      setValue(`availability.${day}.enabled` as any, !!checked, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <label
                    htmlFor={`enabled-${day}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {day}
                  </label>
                </div>

                {/* Open Time */}
                <div className="flex-1">
                  <Input
                    type="time"
                    disabled={!isEnabled}
                    {...register(`availability.${day}.open` as any)}
                    placeholder="Open"
                    className={isEnabled && dayErrors?.open ? 'border-destructive' : ''}
                  />
                </div>

                {/* Close Time */}
                <div className="flex-1">
                  <Input
                    type="time"
                    disabled={!isEnabled}
                    {...register(`availability.${day}.close` as any)}
                    placeholder="Close"
                    className={isEnabled && dayErrors?.close ? 'border-destructive' : ''}
                  />
                </div>
              </div>
              {isEnabled && dayErrors && (
                <p className="text-xs text-destructive px-1">
                  {dayErrors.open?.message ||
                    dayErrors.close?.message ||
                    'Please provide both open and close times'}
                </p>
              )}
            </div>
          );
        })}
        {errors.availability && (errors.availability as any).root && (
          <p className="text-sm font-medium text-destructive">
            {(errors.availability as any).root.message}
          </p>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onBack}>
          Back
        </Button>

        <Button className="w-full sm:w-auto" onClick={onNext}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceAvailability;
