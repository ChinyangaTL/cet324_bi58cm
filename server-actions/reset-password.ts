"use server";

import { ResetPasswordFormSchema } from "@/form-schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";

import * as z from "zod";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordFormSchema>
) => {
  const validatedFields = ResetPasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { err: "Something went wrong" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { err: "Email does not exist" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Password reset email sent" };
};
