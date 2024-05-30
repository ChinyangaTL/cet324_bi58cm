"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { FaEnvelope, FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { LoginFormSchema } from "@/form-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log({ values });
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
                href="/auth/login"
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full rounded-full" type="submit">
                Login
              </Button>
            </form>
            <Button variant="link" className="self-center">
              Forgot your password?
            </Button>
          </Form>
        </div>
        <div className="flex relative my-6">
          <Separator className="border-t flex-1 border-grey-dark absolute left-0 right-0 top-1/2" />

          <p className="text-small leading-normal relative text-center text-color-secondary px-3 mx-auto bg-black">
            Or
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
            variant="outline"
          >
            <FaGoogle />
            <p>Sign in with google</p>
          </Button>
          <Button
            className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
            variant="outline"
          >
            <FaGithub />
            <p>Sign in with github</p>
          </Button>
          <Button
            className="w-full rounded-full flex items-center justify-center gap-2 transition-all duration-200 ease-in-out  hover:ring-2 hover:ring-primary hover:border-transparent"
            variant="outline"
          >
            <FaEnvelope />
            <p>Get a one time login code</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
