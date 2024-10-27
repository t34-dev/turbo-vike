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
        data?: { [p: string]: unknown };
        content?: string;
      };
      urlLogical: string;
    }
  }
}

export {};
