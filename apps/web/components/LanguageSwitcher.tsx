// components/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = {
  en: "English",
  ru: "Русский",
} as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const changeLang = (newLang: keyof typeof LANGUAGES) => {
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|ru)/, "");
    const newPath = newLang === "en" ? pathWithoutLang : `/${newLang}${pathWithoutLang}`;
    window.location.href = newPath || "/";
  };

  return (
    <select
      value={currentLang}
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
