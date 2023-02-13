import { useState, MouseEvent } from "react";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import { Stack, Typography } from "@mui/joy";

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
        color="primary"
        src={`https://robohash.org/${user.username}`}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />
      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        <Stack direction="row" gap={1.5} p={1.5}>
          <Avatar
            color="primary"
            src={`https://robohash.org/${user.username}`}
          />
          <Typography sx={{ m: "auto" }}>{user.username}</Typography>
        </Stack>
        <Link href={`/user/${user.username}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
