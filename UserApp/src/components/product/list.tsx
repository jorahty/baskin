import React, { useEffect } from 'react';
import { useAppContext, Refinement, Filter } from '../../context';
import { Product } from '@/graphql/product/schema';
import ProductCard from './card';
import { Grid } from '@mui/joy';
import Color from 'colorjs.io';

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
    <Grid container spacing={2} columns={{ xl: 4, lg: 3, md: 2, sm: 2, xs: 1 }} >
      {refinedProducts.map((product, index) => (
        <Grid xs={1} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
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
    // Hide this product (by returning false) if this
    // product is filtered by any of the filters

    for (const filter of filters) {
      if (filter.selection === null) continue;

      // Filter type: price
      if (filter.id === 'PRICE') {
        const { min, max } = filter.selection;
        const tooExpensive = max && product.price > max;
        const tooCheap = min && product.price < min;
        if (tooExpensive || tooCheap) return false;
        continue;
      }

      const value = product.attributes.find(a => a.id === filter.id)?.value;

      // Filter type: set
      if (Array.isArray(filter.selection)) {
        if (filter.selection.length === 0) continue;
        if (!filter.selection.includes(value)) return false;
        continue;
      }

      // Filter type: color
      if (filter.selection[0] === '#') {
        if (!value) continue;
        const color1 = new Color(filter.selection);
        const color2 = new Color(value as string);
        const ΔE = color1.deltaE76(color2);
        if (ΔE > 50) return false;
        continue;
      }

      // Filter type: number
      if (typeof filter.selection === 'object') {
        const { min, max } = filter.selection;
        const number = Number(value);
        const tooExpensive = max && number > max;
        const tooCheap = min && number < min;
        if (tooExpensive || tooCheap) return false;
        continue;
      }
    }

    return true;
  });

  return filtered;
}
