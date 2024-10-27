import type { MDXComponents } from "mdx/types";

// types/vike.d.ts
declare global {
  namespace Vike {
    // Типизация для Todo
    interface Todo {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }

    interface PageContext {
      pageProps: {
        locale: "en" | "ru";
        todos?: Todo[];
        metadata?: { [p: string]: unknown };
        content?: string;
        MDXData?: MDXComponent;
        Component?: MDXComponent;
        compiledSource?: string;
        mdxSource?: string;
      };
      urlLogical: string;
    }
  }
}

export {};
