import { Box, Divider, GlobalStyles, Stack } from "@mui/joy";
import React from "react";
import Header, { headerHeight } from "./Header";

interface Props {
  children: React.ReactNode,
  sidebar?: React.ReactNode,
}

const sx = {
  overflowY: 'scroll',
  height: `calc(100vh - ${headerHeight})`,
  flexGrow: 1,
};

export default function Layout({children, sidebar}: Props) {
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Box bgcolor="background.surface">
        <Header />
      </Box>
      <Divider />
      <Stack direction="row" height="100%" alignItems="flex-start" >
        {sidebar && <Box sx={{ minWidth: 240, maxWidth: 240, ...sx }} bgcolor="background.surface">
          {sidebar}
        </Box>}
        <Divider orientation="vertical"/>
        <Box sx={sx}>
          {children}
        </Box>
      </Stack>
    </>
  );
}
