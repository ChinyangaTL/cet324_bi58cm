"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
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
import { ResetPasswordFormSchema } from "@/form-schemas";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onFormSubmit = (values: z.infer<typeof ResetPasswordFormSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    // startTransition(() => {
    //   resetPassword(values).then((data) => {
    //     setError(data?.err);
    //     setSuccess(data?.success);
    //   });
    // });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>Reset Your Password</CardHeader>

      <CardContent>
        <CardDescription className="mb-5">
          Enter your email to recieve a password reset link
        </CardDescription>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="email@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isPending}>
              Send reset email
            </Button>
          </form>
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
