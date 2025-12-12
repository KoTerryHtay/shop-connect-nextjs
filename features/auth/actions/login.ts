"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/utils";

const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: {
        email?: string;
        password?: string;
      };
    }
  | undefined;

export async function LoginUser(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const result = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // console.log("create new user >>>", result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const checkUser = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (!checkUser) {
    return {
      message: {
        email: "user not found",
      },
    };
  }

  const checkPassword = await comparePassword(
    result.data.password,
    checkUser.password
  );

  if (!checkPassword) {
    return {
      message: {
        password: "password not correct",
      },
    };
  }

  // console.log("loginUser >>>", user);

  await signIn("credentials", {
    id: checkUser.id,
    email: checkUser.email,
    redirect: true,
    redirectTo: "/",
  });

  return {
    errors: {},
  };
}
