import { Product } from '@/graphql/product/schema';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardOverflow,
  Chip,
  Divider,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <Box maxWidth="lg" margin="auto" p={4}>
      <Typography pb={2} level="h2">
        {product.name}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 'xl',
          gap: 4,
          pb: 0,
          flexDirection: {
            md: 'row',
            sm: 'column',
          },
        }}
      >
        <CardOverflow sx={{ flexGrow: 1 }}>
          <AspectRatio ratio="1" sx={{ borderRadius: 'xl' }}>
            <Image alt={product.name} src={product.pictures[0]} fill />
          </AspectRatio>
        </CardOverflow>
        <Stack
          gap={2}
          pb={2}
          sx={{
            width: {
              md: 'min(500px, 30vw)',
              sm: '100%',
            },
          }}
        >
          {product.discount > 0 ? (
            <Box>
              <Typography level="h2">
                {`$${(product.price - product.price * product.discount).toFixed(2)} `}
              </Typography>
              <Typography level="h6">
                {`Listed Price: `}
                <Typography sx={{ textDecoration: 'line-through' }}>
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
            <Typography level="body2">{new Date(product.date).toLocaleDateString('en-US')}</Typography>
          </Stack>
          <Divider />
          <Typography>{product.description.slice(0, 280)}</Typography>
          <Input
            sx={{ mt: 'auto', bgcolor: 'background.body' }}
            placeholder="Hi, is this available?"
            defaultValue="Hi, is this available?"
          />
          <Button size="lg">Send</Button>
        </Stack>
      </Card>
    </Box>
  );
}
