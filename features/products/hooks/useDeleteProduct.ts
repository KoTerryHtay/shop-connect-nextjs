import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { deleteProduct } from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@/app/generated/prisma/client";

type DeleteProduct = {
  productId: string;
};

type OldProduct = { message: string; products: Product[] };

export function useDeleteProduct() {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ productId }: DeleteProduct) => deleteProduct(productId),
    onSuccess: (_, variable) => {
      // console.log("onSuccess");
      toast.success("Product successfully deleted", {
        position: "bottom-center",
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.setQueryData(["products"], (old: OldProduct) => {
        console.log("onSuccess old data >>>", old);
        if (!old) return;

        return {
          ...old,
          products: old.products.filter(
            (product) => product.id !== variable.productId
          ),
        };
      });

      router.push("/dashboard/products");
    },
  });
}
