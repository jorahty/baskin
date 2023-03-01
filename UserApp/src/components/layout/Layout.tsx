import { useState } from 'react';
import { Box, Divider, GlobalStyles, Stack } from '@mui/joy';
import React from 'react';
import Header, { headerHeight } from './Header';
import BackDrop from './BackDrop';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

interface Props {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const sx = {
  overflowY: 'scroll',
  height: `calc(100vh - ${headerHeight})`,
  flexGrow: 1,
};

export default function Layout({ children, sidebar }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Box bgcolor="background.surface" sx={{ zIndex: 3 }}>
        <Header handleSidebarOpen={handleSidebarOpen} />
      </Box>
      <Divider />
      <Stack direction="row" height="100%" alignItems="flex-start">
        {sidebar && (
          <>
            <Box
              bgcolor="background.surface"
              sx={{
                zIndex: 3,
                minWidth: 240,
                maxWidth: 240,
                position: { xs: 'fixed', md: 'relative' },
                display: {
                  xs: sidebarOpen ? 'flex' : 'none',
                  // xs: (sidebarOpen && "flex") || "none",
                  md: 'flex',
                },
                ...sx,
              }}
            >
              {sidebar}
            </Box>
            {sidebarOpen && <BackDrop handleClick={handleSidebarOpen} />}
            <Divider orientation="vertical" />
          </>
        )}
        <Box
          width="calc(100vw - 240)"
          sx={{
            ...(sidebarOpen && { zIndex: -1 }),
            ...sx,
          }}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
}
