"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { getVerificationTokenByToken } from "@/lib/verification-token";

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { err: "Invalid token" };
  }

  const tokenHasExpired = new Date(existingToken.expiresAt) < new Date();

  if (tokenHasExpired) {
    return { err: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { err: "User does not exist" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified successfully" };
};
