// pages/+config.ts
import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault.js";

export default {
  Layout,
  title: "My Vike App",
  description: "Demo showcasing Vike",
  extends: vikeReact,

  // Указываем, какие данные нужно передать на клиент
  passToClient: ["locale", "urlLogical", "pageProps"],
} satisfies Config;
