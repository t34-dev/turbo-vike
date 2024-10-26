// pages/+onBeforeRoute.ts
import type { OnBeforeRouteSync } from "vike/types";

const SUPPORTED_LANGS = ["en", "ru"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: SupportedLang = "en";

type BeforeRoutePageContext = {
  pageProps: {
    locale: SupportedLang;
  };
  urlLogical: string;
};

const onBeforeRoute: OnBeforeRouteSync = (pageContext): { pageContext: BeforeRoutePageContext } => {
  const { urlPathname } = pageContext;
  let urlLogical = urlPathname;
  let locale: SupportedLang = DEFAULT_LANG;

  const pathname = urlPathname.slice(1).trim();
  if (pathname) {
    const segments = pathname.split("/");
    if (segments.length) {
      const firstSegment = segments[0];

      locale = SUPPORTED_LANGS.includes(firstSegment as SupportedLang) ? (firstSegment as SupportedLang) : DEFAULT_LANG;

      if (locale !== DEFAULT_LANG) {
        urlLogical = "/" + segments.slice(1).join("/") || "/";
      }
    }
  }

  console.log("onBeforeRoute::", { locale, urlLogical, urlPathname });

  return {
    pageContext: {
      pageProps: {
        locale,
      },
      urlLogical,
    },
  };
};

export { onBeforeRoute };
