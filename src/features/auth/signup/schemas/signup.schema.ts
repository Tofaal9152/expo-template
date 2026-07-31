import { z } from "zod";

export const studentSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female"]),
});
export type StudentSignupData = z.infer<typeof studentSignupSchema>;
