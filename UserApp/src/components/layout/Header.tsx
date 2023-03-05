import Link from 'next/link';
import { Box, Button, IconButton, Stack } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import ModeToggle from './ModeToggle';
import Logo from './Logo';
import UserMenu from './UserMenu';
import { useAppContext } from '../../context';
import LangSelect from '../common/LangSelect';
import { useTranslation } from 'next-i18next';
import ProductSearch from '../product/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const headerHeight = '80px';

interface Props {
  handleSidebarOpen: () => void;
}

export default function Header({ handleSidebarOpen }: Props) {
  const { signedInUser } = useAppContext();
  const [searchVisible, setSearchVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    setSearchVisible(
      router.pathname === '/' || router.pathname === '/category/[slug]'
    );
  }, [router.pathname]);

  return (
    <Stack
      height={headerHeight}
      direction="row"
      alignItems="center"
      px={3}
      gap={2}
    >
      <IconButton
        aria-label="menu-icon"
        onClick={handleSidebarOpen}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <Link href="/">
          <Logo />
        </Link>
      </Box>
      <Box ml="auto" />
      {searchVisible && <ProductSearch />}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LangSelect />
      </Box>
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
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ModeToggle />
      </Box>
    </Stack>
  );
}
