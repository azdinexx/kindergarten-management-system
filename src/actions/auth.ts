"use server";
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from "@/lib/auth_form_definitions";
import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup(state: SignupFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    prenom: formData.get("prenom"),
    nom: formData.get("nom"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { prenom, nom, email, password } = validatedFields.data;

  // Call the provider or db to create a user...
  const user = await db.user.create({
    data: {
      firstName: prenom,
      lastName: nom,
      email,
      password,
    },
  });
  await createSession(user.id, user.role);
  // 5. Redirect user
  redirect("/commercial");
}

export async function logout() {
  // 1. Delete session
  // 2. Redirect user
  await deleteSession();
  redirect("/");
}

export async function login(state: LoginFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = validatedFields.data;

  // Call the provider or db to create a user...
  const user = await db.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password",
    };
  }

  await createSession(user.id, user.role);
  // 5. Redirect user
  //
  if (user.role === "ADMIN") {
    return redirect("/admin");
  }
  redirect("/commercial");
}
