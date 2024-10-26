// pages/lang/+onBeforeRender.ts
export function onBeforeRender(pageContext: any) {
  const { urlPathname } = pageContext;
  const urlParts = urlPathname.split("/");
  const langFromUrl = urlParts[1];
  const supportedLangs = ["en", "ru"];

  const locale = supportedLangs.includes(langFromUrl) ? langFromUrl : "en";

  return {
    pageContext: {
      pageProps: {
        locale,
      },
    },
  };
}
