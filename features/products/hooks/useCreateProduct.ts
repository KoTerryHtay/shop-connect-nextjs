import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api";
import { getQueryClient } from "@/lib/queryClient";

export function useCreateProduct() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
