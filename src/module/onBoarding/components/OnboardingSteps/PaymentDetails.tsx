'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { TOnboardingFormValues } from '../../schemas/onboardingSchema';

type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const PaymentDetails = ({ onNext, onBack }: StepAccountProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TOnboardingFormValues>();

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>

        <p className="text-sm text-muted-foreground">
          Enter your bank details and upload required documents
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-8">
        {/* Bank Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">Bank Account Details</h3>

          <div className="space-y-2">
            <Label htmlFor="accountHolderName">Account Holder Name</Label>
            <Input
              id="accountHolderName"
              placeholder="Account Holder Name"
              {...register('accountHolderName')}
            />
            {errors.accountHolderName && (
              <p className="text-xs text-destructive">{errors.accountHolderName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" placeholder="Bank Name" {...register('bankName')} />
            {errors.bankName && <p className="text-xs text-destructive">{errors.bankName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input id="accountNumber" placeholder="Account Number" {...register('accountNumber')} />
            {errors.accountNumber && (
              <p className="text-xs text-destructive">{errors.accountNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" placeholder="IFSC Code" {...register('ifscCode')} />
            {errors.ifscCode && <p className="text-xs text-destructive">{errors.ifscCode.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID (Optional)</Label>
            <Input id="upiId" placeholder="UPI ID (Optional)" {...register('upiId')} />
            {errors.upiId && <p className="text-xs text-destructive">{errors.upiId.message}</p>}
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
        <Button variant="secondary" className="w-full sm:w-auto" onClick={onBack}>
          Back
        </Button>

        <Button className="w-full sm:w-auto" onClick={onNext}>
          Finish
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentDetails;
