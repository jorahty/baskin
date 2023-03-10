import * as React from 'react';
import { Product } from '@/graphql/product/schema';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Image from 'next/image';
import Link from 'next/link';
import SellIcon from '@mui/icons-material/Sell';
import Typography from '@mui/joy/Typography';
import { CardOverflow, Stack, Tooltip } from '@mui/joy';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card variant="outlined">
      <CardOverflow>
        <Link href={`/product/${product.id}`}>
          <AspectRatio minHeight="269px">
            <Image alt={product.name} src={`http://localhost:4001/${product.images[0]}.jpeg`} fill />
          </AspectRatio>
        </Link>
        {product.discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 2,
              left: '5px',
              top: '5px',
            }}
          >
            <Chip variant="solid" color="danger" startDecorator={<SellIcon />}>
              {product.discount * 100}% off!
            </Chip>
          </Box>
        )}
      </CardOverflow>
      <Stack direction="row" pt={1} alignItems="flex-end">
        <Box flexGrow={1}>
          {product.discount ? (
            <Typography fontSize="lg" fontWeight="lg" color="danger">
              {`$${(product.price - product.price * product.discount).toFixed(2)} `}
              <Typography fontWeight="md" color="neutral" sx={{ textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </Typography>
            </Typography>
          ) : (
            <Typography fontSize="lg" fontWeight="lg">
              ${product.price.toFixed(2)}
            </Typography>
          )}
          <Typography>{product.name}</Typography>
        </Box>
        <Tooltip title={`${product.user}`} variant="outlined">
          <Link href={`/user/${product.user}`}>
            <Avatar src={`https://robohash.org/${product.user}`} />
          </Link>
        </Tooltip>
      </Stack>
      {product.attributes.map(attribute => (
        <div key={attribute.id}>
          <b>{attribute.name}</b> {attribute.value}
        </div>
      ))}
    </Card>
  );
}
