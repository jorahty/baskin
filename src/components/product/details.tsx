import { Product } from "@/graphql/product/schema";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardOverflow,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetails({ product }: { product: Product }) {
  const randomImage = 720 + Math.round((product.quantity * product.price) / 20);

  return (
    <Box maxWidth="lg" margin="auto" p={6}>
      <Typography pb={2} level="h2">
        {product.name}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 'xl',
          gap: 4,
          flexDirection: 'row',
        }}
      >
          <CardOverflow sx={{ flexGrow: 1 }}>
            <AspectRatio ratio="1" sx={{ borderRadius: 'xl' }}>
              <Image
                alt={product.name}
                src={`https://picsum.photos/${randomImage}`}
                fill
              />
            </AspectRatio>
          </CardOverflow>
          <Stack width={512} gap={2}>
            {product.discount > 0 ? (
              <Box>
                <Typography level="h2">
                  {`$${(product.price - product.price * product.discount).toFixed(
                    2
                  )} `}
                </Typography>
                <Typography level="h6">
                  {`Listed Price: `}
                  <Typography sx={{ textDecoration: "line-through" }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography color="danger" fontWeight="lg">
                    {` Save ${product.discount * 100}% off!`}
                  </Typography>
                </Typography>
              </Box>
            ) : (
              <Typography level="h2">${product.price.toFixed(2)}</Typography>
            )}
            <Link href={`/user/${product.user}`}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Avatar src={`https://robohash.org/${product.user}`} />
                <Typography>{product.user}</Typography>
              </Stack>
            </Link>
            <Stack direction="row" alignItems="center" gap={1}>
              <Link href={`/category/${product.category}`}>
                <Chip variant="soft">{product.category}</Chip>
              </Link>
              <Typography level="body2">
                {new Date(product.date).toLocaleDateString("en-US")}
              </Typography>
            </Stack>
            <Divider />
            <Typography>{product.description}</Typography>
            <Button
              size="lg"
              sx={{ mt: "auto", borderRadius: "lg" }}
            >
              Send
            </Button>
          </Stack>
      </Card>
    </Box>
  );
}
