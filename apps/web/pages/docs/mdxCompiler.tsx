import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

export async function compileMDX(source: string) {
  // Компилируем MDX в JavaScript
  const compiled = await compile(source, {
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
        },
      ],
    ],
  });

  // Выполняем скомпилированный код
  const { default: Component } = await run(compiled, runtime);

  return {
    Component,
  };
}
