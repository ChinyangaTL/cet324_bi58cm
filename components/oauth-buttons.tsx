import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const OauthButtons = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
        variant="outline"
        disabled={isPending}
      >
        <FcGoogle className="w-5 h-5" />
        <p>Sign in with Google</p>
      </Button>
      <Button
        className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
        variant="outline"
        disabled={isPending}
      >
        <FaGithub className="w-5 h-5" />
        <p>Sign in with Github</p>
      </Button>
    </div>
  );
};

export default OauthButtons;
