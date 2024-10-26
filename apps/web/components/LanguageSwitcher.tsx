import React from "react";
import { useTypedTranslation } from "@/i18/useTypedTranslation";
import { SupportedLang } from "@/i18/constants";

const LANGUAGES = {
  en: "English",
  ru: "Русский",
} as const;

export function LanguageSwitcher() {
  const { changeLocale, getCurrentLocale } = useTypedTranslation();

  return (
    <select
      value={getCurrentLocale()}
      // onChange={(e) => changeLang(e.target.value as keyof typeof LANGUAGES)}
      onChange={(e) => changeLocale(e.target.value as SupportedLang)}
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
