// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Импортируем JSON файлы напрямую
import common from "./locales/en/common.json";
import default_ns from "./locales/en/default.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: common,
        default: default_ns,
      },
    },
    fallbackLng: "en",
    // Указываем все используемые пространства имен
    ns: ["common", "default"],
    // Пространство имен по умолчанию
    defaultNS: "common",
    supportedLngs: ["en", "ru"],

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
