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
  products: string;
  slug: string;
};

export type CategoriesWithProductsResponse = CategoryWithProducts[];
