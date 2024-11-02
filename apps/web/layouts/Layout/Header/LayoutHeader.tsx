import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { useTranslation } from "react-i18next";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { Container } from "@/components/Container/Container";
import { Link } from "@/components/Link/Link";
import { Switcher2 } from "@/components/Switcher2/Switcher2";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import s from "./LayoutHeader.module.scss";

export const LayoutHeader = () => {
  const {
    pageProps: { locale },
  } = usePageContext();
  const { ready } = useTranslation();
  const { user } = useUser();
  return (
    <div className={s.header}>
      <Container className={s.header__container}>
        <div className={s.header__logo}>
          <Link href="/">LOGO</Link>
          <Switcher2 />
        </div>
        <div className={s.header__user}>
          <div className="mb-4">
            <p>i18n language: {locale}</p>
            <LanguageSwitcher />
            {!ready && <div>Loading...</div>}
          </div>
          {!user ? (
            <Link href="/login">Login</Link>
          ) : (
            <SignedIn>
              <div>
                <UserButton />
                {user?.firstName && <div>{user.firstName}</div>}
              </div>
            </SignedIn>
          )}
        </div>
      </Container>
    </div>
  );
};
