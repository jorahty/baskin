import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { GlobalStyles } from '@mui/joy';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <Head>
        <title>Baskin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <GlobalStyles styles={{ a: { textDecoration: 'none' } }}/>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
