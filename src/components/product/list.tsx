import { Product } from "@/graphql/product/schema";
import { Grid } from "@mui/joy";
import ProductCard from "./card";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <Grid container spacing={2} p={2} m={0}>
      {products.map((product, index) => (
        <Grid xl={3} lg={4} md={6} sm={6} xs={12} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
