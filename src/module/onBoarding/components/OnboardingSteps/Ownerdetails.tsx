import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};
const OwnerDetails = ({ onNext, onBack }: StepAccountProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Owner details</CardTitle>
        <p className="text-sm text-muted-foreground">Fill the details of the owner.</p>
      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-6">
        <Input placeholder="Owner name" />
        <Input placeholder="Email address" />
        <Input placeholder="Phone Number" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
      </CardContent>

      {/* Footer Next and Back Buttons */}
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

export default OwnerDetails;
