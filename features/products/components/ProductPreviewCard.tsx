import { Product } from "@/app/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ProductPreviewCard({ product }: { product: Product }) {
  return (
    <div className="bg-muted/90 flex flex-col max-w-full rounded-sm cursor-pointer">
      <Link href={`/dashboard/products/${product.id}`}>
        <Image
          src={product.images[0]}
          alt="image"
          width={600}
          height={400}
          className="rounded-t-sm w-full object-fill h-fit"
        />
        <div className="p-2">
          <div className="text-lg font-semibold">{product.name}</div>
          <div className=" flex justify-between">
            <div className="text-sm text-muted-foreground">
              price: {product.price}
            </div>
            <div className="text-sm text-muted-foreground">
              stock : {product.stock}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
