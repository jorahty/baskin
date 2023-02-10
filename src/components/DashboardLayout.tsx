import { Divider, Stack } from "@mui/joy";
import React from "react";
import Sidebar from "./Sidebar";
import SimpleLayout from "./SimpleLayout";

export default function DashbaordLayout({children}: {children: React.ReactNode}) {
  return (
    <SimpleLayout>
      <Stack direction="row" height="100%" alignItems="flex-start" >
        <Sidebar />
        <Divider orientation="vertical"/>
        {children}
      </Stack>
    </SimpleLayout>
  );
}
