import Link from 'next/link';
import { Stack, Typography } from '@mui/joy';

export const footerHeight = '50px';

export default function Footer() {
  return (
    <Stack
      height={footerHeight}
      direction="row"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Typography>© Baskin</Typography>
      {[
        'Terms',
        'Guidelines',
        'About',
      ].map(page => (
        <Typography key={page}>
          &nbsp;• <Link href={`/${page.toLowerCase()}`}>{page}</Link>
        </Typography>
      ))}
    </Stack>
  );
}
