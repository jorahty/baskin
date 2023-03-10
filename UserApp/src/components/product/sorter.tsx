import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { SortMode, useAppContext } from '../../context';
import { useTranslation } from 'next-i18next';

export default function ProductSorter() {
  const { refinement, setRefinement } = useAppContext();
  const { t } = useTranslation('common');

  const handleChange = (
    event: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    value: string | null,
  ) => {
    setRefinement({
      sort: value as SortMode,
      filters: refinement.filters,
      search: refinement.search,
    });
  };

  return (
    <Select
      startDecorator={t('home.sort.placeholder') + ':'}
      value={refinement.sort}
      onChange={handleChange}
      sx={{ bgcolor: 'background.body' }}
      aria-label="sort"
    >
      <Option aria-label="Newest" value="date-new">{t('home.sort.newest')}</Option>
      <Option aria-label="Oldest" value="date-old">{t('home.sort.oldest')}</Option>
      <Option aria-label="Price High"value="price-high">{t('home.sort.priceHigh')}</Option>
      <Option aria-label="Price Low" value="price-low">{t('home.sort.priceLow')}</Option>
    </Select>
  );
}
