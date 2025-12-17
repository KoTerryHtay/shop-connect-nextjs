import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api";
import { Product } from "@/app/generated/prisma/client";

interface ProductInterface {
  message: string;
  products: Product[];
}

export function useGetAllProducts() {
  return useQuery<ProductInterface>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}
