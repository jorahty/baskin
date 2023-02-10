import { Product } from "@/graphql/product/schema";
import Image from "next/image";
import {Link, Stack, Typography} from "@mui/joy";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/pages/product/${product.cid}`}>
      <Stack className={"product-card"}>
        <Image src={"https://via.placeholder.com/250"} alt={"Placeholder for the product image"} width={250} height={250} />
        <Typography level={"h4"}>
          {product.title}
        </Typography>
        <Typography level={"body2"}>
          {product.price}
        </Typography>
      </Stack>
    </Link>
  );
}
