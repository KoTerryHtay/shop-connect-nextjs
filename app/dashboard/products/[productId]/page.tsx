"use client";

import { use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { useGetProductById } from "@/features/products/hooks/useGetProductById";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateForm } from "@/features/products/components/update-form";
import AllProductSkeltonLoading from "@/features/products/components/AllProductSkeltonLoading";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetProductById(productId);
  const product = data?.product;

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading || !product) return <AllProductSkeltonLoading />;

  return (
    <div className="p-12 md:p-4 w-full max-w-3xl self-center">
      <div className="mt-2 bg-muted/50 px-8 py-4 rounded-lg">
        <Button
          onClick={() => router.back()}
          size={"sm"}
          variant={"ghost"}
          className="-ml-4"
        >
          <ChevronLeft />
          Back
        </Button>
        {/* <div className="text-xl font-semibold">Product Management</div> */}
        <div className="flex mt-2 gap-4 items-center">
          <div className="shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={70}
              height={70}
              loading="eager"
            />
          </div>
          <div>
            <div className="text-xl font-semibold">{product.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {product.description}
            </div>
          </div>
        </div>
        <Separator className="my-3" />
        <Tabs defaultValue="product" className="w-full">
          <TabsList>
            <TabsTrigger className="font-bold px-6" value="product">
              Product
            </TabsTrigger>

            <TabsTrigger className="font-bold px-6" value="posts">
              Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <UpdateForm product={product} />
          </TabsContent>

          <TabsContent value="posts">
            <ProductPosts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function ProductPosts() {
  return (
    <div className="min-h-svh">
      <div>Product Posts</div>
    </div>
  );
}
