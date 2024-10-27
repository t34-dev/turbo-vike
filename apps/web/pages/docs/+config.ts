import type { Config } from "vike/types";

export default {
  route: "/docs*",
  passToClient: ["locale", "pageProps"],
  meta: {
    Page: {
      env: { server: false, client: true }, // Важно! Включаем серверный рендеринг
    },
    "Page.server": {
      env: { server: true, client: false },
    },
    ServerComponent: {
      env: { server: true, client: false },
    },
  },
} satisfies Config;
