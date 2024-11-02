import React, { FC, PropsWithChildren } from "react";
import s from "./LayoutBody.module.scss";
import { Container } from "@/components/Container/Container";
import logoUrl from "@assets/logo.svg";
import { Link } from "@/components/Link/Link";

export const LayoutBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.wrap}>
      <Container className={s.wrap__container}>
        <div className={s.wrap__left}>
          <div className={s.logo}>
            <a href="/">
              <img src={logoUrl} height={64} width={64} alt="logo" />
            </a>
            <a href="/">
              <img src={"/logo.svg"} height={64} width={64} alt="logo" />
            </a>
          </div>
          <div className={s.nav}>
            <Link href="/">Welcome</Link>
            <Link href="/todo">Todo</Link>
            <Link href="/star-wars">Data Fetching</Link>
            <Link href="/login">Login</Link>
            <Link href="/query">Query</Link>
            <Link href="/lang">Lang</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/docs">Docs</Link>
          </div>
        </div>
        <div className={s.wrap__right}>{children}</div>
      </Container>
    </div>
  );
};
