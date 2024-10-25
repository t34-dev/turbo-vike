import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import embedded from "sass-embedded";

export default defineConfig({
  plugins: [vike({}), react({})],
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
