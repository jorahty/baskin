import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@fontsource/public-sans';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Head>
        <title>Baskin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
}
