// pages/route.ts
import type { PageContext } from "vike/types";

export function checkLanguageRoute(pageContext: { urlPathname: string }) {
  const urlParts = pageContext.urlPathname.split("/");
  const langFromUrl = urlParts[1];
  const supportedLangs = ["en", "ru"];

  if (supportedLangs.includes(langFromUrl)) {
    const pathWithoutLang = "/" + urlParts.slice(2).join("/");
    return {
      routeParams: { lang: langFromUrl },
      urlPathname: pathWithoutLang,
    };
  }

  return {
    routeParams: { lang: "en" },
    urlPathname: pageContext.urlPathname,
  };
}

checkLanguageRoute.env = { config: true };
