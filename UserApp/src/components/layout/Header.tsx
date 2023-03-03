import Link from 'next/link';
import { Box, Button, IconButton, Stack } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ModeToggle from './ModeToggle';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { useAppContext } from '../../context';
import LanguageSwitch from '../common/LanguageSwitch';
import { useTranslation } from 'next-i18next';

export const headerHeight = '80px';

export default function Header({ handleSidebarOpen }: { handleSidebarOpen: () => void }) {
  const { signedInUser } = useAppContext();
  const { t } = useTranslation('common');

  return (
    <Stack
      height={headerHeight}
      direction="row"
      alignItems="center"
      px={3}
      gap={1}
    >
      <IconButton
        aria-label="menu-icon"
        onClick={handleSidebarOpen}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Link href="/">
          <Logo />
        </Link>
      </Box>
      <Box ml="auto" />
      {signedInUser ? (
        <UserMenu />
      ) : (
        <>
          <Link href="/signin">
            <Button
              variant="soft"
              aria-label="Sign in"
            >
              {t('header.signin')}
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              aria-label="Sign up"
            >
              {t('header.signup')}
            </Button>
          </Link>
        </>
      )}
      <LanguageSwitch />
      <ModeToggle />
    </Stack>
  );
}
