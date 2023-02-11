import { Box, Divider, Stack } from "@mui/joy";
import React from "react";
import { headerHeight } from "./Header";
import Sidebar from "./Sidebar";
import SimpleLayout from "./SimpleLayout";

const sx = {
  overflowY: 'scroll',
  height: `calc(100vh - ${headerHeight})`,
  flexGrow: 1,
};

export default function DashbaordLayout({children}: {children: React.ReactNode}) {
  return (
    <SimpleLayout>
      <Stack direction="row" height="100%" alignItems="flex-start" >
        <Box sx={{ minWidth: 240, maxWidth: 240, ...sx }}>
          <Sidebar />
        </Box>
        <Divider orientation="vertical"/>
        <Box sx={sx}>
          {children}
        </Box>
      </Stack>
    </SimpleLayout>
  );
}
