"use client";

import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Save, Upload, X } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { createProductFormSchema } from "../validations/createProductFormSchema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ImagePreview {
  file: File;
  preview: string;
}

const MAX_IMAGES = 3;

export function UploadForm() {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      name: "White T-Shirts",
      description: "To style-obsessed people, the perfect white T-shirt",
      stock: 1,
      price: 0,
      images: [],
    },
  });

  const addImages = (files: File[]) => {
    const remainingSlots = MAX_IMAGES - images.length;
    const filesToAdd = files
      .slice(0, remainingSlots)
      .filter((file) => file.type.startsWith("image/"));

    const newPreviews: ImagePreview[] = [];

    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          file,
          preview: reader.result as string,
        });
        if (newPreviews.length === filesToAdd.length) {
          const updatedImages = [...images, ...newPreviews];

          setImages(updatedImages);
          // setImages((prev) => {
          //   const updated = [...prev, ...newPreviews];
          //   // form.setValue(
          //   //   "images",
          //   //   updated.map((img) => img.file)
          //   // );
          //   return updated;
          // });
          form.setValue(
            "images",
            updatedImages.map((img) => img.file),
            { shouldValidate: true }
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addImages(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    form.setValue(
      "images",
      updated.map((img) => img.file),
      { shouldValidate: true }
    );
  };

  const { mutate: createProduct } = useCreateProduct();

  const onSubmit = async (values: z.infer<typeof createProductFormSchema>) => {
    console.log("Form values >>>", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("stock", values.stock.toString());

    values.images.forEach((image) => {
      formData.append("images", image);
    });

    // console.log("formData >>>", formData);
    // console.log("formData values.images >>>", values.images);

    createProduct(formData);
    router.push("/dashboard/products");

    // try {
    // const response = await api.post("/products", formData);
    //   const response = await fetch("/api/products", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const result = await response.json();
    //   console.log("Success:", response.data);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     console.error("Axios error:", error.response?.data);
    //   } else {
    //     console.error("Network response was not ok. Error:", error);
    //   }
    // }
  };

  return (
    <Card className="w-full max-w-2xl mt-2">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          Basic Information
        </CardTitle>
        <CardDescription>
          Fill in the details below to submit your information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Total Stock"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description"
                      rows={4}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>
                    Image Upload
                    <span className="text-muted-foreground text-xs ml-2">
                      ({images.length}/{MAX_IMAGES})
                    </span>
                  </FormLabel>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square"
                        >
                          <Image
                            src={image.preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border-2 border-border"
                            width={200}
                            height={200}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">
                              Remove image {index + 1}
                            </span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {images.length < MAX_IMAGES && (
                    <>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 bg-secondary rounded-full">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF up to 10MB (Max {MAX_IMAGES} images)
                            </p>
                          </div>
                        </div>
                      </div>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              className="bg-[rgba(0,153,149,1)] text-white py-1 px-3 border border-solid border-transparent hover:cursor-pointer rounded-sm h-8 w-full flex items-center gap-1 justify-center"
              type="submit"
            >
              <Save className="size-4" />
              <div>Submit Form</div>
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
