import React from "react";

import { signOut } from "@/auth";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button size={"sm"} variant={"link"} type="submit">
        <LogOut color="white" />
      </Button>
    </form>
  );
}

export default LogoutButton;
