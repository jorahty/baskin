import { Product } from '@/graphql/product/schema';
import Sorter from '../util/sorter';
import { Box, Grid } from '@mui/joy';
import ProductCard from './card';
import React, { useEffect } from 'react';
import Search from '../util/search';

export default function ProductList({
  products,
  showSearch,
  showSorter,
}: {
  products: Product[];
  showSearch: boolean;
  showSorter: boolean;
}) {
  const [sortedProducts, setSortedProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {showSearch && <Search setSortedProducts={setSortedProducts} products={products} />}
        {showSorter && <Sorter setSortedProducts={setSortedProducts} products={sortedProducts} />}
      </Box>
      <Grid container spacing={2} columns={{ xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }} >
        {sortedProducts.map((product, index) => (
          <Grid xs={1} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
