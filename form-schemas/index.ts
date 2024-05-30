import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Email cannot be empty" }),
    password: z.string(),
  })
  .superRefine(({ password }, checkPassComplexity) => {
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
        message: "Must contain at least one uppercase letter",
      },
      lowerCase: {
        pass: true,
        message: "Must contain at least one lowercase letter",
      },
      specialCh: {
        pass: true,
        message: "Must contain at least one special character",
      },
      totalNumber: { pass: true, message: "Must contain at least one number" },
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
        message: errObj,
      });
    }
  });

//   {form.formState.errors.password?.message && (
//     <ul className="mt-2 text-sm text-red-400">
//       {Object.keys(form.formState.errors.password?.message).map(
//         (m, i) => {
//           const { pass, message } =
//             form.formState.errors.password?.message[m];

//           return (
//             <li key={i}>
//               <span>{pass ? "✅" : "❌"}</span>
//               <span>{message}</span>
//             </li>
//           );
//         }
//       )}
//     </ul>
//   )}
