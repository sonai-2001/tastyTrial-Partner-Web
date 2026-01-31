import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
type StepAccountProps = {
  onNext: () => void;
};
const StepAccount = ({ onNext }: StepAccountProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant details</CardTitle>
        <p className="text-sm text-muted-foreground">Owner details to get started.</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Input placeholder="Owner name" />
        <Input placeholder="Email address" />
        <Input placeholder="Phone Number" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};

export default StepAccount;
