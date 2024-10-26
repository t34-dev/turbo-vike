// pages/docs/useDocumentation.ts
import { usePageContext } from "vike-react/usePageContext";

export function useDocumentation() {
  const pageContext = usePageContext();
  const locale = pageContext.pageProps.locale;

  return {
    locale,
    isDocsPage: pageContext.urlPathname.startsWith("/docs"),
    currentPath: pageContext.urlLogical || "/index",
  };
}
