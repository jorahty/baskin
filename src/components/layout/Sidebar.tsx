import { List, ListItem, ListItemButton } from "@mui/joy";
import Router, { useRouter } from "next/router";

const categories = [
  { name: 'Electronics',  slug: 'electronics'},
  { name: 'Clothing', slug: 'clothing'},
  { name: 'Sports Equipment', slug: 'sports-equipment'},
  { name: 'Toys', slug: 'toys'},
  { name: 'Furniture', slug: 'furniture'},
  { name: 'Instruments', slug: 'instruments'},
];

export default function Sidebar() {
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
      {categories.map(({ name, slug }) => (
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
