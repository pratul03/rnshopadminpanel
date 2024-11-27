"use server";

import { createClient } from "@/supabase/server";
import slugify from "slugify";
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from "../app/admin/products/products.types";
import { createProductSchemaServer } from "@/app/admin/products/schema";

const supabase = createClient();
export const getProductWithCategories =
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
