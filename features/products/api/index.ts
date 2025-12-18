import { api } from "@/lib/api";

export async function createProduct(formData: FormData) {
  const response = await api.post("/products", formData);

  return response.data;
}

export async function updateProduct(formData: FormData, productId: string) {
  const response = await api.patch(`/products/${productId}`, formData);

  return response.data;
}

export async function deleteProduct(productId: string) {
  const response = await api.delete(`/products/${productId}`);

  return response.data;
}

export async function getAllProducts() {
  const response = await api.get("/products");

  return response.data;
}

export async function getProductById(productId: string) {
  const response = await api.get(`/products/${productId}`);

  return response.data;
}
