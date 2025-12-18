import z from "zod";

export const updateProductFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  stock: z
    .string()
    .refine((val) => Number(val) >= 1, { error: "Stock must be at least 1" }),
  price: z.string().refine((val) => Number(val) >= 500, {
    error: "Price must be at least 500",
  }),
  images: z
    .array(z.instanceof(File))
    // .min(1, { message: "Please upload at least 1 image." })
    // .max(3, { message: "You can upload a maximum of 3 images." })
    .optional(),
});
