import z from "zod";

export const registerSchema = z
  .object({
    email: z.email({
      message: "Email is required.",
    }),
    password: z
      .string()
      .min(8, "Password must be 8 words.")
      .max(8, "Password must be 8 words."),
    confirmPassword: z
      .string()
      .min(8, "Password must be 8 words.")
      .max(8, "Password must be 8 words."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

/*
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // shows error on confirmPassword field
});
*/
