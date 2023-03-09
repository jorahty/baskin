import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { useColorScheme } from '@mui/joy';
import Head from 'next/head';

const theme = extendTheme({ cssVarPrefix: 'favicon' });

function SetFavicon() {
  const { systemMode } = useColorScheme();
  return (
    <Head>
      <link rel="icon" href={`/favicon-${systemMode || 'light'}.ico`} />
    </Head>
  );
}

export default function Favicon() {
  return (
    <CssVarsProvider
      defaultMode="system"
      theme={theme}
      modeStorageKey="favicon_identify-system-mode"
      disableNestedContext
    >
      <SetFavicon />
    </CssVarsProvider>
  );
}
