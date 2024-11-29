"use server";

import { createClient } from "@/supabase/server";
import slugify from "slugify";
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from "../app/admin/products/products.types";
import { CreateProductSchemaServer } from "../app/admin/products/schema";

const supabase = createClient();
export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const { data, error } = await supabase
      .from("product")
      .select("*, category:category(*)")
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
            Error fetching products with the categories: ${error.message}`);
    }
    return data || [];
  };

export const createProduct = async ({
  category,
  heroImage,
  images,
  maxQuantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from("product").insert({
    category,
    heroImage,
    imagesUrl: images,
    maxQuantity,
    price,
    slug,
    title,
  });
  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  imagesUrl,
  maxQuantity,
  price,
  title,
  slug,
}: UpdateProductSchema) => {
  const { data, error } = await supabase
    .from("product")
    .update({
      category,
      heroImage,
      imagesUrl,
      maxQuantity,
      price,
      title,
    })
    .match({ slug });
  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
  return data;
};

export const deleteProduct = async (slug: string) => {
  const { error } = await supabase.from("product").delete().match({ slug });
  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};
