import { Product } from "@/graphql/product/schema";
import { Box, Stack } from "@mui/joy";
import ProductCard from "./card";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <Stack direction="row" gap={3} p={3} flexWrap="wrap">
      {products.map((product, index) => (
        <Box key={index}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Stack>
  );
}
