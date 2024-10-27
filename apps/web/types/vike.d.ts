import type { MDXComponents, MDXContent } from "mdx/types";

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
        compiledSource?: string;
      };
      ServerComponent: MDXContent;
      urlLogical: string;
    }
  }
}

export {};
