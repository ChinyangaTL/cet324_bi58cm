"use client";

import { verifyEmail } from "@/server-actions/verify-email";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.err);
      })
      .catch(() => {
        setError("something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="flex items-center w-full justify-center">
      <Card className="text-center">
        <CardHeader>Verifying Your Email</CardHeader>
        <CardContent className="flex flex-col items-center w-full justify-center">
          {!success && !error && <BeatLoader color="white" />}

          <div className="w-full">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>

          {success && (
            <Link
              href="/auth/login"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Email verified, back to login
            </Link>
          )}

          {error && (
            <Link
              href="/auth/login"
              className={buttonVariants({
                size: "sm",
                variant: "ghost",
              })}
            >
              Something went wrong, back to login
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationForm;
