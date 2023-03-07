import { Attribute } from '@/graphql/category/schema';
import { Box, Slider, Typography } from '@mui/joy';
import { useState } from 'react';

interface Props {
  attribute: Attribute;
}

export default function AttributeNumber({ attribute }: Props) {
  if (isNaN(attribute.min as number) || isNaN(attribute.max as number)) {
    return <Unrestricted attribute={attribute}/>;
  } else {
    return <Restricted attribute={attribute}/>;
  }
}

function Restricted({ attribute }: Props) {
  const [value, setValue] = useState<number[]>([attribute.min, attribute.max] as number[]);

  return (
    <Box px={2}>
      <Typography fontWeight="lg">
        {attribute.name}
      </Typography>
      <Slider
        aria-label="slider"
        value={value}
        min={attribute.min}
        max={attribute.max}
        step={attribute.step || 1}
        onChange={(e, newValue) => setValue(newValue as number[])}
        valueLabelDisplay="auto"
        size="lg"
      />
    </Box>
  );
}

function Unrestricted({ attribute }: Props) {
  return (
    <Box>
      Range: {attribute.name}
    </Box>
  );
}
