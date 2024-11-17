import { getCategoriesWithProducts } from "@/actions/categories";
import CategoryPageComponent from "./page-component";

export default async function Categories() {
  // Fetch categories
  const categories = await getCategoriesWithProducts();
  return <CategoryPageComponent categories={categories} />;
}
