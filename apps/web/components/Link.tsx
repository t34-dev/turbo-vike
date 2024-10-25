import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;

  // Нормализуем пути
  const normalizedPathname = urlPathname.replace(/\/+$/, "");
  const normalizedHref = href.replace(/\/+$/, "");
  const isActive = normalizedHref === normalizedPathname;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isActive) {
      navigate(href);
    }
  };

  return (
    <a href={href} className={isActive ? "is-active" : undefined} onClick={handleClick}>
      {children}
    </a>
  );
}
