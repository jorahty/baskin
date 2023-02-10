import { Product } from "@/graphql/product/schema";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      Hello ProductCard! ProductCard goes here.
      {product.title}
    </>
  );
}
