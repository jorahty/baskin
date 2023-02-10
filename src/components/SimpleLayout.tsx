import { Box, Divider, GlobalStyles } from "@mui/joy";
import React from "react";
import Header, { headerHeight } from "./Header";

export default function SimpleLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />
      <Header />
      <Divider />
      <Box sx={{ overflowY: 'scroll', height: `calc(100vh - ${headerHeight})` }}>
        {children}
      </Box>
    </>
  );
}
