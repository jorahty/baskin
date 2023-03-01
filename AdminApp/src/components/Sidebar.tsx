import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function Sidebar({ tabs, current, setCurrent }:
  {tabs: string[], current:string, setCurrent: (item: string) => void}) {
  return (
    <React.Fragment>
      <Box
        className="SecondSidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.body',
          opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
          transition: 'opacity 0.4s',
        }}
      />
      <Sheet
        className="SecondSidebar"
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'transform 0.4s',
          zIndex: 9999,
          height: '100dvh',
          width: 240,
          top: 0,
          p: 2,
          py: 3,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <List
          sx={{
            '--List-item-radius': '8px',
            '--List-item-minHeight': '32px',
            '--List-gap': '4px',
          }}
        >
          <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
            Dashboard
          </ListSubheader>
          {tabs?.map(tab => (
            <ListItem key={tab}>
              <ListItemButton
                selected={tab==current} variant={tab == current ? 'soft' : 'plain'}
                onClick={() => setCurrent(tab)}
              >
                <ListItemContent>{tab}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ pl: 1, mt: 'auto', display: 'flex', alignItems: 'center' }}>
          <div>
            <Typography fontWeight="lg" level="body2">
              Olivia Ryhe
            </Typography>
            <Typography level="body2">olivia@email.com</Typography>
          </div>
          <IconButton variant="plain" sx={{ ml: 'auto' }}>
            <i data-feather="log-out" />
          </IconButton>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
