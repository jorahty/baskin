import { Button, Stack, Typography } from '@mui/joy';
import { VerboseCategory } from '../../pages';
import Link from 'next/link';
import ProductSorter from '../product/sorter';

export interface Props {
  category: VerboseCategory;
}

export default function CategoryControls({ category }: Props) {
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
      <Typography>
        Category-specific attributes will go here
      </Typography>
    </Stack>
  );
}
