import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { GlobalStyles } from '@mui/joy';
import theme from '../theme';
import Favicon from '../components/Favicon';
import { AppContextProvider } from '../context';
import { appWithTranslation } from 'next-i18next';
import nextI18nConfig from '../../next-i18next.config';

function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <GlobalStyles styles={{ a: { textDecoration: 'none', color: 'inherit' } }} />
      <Head>
        <title>Baskin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Favicon />
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </CssVarsProvider>
  );
}

export default appWithTranslation(App, nextI18nConfig);
