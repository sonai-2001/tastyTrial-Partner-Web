import { z } from 'zod';

export const serviceSelectionSchema = z.object({
  serviceType: z.enum(['both', 'delivery', 'dining'], {
    required_error: 'Please select a service type',
  }),
});

export const restaurantDetailsSchema = z.object({
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().min(6, 'Invalid pincode'),
  cuisines: z.array(z.string()).min(1, 'Select at least one cuisine'),
  gstNumber: z.string().optional(),
  fssaiLicenseNumber: z.string().min(1, 'FSSAI license number is required'),
  restaurantImages: z.array(z.any()).min(1, 'Upload at least one image'),
});

export const dailyAvailabilitySchema = z.object({
  enabled: z.boolean(),
  open: z.string().optional(),
  close: z.string().optional(),
}).refine((data) => !data.enabled || (data.open && data.close), {
  message: 'Please provide both open and close times',
  path: ['open'],
});

export const serviceAvailabilityBaseSchema = z.object({
  availability: z.object({
    Monday: dailyAvailabilitySchema,
    Tuesday: dailyAvailabilitySchema,
    Wednesday: dailyAvailabilitySchema,
    Thursday: dailyAvailabilitySchema,
    Friday: dailyAvailabilitySchema,
    Saturday: dailyAvailabilitySchema,
    Sunday: dailyAvailabilitySchema,
  }),
});

export const serviceAvailabilitySchema = serviceAvailabilityBaseSchema.refine((data) => {
  const enabledDays = Object.values(data.availability).filter(d => d.enabled);
  return enabledDays.length > 0;
}, {
  message: 'Select at least one day for availability',
  path: ['availability'],
});

export const paymentDetailsSchema = z.object({
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
  upiId: z.string().optional(),
});

export const onboardingSchema = serviceSelectionSchema
  .merge(restaurantDetailsSchema)
  .merge(serviceAvailabilityBaseSchema)
  .merge(paymentDetailsSchema)
  .superRefine((data, ctx) => {
    // Re-apply service availability check (at least one day enabled)
    const enabledDays = Object.values(data.availability).filter((d) => d.enabled);
    if (enabledDays.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select at least one day for availability',
        path: ['availability'],
      });
    }
  });

export type TOnboardingFormValues = z.infer<typeof onboardingSchema>;
