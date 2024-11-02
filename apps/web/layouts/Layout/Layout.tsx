import "@scss/main.scss";
import "./style.css";
import s from "./Layout.module.scss";
import "@rainbow-me/rainbowkit/styles.css";

import React, { FC, PropsWithChildren } from "react";
import { RootProvider } from "@/components/providers/root-provider";
import { LayoutHeader } from "@/layouts/Layout/Header/LayoutHeader";
import { LayoutBody } from "@/layouts/Layout/LayoutBody/LayoutBody";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RootProvider>
      <div className={s.wrap}>
        <LayoutHeader />
        <LayoutBody>{children}</LayoutBody>
      </div>
    </RootProvider>
  );
};
