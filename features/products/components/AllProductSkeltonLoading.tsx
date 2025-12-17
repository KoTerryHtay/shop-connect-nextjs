import { Skeleton } from "@/components/ui/skeleton";

export default function AllProductSkeltonLoading() {
  return (
    <div className="p-12 md:p-4 w-full max-w-3xl self-center">
      <div className="text-xl font-semibold">Product Management</div>
      <div className="mt-2 bg-muted/50 p-8 rounded-lg flex flex-wrap gap-8">
        <Skeleton className="bg-muted/50 aspect-video rounded-xl w-48 h-60" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl w-48 h-60" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl w-48 h-60" />
      </div>
    </div>
  );
}
