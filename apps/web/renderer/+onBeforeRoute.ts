// renderer/+onBeforeRoute.ts
import { modifyUrl } from "vike/modifyUrl";
import type { PageContextBuiltInServer } from "vike/types";

// Правильный экспорт
export { onBeforeRoute };

function onBeforeRoute(pageContext: PageContextBuiltInServer) {
  const { urlPathname } = pageContext;
  const urlParts = urlPathname.split("/");
  const langFromUrl = urlParts[1];
  const supportedLangs = ["en", "ru"];

  const locale = supportedLangs.includes(langFromUrl) ? langFromUrl : "en";
  const urlWithoutLocale = locale === "en" ? urlPathname : urlPathname.replace(`/${locale}`, "") || "/";

  return {
    pageContext: {
      pageProps: {
        locale,
      },
      urlLogical: urlWithoutLocale,
    },
  };
}
