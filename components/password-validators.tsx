import { cn } from "@/lib/utils";
import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// @ts-ignore
const PasswordValidators = ({ form }) => {
  return (
    <div>
      {form.formState.errors.password?.message && (
        <ul className="mt-2 text-sm">
          {Object.keys(form.formState.errors.password?.message).map((m, i) => {
            const { pass, message } =
              // @ts-ignore
              form.formState.errors.password?.message[m];

            return (
              <li key={i} className="flex items-center gap-2">
                <span>
                  {pass ? (
                    <FaCheckCircle color="#10b981" />
                  ) : (
                    <FaExclamationCircle color="#dc2626" />
                  )}
                </span>
                <span>
                  <p
                    className={cn(
                      pass && "text-emerald-500",
                      !pass && "text-[#dc2626]"
                    )}
                  >
                    {message}
                  </p>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PasswordValidators;
