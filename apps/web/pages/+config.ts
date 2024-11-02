import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import { Layout } from "@/layouts/Layout/Layout";

export default {
  Layout,
  title: "My Vike App",
  description: "Demo showcasing Vike",
  extends: vikeReact,
  passToClient: ["pageProps", "urlLogical", "locale"],
  meta: {
    "color-scheme": {
      env: {
        client: true,
        server: true,
      },
      name: "color-scheme",
      content: "light dark",
    },
  },
} satisfies Partial<CustomConfig>;

type MetaConfig = {
  "color-scheme": {
    env: { client: boolean; server: boolean };
    name: string;
    content: string;
  };
};

// Расширяем ConfigDefinition
type CustomConfig = Config & {
  meta: MetaConfig;
};
