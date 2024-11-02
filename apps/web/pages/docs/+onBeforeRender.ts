import type { OnBeforeRenderAsync } from "vike/types";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import matter from "gray-matter";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs"; // Используем промисы вместо колбэков
import { serialize } from "next-mdx-remote/serialize";
import { DocsPageContext } from "@/pages/docs/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Кэш для MDX файлов
const mdxCache = new Map<string, { content: string; metadata: { [key: string]: unknown } }>();

export const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext,
): Promise<{ pageContext: Partial<DocsPageContext> }> => {
  try {
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
  } catch (error) {
    console.error(`Error processing MDX file:`, error);
    // Возвращаем дефолтное состояние или обрабатываем ошибку
    return {
      pageContext: {
        pageProps: {
          locale: pageContext.pageProps.locale,
          metadata: {},
          error: "Failed to load documentation",
        },
      },
    };
  }
};

async function loadMDXFile(locale: string = "en"): Promise<{ content: string; metadata: { [p: string]: unknown } }> {
  const cacheKey = `mdx-${locale}`;

  // Проверяем кэш
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!;
  }

  try {
    const filePath = resolve(__dirname, `./content/${locale}/index.mdx`);
    const source = await fs.readFile(filePath, "utf8");

    const { data: metadata, content } = matter(source, {
      excerpt: true,
      excerpt_separator: "---",
    });

    const result = { content, metadata };

    // Сохраняем в кэш
    mdxCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error(`Failed to load MDX file for locale ${locale}:`, error);
    // Возвращаем дефолтные значения или выбрасываем ошибку выше
    throw error;
  }
}
