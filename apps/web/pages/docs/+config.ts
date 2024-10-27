import type { Config } from "vike/types";

export default {
  route: "/docs*",
  passToClient: ["locale", "pageProps"],
} satisfies Config;
