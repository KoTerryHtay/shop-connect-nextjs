import { useActionState } from "react";

import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "../actions/login";
import { loginSchema } from "../validations/loginSchema";
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

export default function LoginForm() {
  const [state, action] = useActionState(LoginUser, {
    errors: {},
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof loginSchema>) {}

  console.log("error >>>", state?.message?.password);

  return (
    <div className="flex justify-center items-center">
      <div className="w-96">
        <section>
          <Form {...form}>
            <form
              action={action}
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email{" "}
                      {state?.message?.email && (
                        <span className="text-sm text-red-500">
                          {state.message.email}
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
                    <FormLabel>
                      <div className="flex justify-between w-full">
                        <div>
                          Password{" "}
                          {state?.message?.password && (
                            <span className="text-sm text-red-500">
                              {state.message.password}
                            </span>
                          )}
                        </div>
                        <Link href={"/"}>
                          <div className="text-xs text-muted-foreground">
                            Forgot the password?
                          </div>
                        </Link>
                      </div>
                    </FormLabel>
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
              <button
                className="bg-[rgba(0,153,149,1)] text-white py-2 px-4 border border-solid border-transparent hover:cursor-pointer rounded-sm h-9 w-full"
                type="submit"
              >
                Log in
              </button>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
}
