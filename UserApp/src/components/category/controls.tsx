import { Button, Stack, Typography } from '@mui/joy';
import { VerboseCategory } from '../../pages';
import Link from 'next/link';
import ProductSorter from '../product/sorter';
import AttributeNumber from '../attribute/number';
import AttributeColor from '../attribute/color';
import AttributeSet from '../attribute/set';
import { useAppContext } from '../../context';
import { useEffect } from 'react';

export interface Props {
  category: VerboseCategory;
}

export default function CategoryControls({ category }: Props) {
  const { refinement, setRefinement } = useAppContext();

  useEffect(() => {
    const filters = category.attributes.map(attribute => {
      const filter = refinement.filters.find(filter => filter.id === attribute.id);
      if (filter) return filter;
      return {
        id: attribute.id,
        selection: attribute.type === 'set' ? [] : {
          min: attribute.min,
          max: attribute.max,
        },
      };
    });
    setRefinement({
      ...refinement,
      filters: filters,
    });
  }, [category]);

  return (
    <Stack p={2} gap={2} width={340}>
      <Link href="/product/create">
        <Button fullWidth>Sell new product</Button>
      </Link>
      {category.name &&
        <Typography level="h3" fontWeight={800}>
          {category.name}
        </Typography>
      }
      <ProductSorter />
      <AttributeNumber attribute={{
        id: '1',
        category: 'NA',
        type: 'number',
        name: 'Price',
      }} />
      {category.attributes.map(attribute => {
        switch (attribute.type) {
        case 'number': return <AttributeNumber key={attribute.id} attribute={attribute} />;
        case 'set': return <AttributeSet key={attribute.id} attribute={attribute} />;
        case 'color': return <AttributeColor key={attribute.id} />;
        }
      })}
    </Stack>
  );
}
