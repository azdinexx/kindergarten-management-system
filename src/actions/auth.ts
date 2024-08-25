"use server";
import { LoginFormSchema, LoginFormState } from "@/lib/auth_form_definitions";
import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
  // 1. Delete session
  // 2. Redirect user
  await deleteSession();
  redirect("/");
}

export async function login(state: LoginFormState, formData: FormData) {
  let form_email = formData.get("email");
  let form_password = formData.get("pwd");

  if (!form_email || !form_password)
    return {
      error: "please provide an email and password",
    };
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: form_email,
    password: form_password,
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
  switch (user.role) {
    case "ADMIN":
      redirect("/admin");
      break;
    case "PARENT":
      redirect("/parent");
      break;
    case "STAFF":
      redirect("/staff");
      break;
    case "TEACHER":
      redirect("/admin");
      break;
    default:
      redirect("/error");
      break;
  }
}
