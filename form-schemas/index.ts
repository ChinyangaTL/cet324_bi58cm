import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Email cannot be empty" }),
    password: z.string(),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const isAtLeastEightLetters = (password: string) => password.length >= 8;
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    let errObj = {
      upperCase: {
        pass: true,
        message: "Password must contain at least one uppercase letter",
      },
      lowerCase: {
        pass: true,
        message: "Password must contain at least one lowercase letter",
      },
      specialCh: {
        pass: true,
        message: "Password must contain at least one special character",
      },
      totalNumber: {
        pass: true,
        message: "Password must contain at least one number",
      },
      length: {
        pass: isAtLeastEightLetters(password),
        message: "Password must be at least 8 characters long",
      },
    };

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
    }
    if (countOfNumbers < 1) {
      errObj = {
        ...errObj,
        totalNumber: { ...errObj.totalNumber, pass: false },
      };
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        // @ts-ignore
        message: errObj,
      });
    }
  });
