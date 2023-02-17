import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from "@mui/joy";
import Router, { useRouter } from "next/router";
import { Category } from "../../graphql/category/schema";
import Logo from "./Logo";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <List
        sx={{
          "--List-item-radius": "var(--joy-radius-md)",
          p: 2,
          gap: 1/2,
          backgroundColor: "background.surface",
        }}>
        <ListItem>
          <ListItemButton onClick={() => Router.push("/")}>
            <Typography fontWeight="lg" component="h4">
              All Categories
            </Typography>
          </ListItemButton>
        </ListItem>
        <Divider />
        {categories?.map(({ name, slug }) => (
          <ListItem key={slug}>
            <ListItemButton
              sx={{ fontWeight: 450 }}
              onClick={() => Router.push(`/category/${slug}`)}
              selected={query.slug === slug}
              variant={query.slug === slug ? "soft" : "plain"}
            >
              {name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{
        display:{ xs: 'block', sm: 'none' },
        position: 'absolute',
        bottom: 0,
        margin: 2 
      }}>
        <Link href="/">
          <Logo />
        </Link>
      </Box>
    </>
  );
}
