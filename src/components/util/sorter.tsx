import { Product } from '@/graphql/product/schema';
import { Option, Select, Stack } from '@mui/joy';

const sorts: Record<string, (a: Product, b: Product) => number> = {
  'Newest': (a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  'Oldest': (a: Product, b: Product) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  'Price High': (a: Product, b: Product) => b.price - a.price,
  'Price Low': (a: Product, b: Product) => a.price - b.price,
};

interface SorterProps {
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export default function Sorter({
  setSortedProducts,
  products,
}: SorterProps) {
  const handleSort = (sort: (a: Product, b: Product) => number) => {
    setSortedProducts([...products].sort(sort));
  };

  const handleChange = (e: unknown, newValue: any) => {
    const sort = sorts[newValue];
    handleSort(sort);
  };

  return (
    <Stack p={2} pb={0}>
      <Select sx={{alignSelf: 'end'}} placeholder="Sort by" data-testid="sort" onChange={handleChange}>
        <Option aria-label="newest" value="Newest">Newest</Option>
        <Option aria-label="oldest" value="Oldest">Oldest</Option>
        <Option aria-label="price-high" value="Price High">Price High</Option>
        <Option aria-label="price-low" value="Price Low">Price Low</Option>
      </Select>
    </Stack>
  );
}
