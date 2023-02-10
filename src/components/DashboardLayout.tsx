import { Box, Divider, Stack } from "@mui/joy";
import React from "react";
import { headerHeight } from "./Header";
import Sidebar from "./Sidebar";
import SimpleLayout from "./SimpleLayout";

export default function DashbaordLayout({children}: {children: React.ReactNode}) {
  return (
    <SimpleLayout>
      <Stack direction="row" height="100%" alignItems="flex-start" >
        <Sidebar />
        <Divider orientation="vertical"/>
        <Box sx={{
          overflowY: 'scroll',
          height: `calc(100vh - ${headerHeight})`,
          flexGrow: 1,
        }}>
          {children}
        </Box>
      </Stack>
    </SimpleLayout>
  );
}
