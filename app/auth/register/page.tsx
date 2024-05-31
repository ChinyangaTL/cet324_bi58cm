import RegisterForm from "@/components/register-form";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
