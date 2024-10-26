// types/vike.d.ts
import type { PageContextBuiltInServer, PageContextBuiltInClientWithServerRouting } from "vike/types";

declare global {
  interface PageProps {
    locale?: string;
  }

  // Определяем кастомные поля
  interface PageContextCustom {
    pageProps?: PageProps;
    urlLogical?: string;
  }

  // Для серверного контекста
  type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom;
  // Для клиентского контекста
  type PageContextClient = PageContextBuiltInClientWithServerRouting<Page> & PageContextCustom;
  // Общий тип
  type PageContext = PageContextClient | PageContextServer;
}

// Чтобы TypeScript распознал это как модуль
export {};
