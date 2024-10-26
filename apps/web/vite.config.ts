import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import embedded from "sass-embedded";
import mdx from "@mdx-js/rollup";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vike({}), react({}), mdx()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
  server: {
    proxy: {
      "/placeholder": {
        target: "https://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/placeholder/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        implementation: embedded,
      },
    },
  },
});
