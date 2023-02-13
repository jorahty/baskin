import { useState, MouseEvent } from "react";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import { Box, Divider, ListItemDecorator, Stack, Typography } from "@mui/joy";
import SignOutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { SignInPayload } from "@/graphql/auth/schema";

export default function UserMenu({
  user,
  handleSignOut,
}: {
  user: SignInPayload;
  handleSignOut: () => void;
}) {
  const [anchor, setAnchor] = useState<(EventTarget & HTMLDivElement) | null>(
    null
  );
  const open = Boolean(anchor);

  const handleClick = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Avatar
        aria-label="user-avatar"
        src={`https://robohash.org/${user.username}`}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />
      <Menu
        placement="bottom-end"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        sx={{ p: 0 }}
      >
        <Stack direction="row" gap={1.5} p={1.5}>
          <Avatar size="lg" src={`https://robohash.org/${user.username}`} />
          <Box>
            <Typography level="h6">{user.name}</Typography>
            <Typography level="body2">{user.username}</Typography>
          </Box>
        </Stack>
        <Divider />
        <Link href={`/user/${user.username}`}>
          <MenuItem onClick={handleClose}>
            <ListItemDecorator>
              <PersonIcon />
            </ListItemDecorator>
            Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut} color="danger">
          <ListItemDecorator sx={{ color: "inherit" }}>
            <SignOutIcon />
          </ListItemDecorator>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
