import React, { useCallback, useState } from "react";
import { translations, type Language } from "./i18n";
import s from "./index.module.scss";

interface CopyButtonProps {
  selector: string; // селектор для поиска элемента code
  language?: Language;
}

export function CopyButton({ selector, language = "en" }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const texts = translations[language];

  const handleCopy = useCallback(async () => {
    try {
      // Получаем элемент code по селектору
      const codeElement = document.querySelector(selector);
      if (!codeElement) return;

      // Получаем текст для копирования
      const textToCopy = codeElement.textContent || "";

      // Копируем в буфер обмена
      await navigator.clipboard.writeText(textToCopy);

      // Показываем статус
      setIsCopied(true);

      // Сбрасываем статус через 2 секунды
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [selector]);

  return (
    <button
      className={`${s.copyButton} ${isCopied ? s.copied : ""}`}
      onClick={handleCopy}
      type="button"
      aria-label={texts.copy}
    >
      {isCopied ? texts.copied : texts.copy}
    </button>
  );
}
