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
import { CardOverflow, IconButton, Stack, Tooltip } from '@mui/joy';
import { useEffect, useState } from 'react';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useAppContext } from '../../context';

export default function ProductCard({ product }: { product: Product }) {
  const { signedInUser } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem(`${signedInUser?.username}-saved`);
    const saved: string[] = item ? JSON.parse(item) : [];
    setIsSaved(saved.includes(product.id));
  }, [signedInUser, product]);

  function handleSave() {
    const item = localStorage.getItem(`${signedInUser?.username}-saved`);
    const existing: string[] = item ? JSON.parse(item) : [];
    const saved = isSaved
      ? (existing.filter(id => id !== product.id))
      : existing.concat(product.id);
    localStorage.setItem(`${signedInUser?.username}-saved`, JSON.stringify(saved));
    setIsSaved(!isSaved);
  }

  const renderPrice = (price: number) => (
    price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })
  );

  return (
    <Card variant="outlined">
      <CardOverflow>
        <Link href={`/product/${product.id}`}>
          <AspectRatio minHeight="269px">
            <Image alt={product.name} src={`http://localhost:4001/${product.images[0]}.jpeg`} fill />
          </AspectRatio>
        </Link>
        {product.discount > 0 && (
          <Chip
            variant="solid"
            color="danger" startDecorator={<SellIcon />} sx={{
              position: 'absolute',
              top: '0.5rem',
              left: '0.5rem',
            }}>
            {product.discount * 100}% off
          </Chip>
        )}
        <Tooltip title={isSaved ? 'Unsave' : 'Save'}>
          <IconButton
            onClick={handleSave}
            variant="outlined"
            color={isSaved ? 'primary' : 'neutral'}
            sx={{
              bgcolor: 'background.surface',
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              borderRadius: '50%',
            }}
          >
            {isSaved ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Tooltip>
      </CardOverflow>
      <Stack direction="row" pt={1} alignItems="flex-end">
        <Box flexGrow={1}>
          {product.discount ? (
            <Typography fontSize="lg" fontWeight="lg" color="danger">
              {renderPrice(product.price - product.price * product.discount)}{' '}
              <Typography fontWeight="md" color="neutral" sx={{ textDecoration: 'line-through' }}>
                {renderPrice(product.price)}
              </Typography>
            </Typography>
          ) : (
            <Typography fontSize="lg" fontWeight="lg">
              {renderPrice(product.price)}
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
    </Card>
  );
}
