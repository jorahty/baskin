import React, { useEffect } from 'react';
import { useAppContext, Refinement, Filter } from '../../context';
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
      {refinement.filters.map(filter => (
        <div key={filter.id}>
          id: {filter.id}, selection: {JSON.stringify(filter.selection)}
        </div>
      ))}
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

  // filter
  const filtered = filterProducts(searched, refinement.filters);

  // sort
  const compareFn = compareFunctions[refinement.sort];
  const sorted = filtered.sort(compareFn);

  return sorted;
}

function filterProducts(products: Product[], filters: Filter[]) {
  const filtered = products.filter(product => {
    // hide this product by returning false
    // if it fails any filter
    for (const filter of filters) {
      // return false if it fails
      if (filter.id === 'PRICE') {
        const { min, max } = filter.selection;
        const tooExpensive = max && product.price > max;
        const tooCheap = min && product.price < min;
        if (tooExpensive || tooCheap) return false;
        continue;
      }
      if (Array.isArray(filter.selection)) {
        if (filter.selection.length === 0) continue;
        const value = product.attributes.find(a => a.id === filter.id)?.value;
        if (!filter.selection.includes(value)) return false;
        continue;
      }
      // if (typeof filterValue === array)
      //   if (!filterValue.includes(product.attributes[key])) return false;
      // else {
      //   if (filterValue.min && product.attributes[key] < filterValue.min) return false;
      //   if (filterValue.max && product.attributes[key] > filterValue.max) return false;
      // }
    }
    return true;
  });

  return filtered;
}
