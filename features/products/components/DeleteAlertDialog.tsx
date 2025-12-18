import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

export default function DeleteAlertDialog({
  productId,
}: {
  productId: string;
}) {
  const { mutate: deleteProduct } = useDeleteProduct();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <button
          className="bg-[#990024] text-white px-4 border border-solid border-transparent hover:cursor-pointer rounded-sm h-9 w-full"
          type="button"
        >
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this product ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your product data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[#990024] text-white hover:bg-[#aa1336] cursor-pointer"
            onClick={() => deleteProduct({ productId })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
