import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api";
import { getQueryClient } from "@/lib/queryClient";

type UpdateProduct = {
  productId: string;
  formData: FormData;
};

export function useUpdateProduct() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ formData, productId }: UpdateProduct) =>
      updateProduct(formData, productId),
    onSuccess: (_, variables) => {
      console.log("onSuccess");
      queryClient.invalidateQueries({
        queryKey: [`products/${variables.productId}`],
      });
    },
  });
}
