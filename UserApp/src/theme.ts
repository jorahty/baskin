import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-black)',
          surface: 'var(--joy-palette-neutral-900)',
        },
      },
    },
  },
  components: {
    JoySelect: {
      styleOverrides: {
        listbox: {
          padding: 0,
        },
      },
    },
    JoyTooltip: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
