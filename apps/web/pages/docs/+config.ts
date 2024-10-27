import type { Config } from "vike/types";

export default {
  route: "/docs*",
  passToClient: ["locale", "pageProps"],
  ssr: true,
  meta: {
    Page: {
      env: { server: true, client: true },
    },
    ServerComponent: {
      env: { server: true, client: false },
    },
  },
} satisfies Config;
