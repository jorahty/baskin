import { AspectRatio, Box, Button, CardOverflow, Grid, Stack } from '@mui/joy';
import Image from 'next/image';
import { Product } from '@/graphql/product/schema';
import { useState } from 'react';

export default function ImageGallery({ product }: { product: Product }) {
  console.log(product);
  const [currentImageId, setCurrentImageId] = useState<string>(
    product.images[0],
  );

  return (
    <Grid container sx={{ width: '100%' }}>
      <Grid
        xs={12}
        md={9}
        sx={{ paddingRight: { xs: '0px', md: '10px' } }}
        aria-label={'Main Image'}
      >
        <AspectRatio ratio={'1'}>
          <Image
            alt={product.name}
            src={`http://localhost:4001/${currentImageId}.jpeg`}
            fill
          />
        </AspectRatio>
      </Grid>

      <Grid
        xs={12}
        md={3}
        sx={{
          overflowY: { md: 'auto' },
          position: 'relative',
        }}
      >
        <Stack
          direction={'column'}
          sx={{
            marginTop: { xs: '20px', md: '0px' },
            flexDirection: { xs: 'row', md: 'column' },
            width: { md: '100%' },
            position: { md: 'absolute' },
            overflowX: { xs: 'auto', md: 'none' },
          }}
          gap={3}
        >
          {product.images.map((id: string, index: number) => (
            <Box
              sx={{
                backgroundColor: 'transparent',
                cursor: 'pointer',
                height: '100%',
                width: '100%',
                minWidth: '150px',
              }}
              key={id}
              onClick={() => setCurrentImageId(id)}
              aria-label={`image-${index + 1}`}
            >
              <AspectRatio minHeight={150}>
                <Image
                  alt={product.name}
                  src={`http://localhost:4001/${id}.jpeg`}
                  fill
                />
              </AspectRatio>
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
