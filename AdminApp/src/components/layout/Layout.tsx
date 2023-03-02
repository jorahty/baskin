import { Box, Divider, GlobalStyles, Stack } from '@mui/joy';
import React from 'react';


interface Props {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const sx = {
  height: `calc(100vh)`,
  flexGrow: 1,
};

export default function Layout({ children, sidebar }: Props) {
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
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
                position: 'relative',
                display: 'flex',
                ...sx,
              }}
            >
              {sidebar}
            </Box>
            <Divider orientation="vertical" />
          </>
        )}
        <Box
          width="calc(100vw - 240)"
          sx={{
            ...sx,
          }}
        >
          {children}
        </Box>
      </Stack>
    </>
  );
}
