"use server";
import { RegisterFormSchema } from "@/form-schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validatedFields = RegisterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { err: "Invalid form data" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { err: "Email already exists" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "Email sent" };
};
