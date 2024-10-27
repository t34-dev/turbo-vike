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
import { isServer } from "@/utils/server";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  console.log("⭐ onBeforeRender START", "isServer:", isServer());
  const locale = pageContext.pageProps.locale;

  const { content: mdxSource, metadata } = await loadMDXFile();
  const { compiledSource } = await compileMDX(mdxSource);
  const { Component } = await evaluateMDX1(compiledSource);

  console.log("⭐ onBeforeRender END, Component exists:", !!Component);

  return {
    pageContext: {
      pageProps: {
        locale,
        compiledSource,
        metadata,
      },
      ServerComponent: Component,
    },
  };
};

async function loadMDXFile(locale: string = "en"): Promise<{ content: string; metadata: { [p: string]: unknown } }> {
  const source = fs.readFileSync(resolve(__dirname, `./content/${locale}/index.mdx`), "utf8");

  // const { data: metadata, content } = matter(source);

  return { content: source, metadata: {} };
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
            aliases: {},
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
export async function evaluateMDX1(compiledSource: string) {
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
