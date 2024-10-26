// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Импортируем JSON файлы напрямую
import common from "./locales/en/common.json";
import common_ru from "./locales/ru/common.json";
import default_ns from "./locales/en/default.json";
import default_ns_ru from "./locales/ru/default.json";

// Создаем инстанс i18n если его еще нет
const i18nInstance = i18n.createInstance();

i18nInstance
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: common,
        default: default_ns,
      },
      ru: {
        common: common_ru,
        default: default_ns_ru,
      },
    },
    fallbackLng: "en",
    ns: ["common", "default"],
    defaultNS: "common",
    supportedLngs: ["en", "ru"],

    // Для сохранения языка
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18nInstance;
