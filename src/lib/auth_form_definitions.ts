import { User } from "@prisma/client";
import { z } from "zod";

export const SignupFormSchema = z.object({
  prenom: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  nom: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      error?: string;
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: User["id"];
  userRole: User["role"];
  expiresAt: Date;
};

export type ProfileFormState =
  | {
      error?: string;
      success?: string;
    }
  | undefined;
