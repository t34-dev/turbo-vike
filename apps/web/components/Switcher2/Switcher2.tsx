import React from "react";
import { useTypedTranslation } from "@/i18/useTypedTranslation";

export function Switcher2() {
  const { getCurrentLocale, changeLocale, getSupportedLocales } = useTypedTranslation();

  const currentLocale = getCurrentLocale();
  const supportedLocales = getSupportedLocales();

  return (
    <select value={currentLocale} onChange={(e) => changeLocale(e.target.value)}>
      {supportedLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
