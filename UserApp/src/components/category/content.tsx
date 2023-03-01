import { Product } from '@/graphql/product/schema';
import { Stack } from '@mui/joy';
import ProductList from '../product/list';
import CategoryNavigate from './navigate';

interface Props {
  products: Product[];
}

export default function CategoryContent({ products }: Props) {
  return (
    <Stack p={2} gap={2}>
      <CategoryNavigate />
      <ProductList products={products} showSearch={true} showSorter={true} />
    </Stack>
  );
}
