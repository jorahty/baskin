import { Box, Divider, Link, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import Logo from './Logo';
import React from 'react';

export default function Sidebar(
  { items, current, setCurrent }: {
    items: string[],
    current: string,
    setCurrent: (item: string) => void
  }
) {

  return (
    <>
      <List
        sx={{
          '--List-item-radius': 'var(--joy-radius-md)',
          p: 2,
          gap: 1 / 2,
          backgroundColor: 'background.surface',
        }}
      >
        <ListItem>
          <Typography
            aria-label="Dashboard"
            fontWeight="lg"
            component="h4"
          >
            Dashboard
          </Typography>
        </ListItem>
        <Divider />
        {items?.map(item => (
          <ListItem key={item}>
            <ListItemButton
              sx={{ fontWeight: 450 }}
              onClick={() => setCurrent(item)}
              selected={current === item}
              variant={current === item ? 'soft' : 'plain'}
              aria-label={item}
            >
              {item}
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

    </>
  );
}