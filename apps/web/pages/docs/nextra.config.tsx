// pages/docs/theme.config.tsx
import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Your Project</span>,
  project: {
    link: "https://github.com/yourusername/your-project",
  },
  docsRepositoryBase: "https://github.com/yourusername/your-project/tree/main/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Your Project",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Your project documentation" />
    </>
  ),
  search: {
    placeholder: "Search documentation...",
  },
  darkMode: true,
  primaryHue: {
    light: 210,
    dark: 204,
  },
  i18n: [
    { locale: "en", text: "English" },
    { locale: "ru", text: "Русский" },
  ],
  footer: {
    text: `© ${new Date().getFullYear()} Your Project. All rights reserved.`,
  },
};

export default config;
