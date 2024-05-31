"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { LoginFormSchema } from "@/form-schemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import { login } from "@/server-actions/login";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { toast } from "sonner";
import PulseLoader from "react-spinners/PulseLoader";
import OauthButtons from "./oauth-buttons";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        console.log(data);
        setError(data?.err);
        setSuccess(data?.success);

        if (data?.err) {
          toast.error(data?.err, { duration: 5000, dismissible: true });
        }

        if (data?.success) {
          toast.success(data?.success, { duration: 5000, dismissible: true });
        }
      });
    });
  };

  return (
    <Card className="min-w-[350px] w-[450px]">
      <CardHeader className="flex items-center justify-center">
        Cyber Locket
      </CardHeader>
      <CardContent>
        <div className="text-center my-7">
          <h2 className="text-2xl">Login</h2>
          <div className="flex items-center justify-center px-0 mx-0">
            <p className="text-sm">Do not have an account?</p>
            <Button className="text-sm  text-primary" variant="link">
              <Link
                href="/auth/register"
                className={buttonVariants({
                  variant: "link",
                  className: "px-0 mx-0",
                })}
              >
                <p className="text-sm font-semibold">Sign up</p>
              </Link>
            </Button>
          </div>
        </div>
        <FormSuccess message={success} />
        <FormError message={error || urlError} />

        <div className="mb-6 flex flex-col">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onFormSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2  focus:border-transparent"
                          {...field}
                          placeholder="Email Address"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-full outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:border-transparent"
                          {...field}
                          placeholder="Password"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-center">
                <ReCAPTCHA
                  sitekey="6LfpLu0pAAAAAA9ocEVLlNb0MrMJY_EeGRnGH305"
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>

              <Button
                disabled={recaptchaValue === null || isPending}
                className="w-full rounded-full"
                type="submit"
              >
                {isPending ? <PulseLoader color="white" size="5px" /> : "Login"}
              </Button>
            </form>
            <Button
              asChild
              disabled={isPending}
              variant="link"
              className="self-center"
            >
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </Button>
          </Form>
        </div>
        <div className="flex relative my-6">
          <Separator className="border-t flex-1 border-grey-dark absolute left-0 right-0 top-1/2" />

          <p className="text-small leading-normal relative text-center text-color-secondary px-3 mx-auto bg-black">
            Or
          </p>
        </div>

        {
          <OauthButtons
            isPending={isPending}
            recaptchaValidated={recaptchaValue}
          />
        }
      </CardContent>
    </Card>
  );
};

export default LoginForm;
