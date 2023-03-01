import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Box, Divider, ListItemDecorator, Stack, Typography } from '@mui/joy';
import SignOutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DashboardCustomize from '@mui/icons-material/DashboardCustomize';
import ForumIcon from '@mui/icons-material/Forum';
import { useAppContext } from '../../context';
import { useTranslation } from 'next-i18next';

export default function UserMenu() {
  const { signedInUser, signOut } = useAppContext();
  const { t } = useTranslation('common');

  const [anchor, setAnchor] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const open = Boolean(anchor);

  const handleClick = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  if (!signedInUser) return <></>;

  return (
    <>
      <Avatar
        aria-label="user-avatar"
        src={`https://robohash.org/${signedInUser.username}`}
        onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      />
      <Menu placement="bottom-end" anchorEl={anchor} open={open} onClose={handleClose} sx={{ p: 0 }}>
        <Stack direction="row" gap={1.5} p={1.5}>
          <Avatar size="lg" src={`https://robohash.org/${signedInUser.username}`} />
          <Box>
            <Typography level="h6">{signedInUser.name}</Typography>
            <Typography level="body2">{signedInUser.username}</Typography>
          </Box>
        </Stack>
        <Divider />
        <Link href={`/user/${signedInUser.username}`}>
          <MenuItem
            aria-label="Profile"
            onClick={handleClose}>
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            {t('header.dropdown.profile')}
          </MenuItem>
        </Link>
        <Link href={`/dashboard`}>
          <MenuItem
            aria-label="Dashboard"
            onClick={handleClose}>
            <ListItemDecorator>
              <DashboardCustomize />
            </ListItemDecorator>
            {t('header.dropdown.dashboard')}
          </MenuItem>
        </Link>
        <Link href={`/messages`}>
          <MenuItem
            aria-label="Messages"
            onClick={handleClose}>
            <ListItemDecorator>
              <ForumIcon />
            </ListItemDecorator>
            {t('header.dropdown.messages')}
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => signOut()}
          color="danger"
          aria-label="Sign out"
        >
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <SignOutIcon />
          </ListItemDecorator>
          {t('header.dropdown.signout')}
        </MenuItem>
      </Menu>
    </>
  );
}
