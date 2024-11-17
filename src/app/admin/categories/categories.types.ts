export type Product = {
  id: number;
  title: string;
  slug: string;
  imagUrl: string[];
  price: number;
  heroImage: string;
  category: number;
  maxQuantity: number;
};

export type CategoriesWithProducts = {
  created_at: string;
  imageUrl: string;
  id: number;
  name: string;
  products: string;
  slug: string;
};

export type CategoriesWithProductsResponse = CategoriesWithProducts[];
