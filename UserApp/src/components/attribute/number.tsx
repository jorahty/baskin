import { Filter, useAppContext } from '../../context';
import { Attribute } from '@/graphql/category/schema';
import { Box, Slider, Typography } from '@mui/joy';
import { useState } from 'react';

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
      <Box px={2} pb={2.5}>
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

function Unrestricted({ attribute }: Props) {
  return (
    <Box>
      Unrestricted: {attribute.name}
    </Box>
  );
}
