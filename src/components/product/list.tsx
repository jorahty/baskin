import { Button, Typography } from "@mui/joy";
import ProductCard from "./card";

const products = [{
  mid: "string",
  id: "string",
  cid: "string",
  title: "Air force 1",
  price: 249.99,
  quantity: 1,
  description: "string",
  date: "string",
}, {
  mid: "string",
  id: "string",
  cid: "string",
  title: "Coffee mug",
  price: 30.99,
  quantity: 1,
  description: "string",
  date: "string",
}];

export default function ProductList({ cid }: { cid?: string }) {
  return (
    <>
      <Button>Hello World!</Button>
      <Typography>
        Below will be a list of { cid ? `products in ${cid}` : `all products`}.
        The list is hard coded for now.
      </Typography>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </>
  );
}
