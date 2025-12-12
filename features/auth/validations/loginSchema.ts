import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(8, "Password must be 8 words.")
    .max(8, "Password must be 8 words."),
});
