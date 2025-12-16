"use client";

import { UploadForm } from "@/features/products/components/upload-form";

export default function NewProductPage() {
  return (
    <div className="p-4 w-full h-full">
      <div className="flex justify-center">
        <section className="w-full max-w-2xl">
          <div className="text-xl font-semibold">Add new product</div>

          <UploadForm />
          {/* <div className="bg-muted/50 mt-4 p-4"></div> */}
        </section>
      </div>
    </div>
  );
}
