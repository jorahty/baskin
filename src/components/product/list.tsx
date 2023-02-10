import { Product } from "@/graphql/product/schema";
import ProductCard from "./card";


export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </>
  );
}
