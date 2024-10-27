// types/vike.d.ts
declare global {
  namespace Vike {
    interface PageContext {
      pageProps: {
        locale: "en" | "ru";
      };
      urlLogical: string;
    }
  }
}

export {};
