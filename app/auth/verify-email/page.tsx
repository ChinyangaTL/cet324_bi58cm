import VerificationForm from "@/components/verification-form";
import { Suspense } from "react";

const VerificationPage = () => {
  return (
    <Suspense>
      <div className="w-full h-full flex items-center justify-center">
        <VerificationForm />
      </div>
    </Suspense>
  );
};

export default VerificationPage;
