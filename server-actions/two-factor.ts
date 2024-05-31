"use server";

import { z } from "zod";

import { db } from "@/lib/db";

import { TwoFAFromSchema } from "@/form-schemas";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/user";

type TSettings = z.infer<typeof TwoFAFromSchema>;

export async function settings(values: TSettings) {
  const user = await currentUser();

  if (!user)
    return {
      error: "Unauthorized",
    };

  const dbUser = await getUserById(user?.id!);

  if (!dbUser)
    return {
      error: "Unauthorized",
    };

  if (user.isOAuth) {
    values.isTwoFactorEnabled = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: "2FA status updated!",
  };
}
