"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { NewPasswordFormSchema } from "@/form-schemas";
import { Eye, EyeOff } from "lucide-react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { newPassword } from "@/server-actions/new-password";
import PulseLoader from "react-spinners/PulseLoader";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof NewPasswordFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.err);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>Enter a new password</CardHeader>
      <CardContent>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="********"
                        type="password"
                        disabled={isPending}
                        suffix={
                          <Button
                            variant="ghost"
                            className="hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </Button>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <PulseLoader color="white" size="5px" />
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
          <div className="flex justify-center mt-3 ">
            {form.formState.errors.password?.message && (
              <ul className="mt-2 text-sm">
                {Object.keys(form.formState.errors.password?.message).map(
                  (m, i) => {
                    const { pass, message } =
                      // @ts-ignore
                      form.formState.errors.password?.message[m];

                    return (
                      <li key={i} className="flex items-center gap-2">
                        <span>
                          {pass ? (
                            <FaCheckCircle color="#10b981" />
                          ) : (
                            <FaExclamationCircle color="#dc2626" />
                          )}
                        </span>
                        <span>
                          <p
                            className={cn(
                              pass && "text-emerald-500",
                              !pass && "text-[#dc2626]"
                            )}
                          >
                            {message}
                          </p>
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            )}
          </div>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-y-2">
        <div>
          <Button onClick={() => router.push("/")} variant={"link"} size={"sm"}>
            Back to login
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
