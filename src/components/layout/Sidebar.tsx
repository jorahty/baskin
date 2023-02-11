import { List, ListItem, ListItemButton } from "@mui/joy";
import Router, { useRouter } from "next/router";

const categories = [
  { name: 'Electronics',  slug: 'electronics'},
  { name: 'Clothing', slug: 'clothing'},
  { name: 'Sports Equipment', slug: 'sports-equipment'},
  { name: 'Toys', slug: 'toys'},
  { name: 'Furniture', slug: 'furniture'},
  { name: 'Instruments', slug: 'instruments'},
  { name: 'Office', slug: 'office'},
  { name: 'Free', slug: 'free'},
];

export default function Sidebar() {
  const router = useRouter();
  const { query } = router;

  return (
    <List sx={{ p: 2 }}>
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
            selected={ query.slug === slug }
          >
            {name}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
