import { NewPasswordForm } from "@/components/new-password-form";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense>
      <div className="w-full h-full flex items-center justify-center">
        <NewPasswordForm />
      </div>
    </Suspense>
  );
};

export default NewPasswordPage;
