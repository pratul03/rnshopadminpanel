import { ProductWithCategory } from "@/app/admin/products/products.types";

export type Category = {
  created_at: string;
  id: number;
  imageUrl: string;
  name: string;
  slug: string;
};
export type CategoryWithProducts = {
  created_at: string;
  imageUrl: string;
  id: number;
  name: string;
  products: ProductWithCategory[];
  slug: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];
