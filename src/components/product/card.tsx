import { Product } from "@/graphql/product/schema";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Link from "next/link";

export default function BasicCard({ product }: { product: Product }) {
  const random = 200 + Math.round(product.quantity * product.price / 20);

  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {product.name}
      </Typography>
      <Typography level="body2">
        {new Date(product.date).toLocaleDateString('en-US', {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
        <BookmarkAdd />
      </IconButton>
      <Link href={`product/${product.id}`}>
        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img
            src={`https://picsum.photos/${random}`}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </Link>
      <Box sx={{ display: 'flex' }}>
        <Typography fontSize="lg" fontWeight="lg" flexGrow={1}>
          ${product.price}
        </Typography>
        <Link href={`user/${product.user}`}>
          <Avatar />
        </Link>
      </Box>
    </Card>
  );
}