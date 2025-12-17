"use client";

import { use } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);

  return <div className="p-8 md:p-4">ProductDetailPage {productId}</div>;
}
