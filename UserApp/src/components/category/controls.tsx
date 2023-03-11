import { Button, Stack, Typography } from '@mui/joy';
import { VerboseCategory } from '../../pages';
import Link from 'next/link';
import ProductSorter from '../product/sorter';
import AttributeNumber, { AttributePrice } from '../attribute/number';
import AttributeColor from '../attribute/color';
import AttributeSet from '../attribute/set';
import { useAppContext } from '../../context';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

export interface Props {
  category: VerboseCategory;
}

export default function CategoryControls({ category }: Props) {
  const { refinement, setRefinement } = useAppContext();
  const { t } = useTranslation('common');

  useEffect(() => {
    const filters = category.attributes.map(attribute => {
      const filter = refinement.filters.find(filter => filter.id === attribute.id);
      if (filter) return filter;
      const defaultSelections = {
        number: {
          min: attribute.min || null,
          max: attribute.max || null,
        },
        set: [],
        color: null,
      };
      return {
        id: attribute.id,
        selection: defaultSelections[attribute.type as 'number'|'set'|'color'],
      };
    });
    setRefinement({
      ...refinement,
      filters: [{ id: 'PRICE', selection: { min: null, max: null } }, ...filters],
    });
  }, [category]);

  return (
    <Stack p={2} gap={2} width={340}>
      {refinement.search === 'debug' && category.attributes.map(attribute => (
        <div>id: {attribute.id}, name: {attribute.name}</div>
      ))}
      <Link href="/product/create">
        <Button fullWidth>{t('createNewProduct.title')}</Button>
      </Link>
      {category.name &&
        <Typography level="h3" fontWeight={800}>
          {category.name}
        </Typography>
      }
      <ProductSorter />
      <AttributePrice />
      {category.attributes.map(attribute => {
        switch (attribute.type) {
        case 'number': return <AttributeNumber key={attribute.id} attribute={attribute} />;
        case 'set': return <AttributeSet key={attribute.id} attribute={attribute} />;
        case 'color': return <AttributeColor key={attribute.id} attribute={attribute} />;
        }
      })}
    </Stack>
  );
}
