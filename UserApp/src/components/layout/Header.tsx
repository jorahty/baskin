import Link from 'next/link';
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/joy';
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
import { BookmarkBorder } from '@mui/icons-material';

export const headerHeight = '80px';

interface Props {
  handleSidebarOpen: () => void;
  locale: string;
}

export default function Header({ handleSidebarOpen, locale }: Props) {
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
      sx={{ p: { xs: 2, sm: 3 } }}
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
      <Box ml="auto" sx={{ display: { xs: 'none', sm: 'block' } }} />
      {searchVisible && <ProductSearch />}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LangSelect localeG={locale}/>
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
      {searchVisible &&
        <Tooltip title="View saved products">
          <Link href="/saved">
            <IconButton
              sx={{ display: { xs: 'none', sm: 'block' } }}
              variant="plain"
              color="neutral"
            >
              <BookmarkBorder />
            </IconButton>
          </Link>
        </Tooltip>
      }
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <ModeToggle />
      </Box>
    </Stack>
  );
}
