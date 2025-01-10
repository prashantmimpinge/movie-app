import { z } from "zod";

export const emailValidation = z
  .string()
  .email({ message: "Invalid email address." });

export const signUpSchema = z.object({
  email: emailValidation,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
