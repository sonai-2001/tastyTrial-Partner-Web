import CuisineSelector from '@/commonComponets/cuisine/CuisineSelector';
import FileUploader from '@/commonComponets/fileUpload/FIleUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};
const StepAccount = ({ onNext, onBack }: StepAccountProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant details</CardTitle>
        <p className="text-sm text-muted-foreground">Fill the details of your restaurant.</p>
      </CardHeader>
      
      {/* Restaurant Details Form */}
      <CardContent className="space-y-6">
        <Input placeholder="Restaurant Name" />
        <Input placeholder="Owner Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Input placeholder="Restaurant Address" />
        <Input placeholder="City" />
        <Input placeholder="Pincode" />
        {/* <Input placeholder="Cuisine Type (e.g. Indian, Chinese)" /> */}
        <CuisineSelector
          max={3}
          onChange={(values) => console.log('Selected cuisines:', values)}
        />
        <Input placeholder="GST Number (Optional)" />
        <Input placeholder="FSSAI License Number" />
        {/* Image Upload */}
          <FileUploader
          max={2}
          onChange={(files) => console.log('Uploaded files:', files)}
        />

      </CardContent>


      {/* Footer Next and Back Buttons */}
      <CardFooter className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-between">
      <Button
        variant="secondary"
        className="w-full sm:w-auto"
        onClick={onBack}
      >
        Back
      </Button>

      <Button
        className="w-full sm:w-auto"
        onClick={onNext}
      >
        Next
      </Button>
    </CardFooter>


    </Card>
  );
};

export default StepAccount;
