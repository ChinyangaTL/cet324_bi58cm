import fs from "fs";
import path from "path";

export const isCommonPassword = (password: string) => {
  const filePath = path.resolve(process.cwd(), "lib/common-passwords.txt");
  const data = fs.readFileSync(filePath, "utf-8");
  const commonPasswords = data.split("\n").map((p) => p.trim());
  return commonPasswords.includes(password.toLowerCase());
};
