import { Product } from "@/graphql/product/schema";
import Image from "next/image";
import Link from "next/link";
import {Stack, Typography} from "@mui/joy";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function ProductCard({ product }: { product: Product }) {
  const random = 100 + Math.round(product.quantity * product.price / 16);

  return (
    <Link href={`/product/${product.id}`}>
      <Stack className={"product-card"}>
        <Image src={`https://picsum.photos/${random}`} alt={"Placeholder for the product image"} width={250} height={250} />
        <Typography component={"h4"}>
          {product.name}
        </Typography>
        <Typography level={"body2"} component={"strong"}>
          ${product.price}
        </Typography>
        {/*<Typography level={"body2"}>*/}
        {/*  {product.mid}*/}
        {/*</Typography>*/}
        {product.quantity <= 10 ?
          <Typography startDecorator={<PriorityHighIcon />} textColor={"red"} level={"body3"}>
            Only {product.quantity} left!
          </Typography> : <></> }
      </Stack>
    </Link>
  );
}
