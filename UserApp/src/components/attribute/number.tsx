import { Filter, useAppContext } from '../../context';
import { Attribute } from '@/graphql/category/schema';
import { Box, Input, Slider, Stack, Typography } from '@mui/joy';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  attribute: Attribute;
}

export default function AttributeNumber({ attribute }: Props) {
  if (typeof attribute.min !== 'number' || typeof attribute.max !== 'number') {
    return <Unrestricted attribute={attribute}/>;
  } else {
    return <Restricted attribute={attribute}/>;
  }
}

function Restricted({ attribute }: Props) {
  const { refinement, setRefinement } = useAppContext();
  const [value, setValue] = useState<number[]>([attribute.min, attribute.max] as number[]);

  function handleChange(
    e: Event,
    newValue: number[],
  ) {
    const filters: Filter[] = refinement.filters.map(filter => {
      if (filter.id === attribute.id) {
        return {
          id: filter.id,
          selection: { min: newValue[0], max: newValue[1] },
        };
      } else {
        return filter;
      }
    });
    setRefinement({
      ...refinement,
      filters: filters,
    });
    setValue(newValue as number[]);
  }

  return (
    <Box>
      <Typography fontWeight="lg">
        {attribute.name}
      </Typography>
      <Box px={3} pb={2.5}>
        <Slider
          sx={{ p: 2 }}
          aria-label="slider"
          value={value}
          min={attribute.min}
          max={attribute.max}
          step={attribute.step || 1}
          onChange={(e, v) => handleChange(e, v as number[])}
          valueLabelDisplay="auto"
          size="lg"
          marks={[
            {
              value: attribute.min as number,
              label: attribute.symbol ? `${attribute.min} ${attribute.symbol}` : `${attribute.min}`,
            },
            {
              value: attribute.max as number,
              label: attribute.symbol ? `${attribute.max} ${attribute.symbol}` : `${attribute.max}`,
            },
          ]}
        />
      </Box>
    </Box>
  );
}

export function Unrestricted({ attribute }: Props) {
  const { refinement, setRefinement } = useAppContext();

  function handleChange(
    { target: { value } }: ChangeEvent<HTMLInputElement>,
    part: 'min'|'max',
  ) {
    const filters: Filter[] = refinement.filters.map(filter => {
      if (filter.id === attribute.id) {
        const selection = filter.selection;
        selection[part] = value || null;
        return {
          id: filter.id,
          selection: selection,
        };
      } else {
        return filter;
      }
    });

    // update filters
    setRefinement({
      ...refinement,
      filters: filters,
    });
  }

  const slotProps = {
    input: {
      min: attribute.min,
      max: attribute.max,
      step: attribute.step,
    },
  };

  return (
    <Box>
      <Typography fontWeight="lg" pb={1}>
        {attribute.name}
      </Typography>
      <Stack direction="row" alignItems="center" gap={2}>
        <Input
          onChange={e => handleChange(e, 'min')}
          type="number"
          placeholder="Min"
          endDecorator={attribute.symbol}
          sx={{ bgcolor: 'background.body' }}
          slotProps={slotProps}
        />
        <Typography>to</Typography>
        <Input
          onChange={e => handleChange(e, 'max')}
          type="number"
          placeholder="Max"
          endDecorator={attribute.symbol}
          sx={{ bgcolor: 'background.body' }}
          slotProps={slotProps}
        />
      </Stack>
    </Box>
  );
}

// Ideally "Price" would be a regular attribute that is assigned to all
// products, but the GraphQL `Product` and `NewProduct` types are not currently
// set up that way. Therefore filtering by price needs to be handled
// differently.
export function AttributePrice() {
  const { t } = useTranslation('common');
  const { refinement, setRefinement } = useAppContext();

  function handleChange(
    { target: { value } }: ChangeEvent<HTMLInputElement>,
    part: 'min'|'max',
  ) {
    const filters: Filter[] = refinement.filters.map(filter => {
      if (filter.id === 'PRICE') {
        const selection = filter.selection;
        selection[part] = value || null;
        return {
          id: filter.id,
          selection: selection,
        };
      } else {
        return filter;
      }
    });

    // update filters
    setRefinement({
      ...refinement,
      filters: filters,
    });
  }

  const slotProps = {
    input: {
      min: 0,
      step: 0.1,
    },
  };

  return (
    <Box>
      <Typography aria-label="price" fontWeight="lg" pb={1}>
        {t('common.price.price')}
      </Typography>
      <Stack direction="row" alignItems="center" gap={2}>
        <Input
          onChange={e => handleChange(e, 'min')}
          type="number"
          placeholder={t('common.price.min').toString()}
          startDecorator={'$'}
          sx={{ bgcolor: 'background.body' }}
          slotProps={slotProps}
          aria-label="min"
        />
        <Typography>-</Typography>
        <Input
          onChange={e => handleChange(e, 'max')}
          type="number"
          placeholder={t('common.price.max').toString()}
          startDecorator={'$'}
          sx={{ bgcolor: 'background.body' }}
          slotProps={slotProps}
          aria-label="max"
        />
      </Stack>
    </Box>
  );
}
