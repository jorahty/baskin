import { VerboseCategory } from '../../pages';
import { Stack } from '@mui/joy';
import ProductList from '../product/list';
import CategoryNavigate from './navigate';

interface Props {
  category: VerboseCategory;
}

export default function CategoryContent({ category }: Props) {
  return (
    <Stack p={2} gap={2}>
      <CategoryNavigate category={category} />
      <ProductList products={category.products} />
    </Stack>
  );
}
