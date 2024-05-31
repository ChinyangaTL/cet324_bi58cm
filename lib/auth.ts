import { auth } from "@/auth";

export const currentUser = async () => {
  const data = await auth();

  return data?.user;
};
