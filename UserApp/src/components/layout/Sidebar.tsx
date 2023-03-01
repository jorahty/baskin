import { Box, Button, List, ListItem, ListItemButton, Stack, Typography } from '@mui/joy';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Category } from '../../graphql/category/schema';
import Logo from './Logo';

export default function Sidebar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const { query } = router;

  return (
    <Stack p={2} width="100%">
      <Link href="/product/create">
        <Button fullWidth>Sell new product</Button>
      </Link>
      <List
        sx={{
          '--List-item-radius': 'var(--joy-radius-md)',
          gap: 1 / 2,
          backgroundColor: 'background.surface',
        }}
      >
        <ListItem>
          <ListItemButton onClick={() => Router.push('/')}>
            <Typography fontWeight="800" component="h4">
              All Categories
            </Typography>
          </ListItemButton>
        </ListItem>
        {categories?.map(({ name, slug }) => (
          <ListItem key={slug}>
            <ListItemButton
              sx={{ fontWeight: 450 }}
              onClick={() => Router.push(`/category/${slug}`)}
              selected={query.slug === slug}
              variant={query.slug === slug ? 'soft' : 'plain'}
            >
              {name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'absolute',
          bottom: 0,
          margin: 2,
        }}
      >
        <Link href="/">
          <Logo />
        </Link>
      </Box>
    </Stack>
  );
}
