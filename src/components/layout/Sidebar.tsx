import { List, ListItem, ListItemButton } from "@mui/joy";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Category } from "../../graphql/category/schema";
import { CategoryService } from "../../graphql/category/service";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { query } = router;

  return (
    <List sx={{ p: 2, '--List-item-radius': 'var(--joy-radius-sm)' }}>
      <ListItem>
        <ListItemButton
          onClick={() => Router.push('/')}
          sx={{ fontWeight: 800 }}
        >
          All Categories
        </ListItemButton>
      </ListItem>
      {categories?.map(({ name, slug }) => (
        <ListItem key={slug}>
          <ListItemButton
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
