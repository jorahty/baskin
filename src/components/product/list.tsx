import { Box, Stack } from "@mui/joy";
import ProductCard from "./card";

const products = [{
  user: "string",
  id: "string",
  category: "string",
  name: "Air force 1",
  price: 249.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  user: "string",
  id: "string",
  category: "string",
  name: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}];

export default function ProductList({ category }: { category?: string }) {
  return (
    <>
      category: {category}
      <Stack direction="row" gap={3} p={3} flexWrap="wrap">
        {products.map((product, index) => (
          <Box key={index}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Stack>
    </>
  );
}
