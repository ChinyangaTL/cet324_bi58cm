import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "./verification-token";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getTwofactorTokenByEmail } from "./two-factor-token";

export const generateVerficationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date().getTime() + 3600 * 1000; // an hour from now

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expiresAt: new Date(expiresAt),
    },
  });

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date().getTime() + 3600 * 1000; // an hour from now

  const existingToken = await getPasswordResetTokenByEmail(email);

  console.log({ existingToken });

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expiresAt: new Date(expiresAt),
    },
  });
  return passwordResetToken;
};

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwofactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return twoFactorToken;
}
