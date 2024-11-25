import { getCategoriesWithProducts } from "@/actions/categories";
import { ProductPageComponent } from "./page-component";

export default async function Product() {
  const categories = await getCategoriesWithProducts();

  return <ProductPageComponent categories={categories} />;
}
