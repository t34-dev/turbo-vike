import type { OnBeforeRenderAsync } from "vike/types";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import matter from "gray-matter";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const locale = pageContext.pageProps.locale;

  const { content: mdxSource, metadata } = await loadMDXFile();

  // Компилируем MDX на сервере
  const { compiledSource } = await compileMDX(mdxSource);

  // Важно: выполняем первичный рендеринг на сервере
  const { Component } = await evaluateMDX(compiledSource);

  return {
    pageContext: {
      pageProps: {
        locale,
        Component, // Уже готовый React компонент
        compiledSource, // Для гидрации на клиенте
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

// Компиляция MDX в JavaScript
async function compileMDX(source: string) {
  try {
    const compiled = await compile(source, {
      outputFormat: "function-body",
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
            aliases: {
              typescript: ["ts", "tsx"],
              javascript: ["js", "jsx"],
            },
          },
        ],
      ],
    });

    return {
      compiledSource: String(compiled),
      metadata: {}, // Метаданные из фронтматтера уже извлечены в loadMDXFile
    };
  } catch (error) {
    console.error("MDX compilation error:", error);
    throw error;
  }
}
// Выполнение скомпилированного MDX и создание React компонента
async function evaluateMDX(compiledSource: string) {
  try {
    const { default: Component } = await run(compiledSource, {
      ...runtime,
      // Здесь можно добавить глобальные компоненты
      // Counter: runtime.jsx.bind(null, "Counter"),
    });

    return { Component };
  } catch (error) {
    console.error("MDX evaluation error:", error);
    throw error;
  }
}
