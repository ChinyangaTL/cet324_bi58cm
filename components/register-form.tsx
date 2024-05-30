"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { RegisterFormSchema } from "@/form-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { register } from "@/server-actions/register";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        console.log(data);
        setError(data.err);
        setSuccess(data.success);

        if (data.success) {
          toast.success(data.success, { duration: 5000, dismissible: true });
        }

        if (data.err) {
          toast.error(data.err, { duration: 5000, dismissible: true });
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
          <h2 className="text-2xl">Create an account</h2>
          <p className="text-sm">
            Already have an account?
            <Button className="text-sm  text-primary" variant="link">
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "link",
                  className: "px-0 mx-0",
                })}
              >
                <p className="text-sm font-semibold">Log in</p>
              </Link>
            </Button>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
            variant="outline"
            disabled={isPending}
          >
            <FaGoogle />
            <p>Sign in with google</p>
          </Button>
          <Button
            className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
            variant="outline"
            disabled={isPending}
          >
            <FaGithub />
            <p>Sign in with github</p>
          </Button>
        </div>
        <div className="flex relative my-6">
          <Separator className="border-t flex-1 border-grey-dark absolute left-0 right-0 top-1/2" />

          <p className="text-small leading-normal relative text-center text-color-secondary px-3 mx-auto bg-black">
            Or continue with
          </p>
        </div>
        <div className="mb-6">
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
                          disabled={isPending}
                          className="w-full outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2  focus:border-transparent"
                          {...field}
                          placeholder="Email Address"
                          type="email"
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
                          disabled={isPending}
                          className="w-full outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:border-transparent"
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isPending}
                className="w-full rounded-full"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
