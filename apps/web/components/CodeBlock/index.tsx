import React, { useId } from "react";
import { CopyButton } from "../CopyButton";
import type { Language } from "../CopyButton/i18n";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: Language;
}

export function CodeBlock({ children, className, language = "en" }: CodeBlockProps) {
  // Генерируем уникальный ID для этого блока кода
  const id = useId().replace(/:/g, "-");
  const codeId = `code-${id}`;

  return (
    <pre className={className}>
      <code id={codeId}>{children}</code>
      <CopyButton selector={`#${codeId}`} language={language} />
    </pre>
  );
}
