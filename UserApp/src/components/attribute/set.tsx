import { Attribute } from '@/graphql/category/schema';
import { Select, Option, Box, Typography, ListItemDecorator, Checkbox } from '@mui/joy';
import { Filter, useAppContext } from '../../context';

interface Props {
  attribute: Attribute;
}

export default function AttributeSet({ attribute }: Props) {
  const { refinement, setRefinement } = useAppContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = ({ target: { textContent: value } }: any) => {
    const filters: Filter[] = refinement.filters.map(filter => {
      if (filter.id !== attribute.id) return filter;
      if (filter.selection.includes(value)) return {
        id: filter.id,
        selection: filter.selection.filter((item: string) => item !== value),
      };
      return {
        id: filter.id,
        selection: [...filter.selection, value],
      };
    });
    setRefinement({
      ...refinement,
      filters: filters,
    });
  };

  const selection = refinement.filters.find(filter => filter.id === attribute.id)?.selection;

  const renderValue = () => {
    if (selection.length > 0) {
      return selection.join(', ');
    } else {
      return 'All';
    }
  };

  return (
    <Box>
      <Typography fontWeight="lg" pb={1}>
        {attribute.name}
      </Typography>
      <Select
        defaultValue={attribute.values && attribute.values[0]}
        renderValue={renderValue}
        sx={{ bgcolor: 'background.body' }}
      >
        {attribute.values?.map(value => (
          <Option
            key={value}
            color="neutral"
            value={value}
            sx={{ fontWeight: 'md' }}
            onClick={handleClick}
          >
            <ListItemDecorator>
              <Checkbox checked={selection?.includes(value)}/>
            </ListItemDecorator>
            {value}
          </Option>
        ))}
      </Select>
    </Box>
  );
}
