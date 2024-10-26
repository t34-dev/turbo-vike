// components/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";

const LANGUAGES = {
  en: "English",
  ru: "Русский",
} as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const pageContext = usePageContext();

  const changeLang = (newLang: keyof typeof LANGUAGES) => {
    const currentPath = pageContext.urlLogical || "/";
    // Если выбран английский (по умолчанию), не добавляем префикс
    const newPath = newLang === "en" ? currentPath : `/${newLang}${currentPath}`;
    window.location.href = newPath;
  };

  return (
    <select
      value={pageContext.locale || "en"}
      onChange={(e) => changeLang(e.target.value as keyof typeof LANGUAGES)}
      className="p-2 border rounded"
    >
      {Object.entries(LANGUAGES).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
