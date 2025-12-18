import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api";
import { getQueryClient } from "@/lib/queryClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateProduct() {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product successfully created", {
        position: "bottom-center",
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push("/dashboard/products");
    },
  });
}
