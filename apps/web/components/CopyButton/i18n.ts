// components/CopyButton/i18n.ts
export const translations = {
  en: {
    copy: "Copy",
    copied: "Copied!",
  },
  ru: {
    copy: "Копировать",
    copied: "Скопировано!",
  },
} as const;

export type Language = keyof typeof translations;
