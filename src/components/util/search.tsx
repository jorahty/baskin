import { Product } from '@/graphql/product/schema';
import { Box, Input } from '@mui/joy';
import { useEffect, useState } from 'react';

interface SearchProps {
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export default function Search({ setSortedProducts, products }: SearchProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSortedProducts(products.filter((product) =>
      product.name.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)
    ));
  }, [products, search, setSortedProducts]);
    

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Input
        placeholder="Search Products"
        sx={{ width: { md: '34vw', sm: '30vw'} }}
        onChange={(e) => setSearch(e.target.value)} />
    </Box>
  );
}