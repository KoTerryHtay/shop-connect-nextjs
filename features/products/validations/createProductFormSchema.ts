import z from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  stock: z.string(),
  price: z.string(),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "Please upload at least 1 image." })
    .max(3, { message: "You can upload a maximum of 3 images." }),
});
