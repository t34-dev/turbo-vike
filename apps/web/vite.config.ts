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
import { viteStaticCopy } from "vite-plugin-static-copy";

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
    viteStaticCopy({
      targets: [
        {
          src: "pages/docs/content/**/*",
          dest: "entries/content",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
      "@assets": resolve(__dirname, "./assets"),
      "@scss": resolve(__dirname, "./assets/scss"),
      "@base": resolve(__dirname, "./assets/scss/base"),
      "@common": resolve(__dirname, "./assets/scss/common"),
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
  ssr: {
    noExternal: ["@mantine/core", "@mantine/hooks"],
  },
});
