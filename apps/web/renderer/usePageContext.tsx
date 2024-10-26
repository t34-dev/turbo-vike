// renderer/usePageContext.tsx
import React, { createContext, useContext } from "react";

export type PageContextCustom = {
  pageProps?: {
    locale?: string;
  };
  urlLogical?: string;
};

export type PageContext = PageContextCustom & {
  Page: (pageProps: any) => React.ReactElement;
  pageProps?: Record<string, unknown>;
  urlPathname: string;
};

const Context = createContext<PageContext>(undefined as any);

export function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: React.ReactNode;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

export function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
