import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import embedded from "sass-embedded";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vike({}),
    react({}),
    mdx({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeCodeTitles,
        rehypeKatex,
        [
          rehypePrism,
          {
            ignoreMissing: true,
            showLineNumbers: true,
            defaultLanguage: "typescript",
            aliases: {}, // алиасы для языков
          },
        ],
      ],
    }),
  ],
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
    modules: {
      generateScopedName: process.env.NODE_ENV === "development" ? "[path][name]__[local]" : "[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        api: "modern",
        implementation: embedded,
      },
    },
  },
});
