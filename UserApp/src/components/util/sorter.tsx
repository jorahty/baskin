import { Product } from '@/graphql/product/schema';
import { Box, Option, Select } from '@mui/joy';
import { useTranslation } from 'next-i18next';

const sortings: Record<string, (a: Product, b: Product) => number> = {
  Newest: (a: Product, b: Product) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  Oldest: (a: Product, b: Product) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  'Price High': (a: Product, b: Product) => b.price - a.price,
  'Price Low': (a: Product, b: Product) => a.price - b.price,
};

interface SorterProps {
  setSortedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}

export default function Sorter({ setSortedProducts, products }: SorterProps) {
  const { t } = useTranslation('common');
  const sortProducts = t('home.sort.placeholder');

  const handleSort = (sort: (a: Product, b: Product) => number) => {
    setSortedProducts([...products].sort(sort));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: unknown, newValue: any) {
    const ord = sortings[newValue];
    handleSort(ord);
  }

  return (
    <Box>
      <Select
        placeholder={sortProducts}
        data-testid="sort"
        onChange={handleChange}
        sx={{ width: { md: '34vw', sm: '30vw' } }}
      >
        <Option aria-label="newest" value="Newest">
          {t('home.sort.newest')}
        </Option>
        <Option aria-label="oldest" value="Oldest">
          {t('home.sort.oldest')}
        </Option>
        <Option aria-label="price-high" value="Price High">
          {t('home.sort.priceHigh')}
        </Option>
        <Option aria-label="price-low" value="Price Low">
          {t('home.sort.priceLow')}
        </Option>
      </Select>
    </Box>
  );
}
