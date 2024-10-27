import { useTranslation } from "react-i18next";
import { modifyUrl } from "vike/modifyUrl";
import { navigate } from "vike/client/router";
import { usePageContext } from "vike-react/usePageContext";
import { DEFAULT_LANG, DEFAULT_NAMESPACE, Namespaces, SUPPORTED_LANGS, SupportedLang } from "@/i18/constants";

// Определяем структуру переводов
interface Translations {
  common: {
    welcome: string;
    agreement: string;
    buttons: {
      submit: string;
      cancel: string;
    };
    // другие ключи
  };
  default: {
    sign_in: string;
    // другие ключи
  };
}

// Тип для получения всех возможных путей к переводам
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

// Тип для создания строки пути из массива
type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<Extract<R, string[]>, D>}`
        : never
      : string;

// Тип для всех возможных ключей переводов
type TranslationKey = Join<PathsToStringProps<Translations>, ".">;

// Тип для значений в переводах
interface TranslationValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

export function useTypedTranslation(ns?: Namespaces | Namespaces[]) {
  const { urlPathname } = usePageContext();
  const { t, i18n } = useTranslation(ns);

  // Функция для безопасной проверки поддерживаемых языков
  const isSupportedLocale = (locale: string): locale is SupportedLang =>
    SUPPORTED_LANGS.includes(locale as SupportedLang);

  return {
    t: <K extends TranslationKey>(
      key: K,
      options?: {
        defaultValue?: string;
        params?: TranslationValues;
        count?: number;
        context?: string;
      },
    ) => {
      return t(key, {
        defaultValue: options?.defaultValue || key,
        ...options?.params,
        count: options?.count,
        context: options?.context,
      });
    },

    language: i18n.language,
    supportedLanguages: SUPPORTED_LANGS,

    getCurrentLocale: () => i18n.language,

    getAllTranslations: (namespace?: Namespaces) =>
      i18n.getResourceBundle(i18n.language, namespace || DEFAULT_NAMESPACE),

    hasTranslation: (key: TranslationKey) => i18n.exists(key),

    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(i18n.language, options).format(date),

    formatNumber: (num: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(i18n.language, options).format(num),

    isLocaleSupported: isSupportedLocale,

    // Исправленная версия
    changeLocale: async (newLocale: string) => {
      if (isSupportedLocale(newLocale)) {
        const pathname = newLocale === DEFAULT_LANG ? urlPathname : `/${newLocale}${urlPathname}`;

        const newUrl = modifyUrl(window.location.href, {
          pathname,
        });

        navigate(newUrl);
      }
      return false;
    },
    // Дополнительный метод для получения списка поддерживаемых языков
    getSupportedLocales: () => SUPPORTED_LANGS,

    i18n,
  };
}
