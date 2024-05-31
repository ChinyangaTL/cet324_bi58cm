import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "./verification-token";

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
