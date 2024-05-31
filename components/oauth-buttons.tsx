"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const OauthButtons = ({
  isPending,
  recaptchaValidated,
}: {
  isPending: boolean;
  recaptchaValidated: string | null;
}) => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
        variant="outline"
        disabled={recaptchaValidated === null || isPending}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <p>Sign in with Google</p>
      </Button>
      <Button
        className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
        variant="outline"
        disabled={recaptchaValidated === null || isPending}
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
        <p>Sign in with Github</p>
      </Button>
    </div>
  );
};

export default OauthButtons;
