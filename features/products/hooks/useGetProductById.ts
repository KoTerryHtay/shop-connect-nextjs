import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api";
import { Product } from "@/app/generated/prisma/client";

interface ProductInterface {
  message: string;
  product: Product;
}

export function useGetProductById(productId: string) {
  return useQuery<ProductInterface>({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
}
