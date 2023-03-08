import { Attribute } from '@/graphql/category/schema';
import { Button, GlobalStyles, Stack, Typography, useColorScheme } from '@mui/joy';

interface Props {
  attribute: Attribute;
}

export default function AttributeColor({ attribute }: Props) {
  const { mode } = useColorScheme();

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography fontWeight="lg" pr={1}>
        {attribute.name}
      </Typography>
      <GlobalStyles
        styles={{
          'input::-webkit-color-swatch': {
            borderWidth: 'var(--variant-borderWidth)',
            borderColor: mode === 'light'
              ? 'var(--joy-palette-neutral-outlinedBorder)'
              : 'var(--joy-palette-neutral-outlinedBorder)',
            borderRadius: '50%',
          },
        }}
      />
      <input
        type="color"
        value={ mode === 'light' ? '#F7F7F8' : '#09090D' }
        style={{
          width: 50,
          height: 50,
          background: 'transparent',
          border: 'none',
        }}
      />
      <Button size="sm" variant="plain">
        Clear
      </Button>
    </Stack>
  );
}
