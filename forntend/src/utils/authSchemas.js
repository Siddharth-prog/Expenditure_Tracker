import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

export const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const resetSchema = z.object({
  password: z.string().min(8, "Minimum 8 characters"),
  token: z.string().min(10, "Invalid or expired token"),
});
