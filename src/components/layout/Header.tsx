import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/joy";

import ModeToggle from "./ModeToggle";
import Logo from "./Logo";
import { SignInPayload } from "@/graphql/auth/schema";
import UserMenu from "./UserMenu";

export const headerHeight = "80px";

export default function Header() {
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
