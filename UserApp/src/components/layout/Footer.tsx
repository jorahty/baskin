import Link from 'next/link';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ModeToggle from './ModeToggle';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { useAppContext } from '../../context';

export const footerHeight = '50px';

export default function Footer() {
  return (
    <Stack height={footerHeight} direction="row" alignItems="center" p={2}>
      <Typography>© Baskin</Typography>
      {[
        'Terms',
        'Guidelines',
        'About',
      ].map(page => (
        <Typography>
          &nbsp;• <Link href={`/${page.toLowerCase()}`}>{page}</Link>
        </Typography>
      ))}
    </Stack>
  );
}
