import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./form-schemas";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = await LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null; // might not have password if they use oauth
          }

          const doPasswordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (doPasswordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
