import Router from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/joy";
import * as React from "react";

interface BackRedirectProps {
  url?: string;
}
export default function BackRedirect({ url }: BackRedirectProps) {
  return (
    <IconButton
      aria-label={"back"}
      onClick={() => {
        if (url) {
          Router.push(url);
        } else {
          Router.back();
        }
      }}
      style={{ position: "absolute", zIndex: 23, top: 15, left: 15 }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
