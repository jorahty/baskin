import React, { useEffect } from 'react';
import { useAppContext, Refinement } from '../../context';
import { Product } from '@/graphql/product/schema';
import ProductCard from './card';
import { Grid } from '@mui/joy';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { refinement } = useAppContext();
  const [refinedProducts, setRefinedProducts] = React.useState<Product[]>(
    refineProducts(products, refinement)
  );

  useEffect(() => {
    setRefinedProducts(refineProducts(products, refinement));
  }, [products, refinement]);

  return (
    <>
      {/* {refinement.filters.map(filter => (
        <div key={filter.id}>
        id: {filter.id}, selection: {JSON.stringify(filter.selection)}
        </div>
      ))} */}
      <Grid container spacing={2} columns={{ xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }} >
        {refinedProducts.map((product, index) => (
          <Grid xs={1} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const compareFunctions = {
  'date-new': (a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  'date-old': (a: Product, b: Product) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  'price-high': (a: Product, b: Product) => b.price - a.price,
  'price-low': (a: Product, b: Product) => a.price - b.price,
};

function refineProducts(
  products: Product[],
  refinement: Refinement,
) {
  // search
  const searched = products.filter(product => {
    const match = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase());
    return match(product.name, refinement.search)
      || match(product.category, refinement.search)
      || match(product.user, refinement.search)
      || match(product.description, refinement.search);
  });

  // filter (TODO)
  const filtered = searched;

  // sort
  const compareFn = compareFunctions[refinement.sort];
  const sorted = filtered.sort(compareFn);

  return sorted;
}
