import type { OnBeforeRenderAsync } from "vike/types";
import matter, { GrayMatterFile } from "gray-matter";
import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Типизация данных с JSONPlaceholder
interface Todo {
  data?: { [p: string]: unknown };
  content?: string;
}

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const locale = pageContext.pageProps?.locale || "en";

  const source = fs.readFileSync(resolve(__dirname, "./content/en/index.mdx"), "utf8");
  const { data, excerpt } = matter(source, {
    excerpt: true,
    excerpt_separator: "---", // Используйте разделитель, который соответствует вашему формату
  });

  console.log("XXX", { data, excerpt });

  return {
    pageContext: {
      pageProps: {
        locale,
        content: excerpt,
        data,
      },
    },
  };
};
