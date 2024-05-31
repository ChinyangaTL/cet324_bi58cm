import LoginForm from "@/components/login-form";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
