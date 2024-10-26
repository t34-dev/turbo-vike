import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";
import { useTranslation } from "react-i18next";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { i18n } = useTranslation();
  const { urlPathname } = pageContext;

  // Получаем текущий язык из URL
  const getCurrentLanguage = (path: string) => {
    const urlParts = path.split("/");
    return ["en", "ru"].includes(urlParts[1]) ? urlParts[1] : "en";
  };

  // Добавляем или заменяем префикс языка в URL
  const getLanguageUrl = (targetUrl: string, lang: string) => {
    // Убираем существующий префикс языка, если есть
    const urlWithoutLang = targetUrl.replace(/^\/(en|ru)/, "");
    // Добавляем новый префикс языка (кроме английского, который по умолчанию)
    return lang === "en" ? urlWithoutLang : `/${lang}${urlWithoutLang}`;
  };

  // Получаем текущий язык
  const currentLang = getCurrentLanguage(urlPathname);

  // Нормализуем пути с учетом языка
  const normalizedPathname = urlPathname.replace(/\/+$/, "");
  const normalizedHref = getLanguageUrl(href, currentLang).replace(/\/+$/, "");

  // Проверяем активность ссылки без учета языкового префикса
  const isActive = normalizedHref === normalizedPathname;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isActive) {
      const targetUrl = getLanguageUrl(href, currentLang);
      navigate(targetUrl);
    }
  };

  // Формируем href с учетом текущего языка
  const finalHref = getLanguageUrl(href, currentLang);

  return (
    <a href={finalHref} className={isActive ? "is-active" : undefined} onClick={handleClick}>
      {children}
    </a>
  );
}
