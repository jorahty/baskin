import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { SortMode, useAppContext } from '../../context';

export default function ProductSorter() {
  const { refinement, setRefinement } = useAppContext();

  const handleChange = (
    event: any, // eslint-disable-line @typescript-eslint/no-explicit-any,
    value: string | null,
  ) => {
    setRefinement({
      sort: value as SortMode,
      filter: refinement?.filter,
      search: refinement?.search,
    });
  };

  return (
    <Select
      startDecorator="Sort:"
      value={refinement?.sort}
      onChange={handleChange}
    >
      <Option value="date-new">Newest</Option>
      <Option value="date-old">Oldest</Option>
      <Option value="price-high">Highest Price</Option>
      <Option value="price-low">Lowest Price</Option>
    </Select>
  );
}
