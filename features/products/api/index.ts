import { api } from "@/lib/api";

export async function createProduct(formData: FormData) {
  const response = await api.post("/products", formData);

  return response.data;
}

export async function getAllProducts() {
  const response = await api.get("/products");

  return response.data;
}
