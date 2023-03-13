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
  disableSidebarToggle: boolean | undefined;
  // menuIconVisible: boolean | undefined;
}

export default function Header({ handleSidebarOpen, locale, disableSidebarToggle }: Props) {
  const { signedInUser } = useAppContext();
  const [searchVisible, setSearchVisible] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);
  const { pathname } = useRouter();
  const { t } = useTranslation('common');

  useEffect(() => {
    setSearchVisible(['/', '/category/[slug]', '/saved'].includes(pathname));
    setSavedVisible(['/', '/category/[slug]'].includes(pathname));
  }, [pathname]);

  return (
    <Stack
      height={headerHeight}
      direction="row"
      alignItems="center"
      sx={{ p: { xs: 2, sm: 3 } }}
      gap={2}
    >
      <Stack direction="row" gap={2} flexGrow={1}>
        {!disableSidebarToggle && (
          <IconButton
            aria-label="menu-icon"
            onClick={handleSidebarOpen}
            sx={{ display: { xs: 'block', md: 'none' } }}
            variant="plain"
            color="neutral"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: { xs: (disableSidebarToggle && 'block') || 'none', md: 'block' } }}>
          <Link href="/">
            <Logo />
          </Link>
        </Box>
      </Stack>
      <Stack direction="row" gap={2} minWidth={0} flexGrow={0}>
        {searchVisible && (
          <Box minWidth={0}>
            <ProductSearch />
          </Box>
        )}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <LangSelect localeG={locale} />
        </Box>
        {signedInUser ? (
          <UserMenu />
        ) : (
          <>
            <Link href="/signin">
              <Button variant="soft" aria-label="Sign in">
                {t('header.signin')}
              </Button>
            </Link>
            <Link href="/signup">
              <Button aria-label="Sign up">{t('header.signup')}</Button>
            </Link>
          </>
        )}
        {savedVisible && (
          <Tooltip title="View saved products">
            <Link href="/saved">
              <IconButton sx={{ display: { xs: 'none', sm: 'block' } }} variant="plain" color="neutral">
                <BookmarkBorder />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <ModeToggle />
        </Box>
      </Stack>
    </Stack>
  );
}
