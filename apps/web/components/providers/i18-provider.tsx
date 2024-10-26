import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { createI18nInstance } from "@/i18/i18n";
import { usePageContext } from "vike-react/usePageContext";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const locale = pageContext?.pageProps?.locale || "en";

  // Создаем инстанс i18n с правильным начальным языком
  const i18nInstance = React.useMemo(() => createI18nInstance(locale), [locale]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

export function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const {
    pageProps: { locale },
  } = usePageContext();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
}
