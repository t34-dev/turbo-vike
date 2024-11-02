import React, { useRef, useEffect, PropsWithChildren, FC } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import s from "./Link.module.scss";
interface LinkProps {
  to: string;
}

export const Link: FC<PropsWithChildren<LinkProps>> = ({ to, children }) => {
  const {
    urlPathname,
    pageProps: { locale },
  } = usePageContext();

  const prevPathnameRef = useRef<string | null>(null);

  const normalizedPathname = urlPathname.replace(/\/+$/, "");
  const normalizedHref = to.replace(/\/+$/, "");
  const isActive = normalizedHref === normalizedPathname;

  let fullHref = to;
  if (locale && locale !== "en") {
    fullHref = `/${locale}${to}`;
  }

  useEffect(() => {
    prevPathnameRef.current = normalizedPathname;
  }, [normalizedPathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const prevPathname = prevPathnameRef.current;

    // Проверяем, не равен ли новый href предыдущему pathname
    if (!isActive && normalizedHref !== prevPathname) {
      navigate(fullHref);
    }
  };

  return (
    <a href={fullHref} className={isActive ? s.active : undefined} onClick={handleClick}>
      {children}
    </a>
  );
};
