// pages/docs/types.d.ts
import type { PageContext } from "vike/types";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface DocsPageProps {
  metadata?: { [p: string]: unknown };
  mdxCode: MDXRemoteSerializeResult;
  locale: string;
}

export type DocsPageContext = PageContext & {
  pageProps: DocsPageProps;
};
