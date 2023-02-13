import { Product } from "@/graphql/product/schema";
import {Box, Grid, Typography} from "@mui/joy";
import Image from "next/image";
import Button from "@mui/joy/Button";

export default function ProductDetails({ product }: { product: Product }) {
  const random = 200 + Math.round(product.quantity * product.price / 20);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Box margin="auto" maxWidth="sm">
      <Grid style={{margin: "auto"}}>
        <Image src={`https://picsum.photos/${random}`}
          alt={`${product.name} thumbnail`}
          width={300}
          height={300}
        />
      </Grid>

      <Grid
        paddingLeft={{ xs: 2, md: 0 }}
        paddingRight={{ xs: 2, md: 0 }}
      >
        {/* Wrapper to a link using Anchor should go here */}
        <Typography>{product.category}</Typography>
        {/* Wrapper to a link using Anchor redirecting to user */}
        <Typography>Seller: {product.user}</Typography>
        <Typography level={"h1"}>{product.name}</Typography>
        <Typography level={"h4"} component={"span"}>{formatter.format(product.price)}</Typography>
        <Button>Add to Cart!</Button>
        <Typography>{product.description}</Typography>
      </Grid>
    </Box>
  );
}
