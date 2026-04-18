import { Controller, useFormContext } from 'react-hook-form';

import CuisineSelector from '@/commonComponets/cuisine/CuisineSelector';
import FileUploader from '@/commonComponets/fileUpload/FIleUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { TOnboardingFormValues } from '../../schemas/onboardingSchema';

type StepAccountProps = {
  cuisines: any[];
  onNext: () => void;
  onBack: () => void;
};

const RestaurantDetails = ({ cuisines, onNext, onBack }: StepAccountProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TOnboardingFormValues>();

  console.log('errors are ', errors)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant details</CardTitle>
        <p className="text-sm text-muted-foreground">Fill the details of your restaurant.</p>
      </CardHeader>

      {/* Restaurant Details Form */}
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="restaurantName">Restaurant Name</Label>
          <Input id="restaurantName" placeholder="Restaurant Name" {...register('restaurantName')} />
          {errors.restaurantName && (
            <p className="text-xs text-destructive">{errors.restaurantName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" placeholder="Owner Name" {...register('ownerName')} />
          {errors.ownerName && <p className="text-xs text-destructive">{errors.ownerName.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Email Address" {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone Number" {...register('phone')} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Restaurant Address</Label>
          <Input id="address" placeholder="Restaurant Address" {...register('address')} />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" {...register('city')} />
            {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" placeholder="Pincode" {...register('pincode')} />
            {errors.pincode && <p className="text-xs text-destructive">{errors.pincode.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Cuisines (Select up to 3)</Label>
          <Controller
            control={control}
            name="cuisines"
            render={({ field }) => (
              <CuisineSelector
                max={3}
                options={cuisines}
                values={field.value}
                onChange={(values) => field.onChange(values)}
              />
            )}
          />
          {errors.cuisines && (
            <p className="text-xs text-destructive">{errors.cuisines.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number (Optional)</Label>
            <Input id="gstNumber" placeholder="GST Number" {...register('gstNumber')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fssaiLicenseNumber">FSSAI License Number</Label>
            <Input
              id="fssaiLicenseNumber"
              placeholder="FSSAI License Number"
              {...register('fssaiLicenseNumber')}
            />
            {errors.fssaiLicenseNumber && (
              <p className="text-xs text-destructive">{errors.fssaiLicenseNumber.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Restaurant Images (Select at least 1)</Label>
          <Controller
            control={control}
            name="restaurantImages"
            render={({ field }) => (
              <FileUploader
                max={5}
                value={field.value}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />
          {errors.restaurantImages && (
            <p className="text-xs text-destructive">{errors.restaurantImages.message}</p>
          )}
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

export default RestaurantDetails;
