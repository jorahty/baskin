import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Box, Divider, ListItemDecorator, Stack, Typography } from '@mui/joy';
import SignOutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import { useAppContext } from '../../context';

export default function UserMenu() {
  const { signedInUser, signOut } = useAppContext();

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
          <MenuItem onClick={handleClose}>
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Profile
          </MenuItem>
        </Link>
        <Link href={`/messages`}>
          <MenuItem onClick={handleClose}>
            <ListItemDecorator>
              <ForumIcon />
            </ListItemDecorator>
            Messages
          </MenuItem>
        </Link>
        <MenuItem onClick={() => signOut()} color="danger">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <SignOutIcon />
          </ListItemDecorator>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
