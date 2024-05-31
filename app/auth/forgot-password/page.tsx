import { ResetPasswordForm } from "@/components/reset-password-form";
import React, { Suspense } from "react";

const ForgotPassword = () => {
  return (
    <Suspense>
      <div className="w-full h-full flex items-center justify-center">
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
};

export default ForgotPassword;
