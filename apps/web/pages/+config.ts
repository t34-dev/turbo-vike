// pages/+config.ts
import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import { Layout } from "@/layouts/Layout/Layout";

export default {
  Layout,
  title: "My Vike App",
  description: "Demo showcasing Vike",
  extends: vikeReact,
  passToClient: ["pageProps", "urlLogical", "locale"],
} satisfies Config;
