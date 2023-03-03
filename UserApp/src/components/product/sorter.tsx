import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function ProductSorter() {
  return (
    <Select defaultValue="date-new" startDecorator="Sort:">
      <Option value="date-new">Newest</Option>
      <Option value="date-old">Oldest</Option>
      <Option value="price-high">Highest Price</Option>
      <Option value="price-low">Lowest Price</Option>
    </Select>
  );
}
