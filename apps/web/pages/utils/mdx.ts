import { compile, evaluate, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

export async function createMDXComponent(source: string) {
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

  const { default: Component } = await run(compiled, runtime);
  return Component;
}

export async function createMDXComponentX(code: string) {
  try {
    const { default: Component } = await evaluate(code, {
      ...runtime,
      useMDXComponents: () => ({}),
    });
    return Component;
  } catch (error) {
    console.error("Error creating MDX component:", error);
    throw error;
  }
}
