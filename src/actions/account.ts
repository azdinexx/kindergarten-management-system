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
  const form_password = formData.get("pwd");
  const form_role = formData.get("role");

  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    message: `
    ${form_firstName} ${form_lastName} has been created successfully.
    ${form_email} is the email associated with the account.
    ${form_role} is the role assigned to the account.
    ${form_password} is the password associated with the account.
    `,
  };
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
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
}
