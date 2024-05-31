"use server";

import { NewPasswordFormSchema } from "@/form-schemas";
import { db } from "@/lib/db";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";
import { getUserByEmail } from "@/lib/user";

export const newPassword = async (
  values: z.infer<typeof NewPasswordFormSchema>,
  token?: string | null
) => {
  if (!token) {
    return { err: "Missing token" };
  }

  const validatedFields = NewPasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { err: "Invalid fields" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { err: "Invalid token" };
  }

  if (existingToken.expiresAt < new Date()) {
    return { err: "Token expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { err: "User not found" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password reset successfully" };
};
