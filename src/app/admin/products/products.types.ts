import { Category } from "@/app/admin/categories/categories.types";

export type ProductWithCategory = {
  id: number;
  title: string;
  slug: string;
  imagUrl: string[];
  price: number;
  heroImage: string;
  category: Category;
  maxQuantity: number;
};

export type ProductsWithCategoriesResponse = ProductWithCategory[];

export type UpdateProductSchema = {
  category: number;
  heroImage: string;
  imageUrl: string;
  maxQuantity: string;
  price: number | null;
  slug: string;
  title: string;
};
