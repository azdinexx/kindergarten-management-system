import {
  CreateAccountFormSchema,
  CreateAccountFormState,
} from "@/lib/auth_form_definitions";
import { db } from "@/lib/db";

export async function create_new_account(
  state: CreateAccountFormState,
  formData: FormData
) {
  // getting the form values
  const form_firstName = formData.get("firstName");
  const form_lastName = formData.get("lastName");
  const form_email = formData.get("email");
  const form_password = formData.get("password");
  const form_role = formData.get("role");
  // Validate form fields
  const validatedFields = CreateAccountFormSchema.safeParse({
    firstName: form_firstName,
    lastName: form_lastName,
    email: form_email,
    password: form_password,
    role: form_role,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password, role } = validatedFields.data;

  // Call the provider or db to create a user...
  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      role,
    },
  });

  console.log(user);
}
