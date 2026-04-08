import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    phoneNumber : z.string().min(10, 'Phone number must be at least 10 digits long').max(10, 'Phone number must be at most 10 digits long'),
    email : z.string().email('Invalid email address'),
    password : z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword : z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;


