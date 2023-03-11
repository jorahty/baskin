import { useAppContext } from '../../context';
import { Attribute } from '@/graphql/category/schema';
import { Button, GlobalStyles, Stack, Typography, useColorScheme } from '@mui/joy';
import { ChangeEvent } from 'react';

interface Props {
  attribute: Attribute;
}

export default function AttributeColor({ attribute }: Props) {
  const { refinement, setRefinement } = useAppContext();
  const { mode } = useColorScheme();

  const handleChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement>
  ) => {
    const filters = refinement.filters.map(filter => {
      if (filter.id !== attribute.id) return filter;
      return {
        id: filter.id,
        selection: value,
      };
    });
    setRefinement({
      ...refinement,
      filters: filters,
    });
  };

  const handleClear = () => {
    const filters = refinement.filters.map(filter => {
      if (filter.id !== attribute.id) return filter;
      return {
        id: filter.id,
        selection: null,
      };
    });
    setRefinement({
      ...refinement,
      filters: filters,
    });
  };

  const defaultColor = mode === 'light' ? '#F7F7F8' : '#09090D';

  const selection = refinement?.filters.find(filter => filter.id === attribute.id)?.selection;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography fontWeight="lg" pr={1}>
        {attribute.name}
      </Typography>
      <GlobalStyles
        styles={{
          'input::-webkit-color-swatch': {
            borderWidth: 'var(--variant-borderWidth)',
            borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
            borderRadius: '50%',
          },
        }}
      />
      <input
        aria-label="color-input"
        onChange={handleChange}
        type="color"
        value={selection || defaultColor}
        style={{
          width: 50,
          height: 50,
          background: 'transparent',
          border: 'none',
        }}
      />
      {selection &&
        <Button size="sm" variant="plain" onClick={handleClear}>
          Clear
        </Button>
      }
    </Stack>
  );
}
