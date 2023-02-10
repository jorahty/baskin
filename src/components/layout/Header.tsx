import Link from "next/link";
import { Button, Stack, Typography } from "@mui/joy";
import ModeToggle from "./ModeToggle";

export const headerHeight = "80px";

export default function Header() {
  return (
    <Stack
      height={headerHeight}
      direction="row"
      alignItems="center"
      px={3}
      gap={3}
    >
      <Link href="/" style={{ flexGrow: 1 }} passHref>
        <Typography level="h4">
          Baskin Bargain
        </Typography>
      </Link>
      <Link href="/signin">
        <Button variant="outlined">
          Sign in
        </Button>
      </Link>
      <Link href="/signup">
        <Button>
          Sign up
        </Button>
      </Link>
      <ModeToggle />
    </Stack>
  );
}
