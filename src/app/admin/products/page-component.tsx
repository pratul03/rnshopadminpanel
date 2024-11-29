"use client";

import { FC, useState } from "react";
import { PlusIcon } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ProductsWithCategoriesResponse } from "@/app/admin/products/products.types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category } from "@/app/admin/categories/categories.types";
import {
  createOrUpdateProductSchema,
  CreateOrUpdateProductSchema,
} from "@/app/admin/products/schema";
import { imageUploadHandler } from "@/actions/categories";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/actions/products";
import { ProductForm } from "@/app/admin/products/product-form";
import { ProductTableRow } from "@/app/admin/products/product-table-row";

type Props = {
  categories: Category[];
  productsWithCategories: ProductsWithCategoriesResponse;
};

export const ProductPageComponent: FC<Props> = ({
  categories,
  productsWithCategories,
}) => {
  const [currentProduct, setCurrentProduct] =
    useState<CreateOrUpdateProductSchema | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<CreateOrUpdateProductSchema>({
    resolver: zodResolver(createOrUpdateProductSchema),
    defaultValues: {
      title: "",
      category: undefined,
      price: undefined,
      maxQuantity: undefined,
      heroImage: undefined,
      images: [],
      intent: "create",
    },
  });

  const router = useRouter();

  const productCreateHandler = async (data: CreateOrUpdateProductSchema) => {
    const {
      category,
      images,
      maxQuantity,
      price,
      title,
      heroImage,
      slug,
      intent = "create",
    } = data;

    const uploadFile = async (file: File) => {
      const uniqueId = uuid();
      const fileName = `product/product-${uniqueId}-${file.name}`;
      const fromData = new FormData();
      fromData.append("file", file, fileName);
      return imageUploadHandler(fromData);
    };

    let heroImageUrl: string | undefined;
    let imageUrls: string[] = [];

    if (heroImage) {
      const imagePromise = Array.from(heroImage).map((file) =>
        uploadFile(file as File)
      );
      try {
        [heroImageUrl] = await Promise.all(imagePromise);
      } catch (error) {
        console.log("Error uploading image:", error);
        toast.error("error uploading image");
        return;
      }
    }
    if (images.length > 0) {
      const imagePromises = Array.from(images).map((file) => uploadFile(file));

      try {
        imageUrls = (await Promise.all(imagePromises)) as string[];
      } catch (error) {
        console.log("Error uploading images:", error);
        toast.error("Error uploading images");
        return;
      }
    }

    switch (intent) {
      case "create": {
        if (heroImageUrl && imageUrls.length > 0) {
          await createProduct({
            category: Number(category),
            images: imageUrls,
            heroImage: heroImageUrl,
            maxQuantity: Number(maxQuantity),
            price: Number(price),
            title,
          });
          form.reset();
          router.refresh();
          setIsProductModalOpen(false);
          toast.success("Product created successfully");
        }
        break;
      }
      case "update": {
        if (heroImageUrl && imageUrls.length > 0 && slug) {
          await updateProduct({
            category: Number(category),
            heroImage: heroImageUrl!,
            imagesUrl: imageUrls,
            maxQuantity: Number(maxQuantity),
            price: Number(price),
            title,
            slug,
          });
        }
      }
    }
  };
  return <div>ProductPageComponent</div>;
};
