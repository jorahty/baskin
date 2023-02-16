import { List, ListItem, ListItemButton, Typography } from "@mui/joy";
import Router, { useRouter } from "next/router";
import { Category } from "../../graphql/category/schema";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { query } = router;

  return (
    <List sx={{ gap: 0.5, p: 2, "--List-item-radius": "var(--joy-radius-sm)" }}>
      <ListItem>
        <ListItemButton onClick={() => Router.push("/")}>
          <Typography fontWeight="xl" level="h6">
            All Categories
          </Typography>
        </ListItemButton>
      </ListItem>
      {categories?.map(({ name, slug }) => (
        <ListItem key={slug}>
          <ListItemButton
            sx={{ fontWeight: 500 }}
            onClick={() => Router.push(`/category/${slug}`)}
            selected={query.slug === slug}
            variant={query.slug === slug ? "soft" : "plain"}
          >
            {name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
