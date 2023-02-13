import { Product } from "@/graphql/product/schema";
import { AspectRatio, Avatar, Box, Button, Chip, Stack, Typography} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails({ product }: { product: Product }) {
  const randomImage = 720 + Math.round(product.quantity * product.price / 20);

  return (
    <Box maxWidth="lg" margin="auto" p={6}>
      <Typography pb={2} level="h1">{product.name}</Typography>
      <Stack direction="row" flexWrap="wrap" gap={5}>
        <AspectRatio ratio="1/1" sx={{ borderRadius: 'xl', flexGrow: 3 }}>
          <Image
            alt={product.name}
            src={`https://picsum.photos/${randomImage}`}
            fill
          />
        </AspectRatio>
        <Stack flexGrow={2} gap={2}>
          <Typography level="h2">${product.price}</Typography>
          <Link href={`user/${product.user}`}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar
                src={`https://robohash.org/${product.user}`}
              />
              <Typography>{product.user}</Typography>
            </Stack>
          </Link>
          <Stack direction="row" alignItems="center" gap={1}>
            <Link href={`/category/${product.category}`}>
              <Chip>{product.category}</Chip>
            </Link>
            <Typography level="body2">
              {new Date(product.date).toLocaleDateString('en-US')}
            </Typography>
          </Stack>
          <Typography>
            {product.description}
          </Typography>
          <Button size="lg" sx={{ mt: "auto", borderRadius: "lg" }}>
            Add to cart
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
