import React, { useRef, useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export function Link({ href, children }: { href: string; children: string }) {
  const {
    urlPathname,
    pageProps: { locale },
  } = usePageContext();

  const prevPathnameRef = useRef<string | null>(null);

  const normalizedPathname = urlPathname.replace(/\/+$/, "");
  const normalizedHref = href.replace(/\/+$/, "");
  const isActive = normalizedHref === normalizedPathname;

  let fullHref = href;
  if (locale && locale !== "en") {
    fullHref = `/${locale}${href}`;
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
    <a href={fullHref} className={isActive ? "is-active" : undefined} onClick={handleClick}>
      {children}
    </a>
  );
}
