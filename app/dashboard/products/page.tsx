"use client";

import { useGetAllProducts } from "@/features/products/hooks/useGetAllProducts";
import ProductPreviewCard from "@/features/products/components/ProductPreviewCard";
import AllProductSkeltonLoading from "@/features/products/components/AllProductSkeltonLoading";

export default function NewProductPage() {
  const { data: products, isLoading } = useGetAllProducts();

  console.log("all products >>>", products);

  if (isLoading || !products) return <AllProductSkeltonLoading />;

  return (
    <div className="p-12 md:p-4 w-full max-w-3xl self-center">
      <div className="text-xl font-semibold">Product Management</div>
      <div className="mt-2 bg-muted/50 p-8 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products.products.map((product) => (
          <ProductPreviewCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
