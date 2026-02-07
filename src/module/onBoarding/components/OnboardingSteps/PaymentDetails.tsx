'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const PaymentDetails = ({ onNext, onBack }: StepAccountProps) => {
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

          <Input placeholder="Account Holder Name" />

          <Input placeholder="Bank Name" />

          <Input placeholder="Account Number" />

          <Input placeholder="IFSC Code" />

          <Input placeholder="UPI ID (Optional)" />
        </div>

        {/* Document Upload */}
        {/* <div className="space-y-4">

          <h3 className="text-sm font-semibold text-muted-foreground">
            Verification Documents
          </h3>


          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload bank passbook image
            </label>

            <Input type="file" accept="image/*,application/pdf" />

            <p className="text-xs text-muted-foreground">
              JPG, PNG, PDF (Max 5MB)
            </p>
          </div>


         
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Upload Aadhaar Card
            </label>

            <Input type="file" accept="image/*,application/pdf" />
          </div>

        </div> */}
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

export default PaymentDetails;
