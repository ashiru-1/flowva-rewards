import { z } from 'zod';

// Validation logic AND type definition
export const authSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
    
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});


export type AuthFormData = z.infer<typeof authSchema>;