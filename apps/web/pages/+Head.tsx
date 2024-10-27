// https://vike.dev/Head

import React from "react";
import logoUrl from "../assets/logo.svg";
import { usePageContext } from "vike-react/usePageContext";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  );
}
