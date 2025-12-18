import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: RouteContext<"/api/products/[productId]">
) {
  const { productId } = await params;

  const product = await prisma.product.findFirst({
    where: { id: productId },
  });

  // console.log("product by id >>>", product);

  return NextResponse.json(
    {
      message: "Get Product successfully",
      product,
    },
    { status: 200 }
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext<"/api/products/[productId]">
) {
  const { productId } = await params;

  try {
    const formData = await req.formData();

    // const files = (formData.getAll("images") as File[]) || [];

    // console.log("PATCH new image file >>>", files);

    const session = await auth();

    // console.log("session user >>>", session?.user);

    // check exit product by productId and userId
    const checkProduct = await prisma.product.findFirst({
      where: { id: productId, sellerId: session?.user.id },
    });

    // console.log("checkProduct >>>", checkProduct);

    if (!checkProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // if (!files || files.length === 0) {
    //   return NextResponse.json(
    //     { message: "Image file is required" },
    //     { status: 400 }
    //   );
    // }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const stock = parseInt(formData.get("stock") as string);
    const price = parseFloat(formData.get("price") as string);
    const productImages = JSON.parse(formData.get("productImages") as string);

    // console.log("/api/products/id create products >>>", {
    //   productId,
    //   name,
    //   description,
    //   stock,
    //   price,
    //   productImages,
    // });
    // console.log("/api/products create products File >>>", files);

    // --- cloudinary ---
    // let uploadResults;

    // if (files.length) {
    //   const uploadPromises = files.map(async (file) => {
    //     const arrayBuffer = await file.arrayBuffer();
    //     const buffer = Buffer.from(arrayBuffer);

    //     const uploadResult = new Promise((resolve, reject) => {
    //       cloudinary.uploader
    //         .upload_stream(
    //           {
    //             resource_type: "image",
    //             folder: "Shop-Connect",
    //           },
    //           (error, results) => {
    //             if (error) return reject(error);
    //             resolve(results);
    //           }
    //         )
    //         .end(buffer);
    //     });

    //     return uploadResult;
    //   });

    //   uploadResults = await Promise.all(uploadPromises);
    // }

    // const imageUrls = uploadResults
    //   ? uploadResults.map(
    //       (result) => (result as { secure_url: string }).secure_url
    //     )
    //   : [];

    // const imageUrls = [
    //   "https://res.cloudinary.com/dsronsjhr/image/upload/v1765974735/Shop-Connect/fze5t0llevp8zmcgkjvt.webp",
    //   "https://res.cloudinary.com/dsronsjhr/image/upload/v1765974735/Shop-Connect/kbqwlqhovhclpxvugzim.webp",
    //   "https://res.cloudinary.com/dsronsjhr/image/upload/v1765807353/Shop-Connect/icgkk8b9kgngtdbkqp52.webp",
    // ];

    // console.log("imageUrls >>>", imageUrls);
    // const updateProduct = {
    //   name: name ?? checkProduct.name,
    //   price: price ?? checkProduct.price,
    //   stock: stock ?? checkProduct.stock,
    //   description: description ?? checkProduct.description,
    //   images: [...imageUrls, ...productImages],
    // };
    // console.log(">>>", updateProduct);

    const updatedProduct = await prisma.product.update({
      where: {
        id: checkProduct.id,
        sellerId: session?.user.id,
      },
      data: {
        name: name ?? checkProduct.name,
        price: price ?? checkProduct.price,
        stock: stock ?? checkProduct.stock,
        description: description ?? checkProduct.description,
        images: [...productImages],
        // images: [...imageUrls, ...productImages],
      },
    });

    console.log("updatedProduct >>>", updatedProduct);

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Product Updated Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
