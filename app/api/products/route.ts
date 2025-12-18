import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(
    {
      message: "Get All Product successfully",
      products,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();

  try {
    const formData = await req.formData();

    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const stock = parseInt(formData.get("stock") as string);
    const price = parseFloat(formData.get("price") as string);

    console.log(
      "/api/products create products >>>",
      {
        name,
        description,
        stock,
        price,
      },
      typeof price
    );

    console.log("/api/products create products File >>>", files);

    // --- cloudinary ---
    // const uploadPromises = files.map(async (file) => {
    //   const arrayBuffer = await file.arrayBuffer();
    //   const buffer = Buffer.from(arrayBuffer);

    //   const uploadResult = new Promise((resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           resource_type: "image",
    //           folder: "Shop-Connect",
    //         },
    //         (error, results) => {
    //           if (error) return reject(error);
    //           resolve(results);
    //         }
    //       )
    //       .end(buffer);
    //   });

    //   return uploadResult;
    // });

    // const uploadResults = await Promise.all(uploadPromises);

    // const imageUrls = uploadResults.map(
    //   (result) => (result as { secure_url: string }).secure_url
    // );

    const imageUrls = [
      "https://res.cloudinary.com/dsronsjhr/image/upload/v1765807353/Shop-Connect/ronpspwol28gtloqkd0m.webp",
      "https://res.cloudinary.com/dsronsjhr/image/upload/v1765807353/Shop-Connect/u6acz0xiuaq2mmsxgoaz.webp",
      "https://res.cloudinary.com/dsronsjhr/image/upload/v1765807353/Shop-Connect/icgkk8b9kgngtdbkqp52.webp",
    ];

    // console.log("imageUrls >>>", imageUrls);

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        images: imageUrls,
        sellerId: session?.user.id,
      },
    });

    console.log("newProduct >>>", newProduct);

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Product Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
