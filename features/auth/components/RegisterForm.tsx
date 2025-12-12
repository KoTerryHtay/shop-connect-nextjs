"use client";

import { useActionState } from "react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../actions/register";
import { registerSchema } from "../validations/registerSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/Password-Input";

export default function RegisterForm() {
  const [state, action] = useActionState(register, {
    errors: {},
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof registerSchema>) {}

  return (
    <div className="w-lg pt-4 pb-8 lg:pt-32 max-lg:self-center">
      <div className="bg-white rounded-xl w-full pt-10 px-6 pb-10">
        <div className="font-bold text-2xl">Register</div>
        <section className="w-full pt-2">
          <Form {...form}>
            <form action={action} className="space-y-8">
              {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email{" "}
                      {state.message && (
                        <span className="text-sm text-red-500">
                          {state.message}
                        </span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        required
                        inputMode="numeric"
                        minLength={8}
                        maxLength={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm your Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        required
                        inputMode="numeric"
                        minLength={8}
                        maxLength={8}
                        {...field}
                        placeholder="Enter your password again"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                className="bg-[rgba(0,153,149,1)] text-white py-2 px-4 border border-solid border-transparent hover:cursor-pointer rounded-sm h-9 w-full"
                type="submit"
              >
                Register
              </button>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </section>
        <div className="text-center font-semibold text-sm text-muted-foreground pt-2">
          <span className="">
            Have a TikTok Shop or TikTok for Business account?
          </span>
          <Link href={"/login"}>
            <span className="cursor-pointer text-blue-500 ml-4">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
