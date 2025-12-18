import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/generated/prisma/client";

export default function ProductPreviewCard({ product }: { product: Product }) {
  return (
    <div className="bg-muted/90 flex flex-col max-w-full rounded-sm cursor-pointer">
      <Link href={`/dashboard/products/${product.id}`}>
        <div className="relative w-full aspect-square overflow-hidden rounded-t-sm">
          <Image
            src={product.images[0]}
            alt="image"
            // width={600}
            // height={400}
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-2">
          <div className="text-lg font-semibold line-clamp-1">
            {product.name}
          </div>
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
