import { Product } from "@/graphql/product/schema";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Link from "next/link";
import Image from "next/image";
import { CardOverflow, Stack, Tooltip } from "@mui/joy";

export default function ProductCard({ product }: { product: Product }) {
  const randomImage = 200 + Math.round(product.quantity * product.price / 20);

  return (
    <Card variant="outlined" sx={{ width: 269 }}>
      <CardOverflow>
        <Link href={`/product/${product.id}`}>
          <AspectRatio minHeight="269px">
            <Image
              alt={product.name}
              src={`https://picsum.photos/${randomImage}`}
              fill
            />
          </AspectRatio>
        </Link>
      </CardOverflow>
      <Stack direction="row" pt={1} alignItems="flex-end">
        <Box flexGrow={1}>
          <Typography fontSize="lg" fontWeight="lg">
          ${product.price}
          </Typography>
          <Typography>
            {product.name}
          </Typography>
        </Box>
        <Tooltip title={`${product.user}`} variant="outlined" >
          <Link href={`/user/${product.user}`}>
            <Avatar src={`https://robohash.org/${product.user}`}/>
          </Link>
        </Tooltip>
      </Stack>
    </Card>
  );
}