import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import embedded from "sass-embedded";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Типизируем опции для rehype-pretty-code
const prettyCodeOptions: PrettyCodeOptions = {
  // Используем тему One Dark Pro
  theme: "one-dark-pro",

  // Или можно использовать объект темы напрямую
  // theme: JSON.parse(readFileSync('./themes/one-dark-pro.json', 'utf-8')),

  keepBackground: true,
  defaultLang: "typescript",

  // Дополнительные настройки для более точного соответствия
  elementStyles: {
    pre: {
      "border-radius": "0.3em",
      padding: "1em",
      margin: "0.5em 0",
      overflow: "auto",
    },
    code: {
      color: "#abb2bf",
      "text-shadow": "0 1px rgba(0, 0, 0, 0.3)",
      "font-family": '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
      direction: "ltr",
      "text-align": "left",
      "white-space": "pre",
      "word-spacing": "normal",
      "word-break": "normal",
      "line-height": "1.5",
      "tab-size": "2",
    },
  },

  // Классы для токенов
  tokensMap: {
    comment: "text-[#5c6370] italic",
    function: "text-[#61afef]",
    keyword: "text-[#c678dd]",
    string: "text-[#98c379]",
    number: "text-[#d19a66]",
  },
};
export default defineConfig({
  plugins: [
    vike({}),
    react({}),
    mdx({
      remarkPlugins: [
        remarkGfm, // Поддержка GFM (таблицы, списки и т.д.)
        remarkMath, // Парсинг математических выражений
      ],
      rehypePlugins: [
        rehypeKatex, // Рендеринг математических выражений через KaTeX
        [rehypePrettyCode, prettyCodeOptions], // Подсветка кода
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
