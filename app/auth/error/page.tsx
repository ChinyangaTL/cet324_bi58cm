import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const AuthErrorPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
        </CardHeader>
        <CardFooter>
          <Link href="/auth/login" className="text-primary">
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthErrorPage;
