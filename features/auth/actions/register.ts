"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils";

const SignUpFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignUpFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function register(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("create new user >>>", result);

  if (result.error) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingAcc = !!(await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
    // select: {
    //   email: true,
    // },
  }));

  if (existingAcc) {
    return {
      message: "User already exist!",
    };
  }

  // console.log("existingAcc >>>", existingAcc);

  const hashedPassword = await hashPassword(result.data.password);

  console.log("newUser hashPassword >>>", hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });

  console.log("newUser >>>", newUser);

  await signIn("credentials", {
    id: newUser.id,
    email: newUser.email,
    redirect: true,
    redirectTo: "/",
  });

  return {
    errors: {},
  };
}
