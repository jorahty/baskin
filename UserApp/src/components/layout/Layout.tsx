import { useState } from 'react';
import { Box, Divider, GlobalStyles, Stack } from '@mui/joy';
import React from 'react';
import Header, { headerHeight } from './Header';
import Footer, { footerHeight } from './Footer';

interface Props {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const sx = {
  overflowY: 'scroll',
  height: `calc(100vh - ${headerHeight} - ${footerHeight})`,
};

// Note:
// Do not hard-code the width of the sidebar.
// Instead, adjust the width of the content inside the sidebar

export default function Layout({ children, sidebar }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Box bgcolor="background.surface">
        <Header handleSidebarOpen={handleSidebarOpen} />
      </Box>
      <Divider />
      <Stack direction="row" height="100%" alignItems="flex-start">
        {sidebar && (
          <Stack direction="row"
            zIndex={10}
            sx={{
              position: { xs: 'fixed', md: 'relative' },
              display: {
                xs: sidebarOpen ? 'flex' : 'none',
                md: 'flex',
              },
            }}
          >
            <Box
              bgcolor="background.surface"
              minWidth="min-content"
              sx={sx}
            >
              {sidebar}
            </Box>
            <Divider orientation="vertical" />
          </Stack>
        )}
        <Box sx={sx}>
          {sidebarOpen && <Box sx={{
            display: { md: 'none' },
            zIndex: 9,
            background: '#00000055',
            position: 'fixed',
            height: `calc(100vh - ${headerHeight} - ${footerHeight})`,
            width: '100%',
          }}
          />}
          {children}
        </Box>
      </Stack>
      <Divider />
      <Box bgcolor="background.surface">
        <Footer />
      </Box>
    </>
  );
}
