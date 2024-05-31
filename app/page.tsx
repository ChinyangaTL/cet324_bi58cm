import { ModeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Welcome To Cyber Locket</h1>
      <Link
        href="/auth/login"
        className={buttonVariants({
          className: "w-[100px]",
        })}
      >
        Login
      </Link>
      <ModeToggle />
    </main>
  );
}
