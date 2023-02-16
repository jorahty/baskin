import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";

import ModeToggle from "./ModeToggle";
import Logo from "./Logo";
import { SignInPayload } from "@/graphql/auth/schema";
import UserMenu from "./UserMenu";

export const headerHeight = "80px";

export default function Header({
  handleSidebarOpen,
}: {
  handleSidebarOpen: () => void;
}) {
  const [user, setUser] = useState<SignInPayload | undefined>(undefined);
  const [signedIn, setSignedIn] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setSignedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUser(JSON.parse(token));
      setSignedIn(true);
    }
  }, []);

  return (
    <Stack
      height={headerHeight}
      direction="row"
      alignItems="center"
      px={3}
      gap={3}
    >
      <IconButton
        aria-label="menu-icon"
        onClick={handleSidebarOpen}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Link href="/">
        <Logo />
      </Link>
      <Box ml="auto" />
      {signedIn && user ? (
        <UserMenu user={user} handleSignOut={handleSignOut} />
      ) : (
        <>
          <Link href="/signin">
            <Button variant="soft">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
      <ModeToggle />
    </Stack>
  );
}
