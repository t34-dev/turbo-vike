// components/LanguageWrapper.tsx
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const langFromUrl = urlParts[1];
    const supportedLangs = ["en", "ru"];
    const locale = supportedLangs.includes(langFromUrl) ? langFromUrl : "en";

    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  return <>{children}</>;
}
