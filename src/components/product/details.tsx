import { Product } from "@/graphql/product/schema";
import { Typography } from "@mui/joy";
import ProductCard from "./card";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <>
      <Typography level="h1">Product details</Typography>
      <Typography level="h2">Just reusing product card for now:</Typography>
      <ProductCard product={product}/>
    </>
  );
}
