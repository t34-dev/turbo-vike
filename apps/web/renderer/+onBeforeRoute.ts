// renderer/+onBeforeRoute.ts
import { modifyUrl } from "vike/modifyUrl";
import type { Url } from "vike/types";

export function onBeforeRoute(pageContext: { urlOriginal: string; urlParsed: Url }) {
  const { urlWithoutLocale, locale } = extractLocale(pageContext.urlParsed);

  return {
    pageContext: {
      locale,
      urlLogical: urlWithoutLocale,
    },
  };
}

function extractLocale(url: Url) {
  const { pathname } = url;
  const locales = ["en", "ru"] as const;

  // Check if the first path segment is a locale
  const firstSegment = pathname.split("/")[1] || "";
  const locale = locales.includes(firstSegment as (typeof locales)[number]) ? firstSegment : "en";

  // Remove the locale from pathname
  const pathnameWithoutLocale = locale === "en" ? pathname : pathname.replace(`/${locale}`, "") || "/";

  // Get URL without locale
  const urlWithoutLocale = modifyUrl(url.href, { pathname: pathnameWithoutLocale });

  return { locale, urlWithoutLocale };
}
