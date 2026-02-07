import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
type StepAccountProps = {
  onNext: () => void;
  onBack: () => void;
};

const DocumentUplodedSection = ({ onNext, onBack }: StepAccountProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uplode details</CardTitle>
        <p className="text-sm text-muted-foreground">Uplode your restaurant documents.</p>
      </CardHeader>

      {/* Restaurant Menu Form */}
      <CardContent className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Upload resturent PAN image</label>
          <Input type="file" accept="image/*" className="cursor-pointer w-full" />

          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Upload resturent Aadhar image
          </label>
          <Input type="file" accept="image/*" className="cursor-pointer w-full" />

          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Upload resturent GST image</label>
          <Input type="file" accept="image/*" className="cursor-pointer w-full" />

          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Upload FSSAI / Trade License
          </label>
          <Input type="file" accept="image/*" className="cursor-pointer w-full" />

          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
        </div>
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

export default DocumentUplodedSection;
