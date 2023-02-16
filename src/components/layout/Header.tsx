import Link from "next/link";
import { Box, Button, IconButton, Stack } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import ModeToggle from "./ModeToggle";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { useAppContext } from "../../context";

export const headerHeight = "80px";

export default function Header({
  handleSidebarOpen,
}: {
  handleSidebarOpen: () => void;
}) {
  const { signedInUser } = useAppContext();

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
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Link href="/">
        <Logo />
      </Link>
      <Box ml="auto" />
      {signedInUser ? <UserMenu /> :
        <>
          <Link href="/signin">
            <Button variant="soft">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      }
      <ModeToggle />
    </Stack>
  );
}
