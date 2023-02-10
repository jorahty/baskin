import { List, ListItem, ListItemButton } from "@mui/joy";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const { id } = router.query;

  return (
    <List
      sx={{
        p: 2,
        '--List-item-radius': '8px',
        '& .MuiListItemButton-root': { width: 240 },
      }}
    >
      <ListItem>
        <Link href="/">
          <ListItemButton sx={{ fontWeight: 800 }}>
              All categories
          </ListItemButton>
        </Link>
      </ListItem>
      {categories.map(({ name, slug}) => (
        <ListItem key={slug}>
          <Link href={`/category/${slug}`}>
            <ListItemButton selected={ id === slug }>
              {name}
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
