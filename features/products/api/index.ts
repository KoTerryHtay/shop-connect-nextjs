import { api } from "@/lib/api";

export async function createProduct(formData: FormData) {
  const response = await api.post("/products", formData);

  return response.data;
}
