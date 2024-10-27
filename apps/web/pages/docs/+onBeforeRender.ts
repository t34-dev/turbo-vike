import type { OnBeforeRenderAsync } from "vike/types";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import matter from "gray-matter";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { DocsPageContext } from "@/pages/docs/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext,
): Promise<{ pageContext: Partial<DocsPageContext> }> => {
  const { content, metadata } = await loadMDXFile(pageContext.pageProps.locale);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeCodeTitles,
        rehypeKatex,
        [
          rehypePrism,
          {
            ignoreMissing: true,
            showLineNumbers: true,
            defaultLanguage: "typescript",
            aliases: {},
          },
        ],
      ],
    },
  });

  return {
    pageContext: {
      pageProps: {
        locale: pageContext.pageProps.locale,
        mdxCode: mdxSource,
        metadata,
      },
    },
  };
};

async function loadMDXFile(locale: string = "en"): Promise<{ content: string; metadata: { [p: string]: unknown } }> {
  const source = fs.readFileSync(resolve(__dirname, `./content/${locale}/index.mdx`), "utf8");

  const { data: metadata, content } = matter(source, {
    excerpt: true,
    excerpt_separator: "---",
  });

  return { content, metadata };
}
