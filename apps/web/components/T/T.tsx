import React, { ReactNode, useMemo } from "react";
import { useTranslation, Trans, type TOptions } from "react-i18next";

interface TranslationValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

interface TProps<TKeys extends string = string> {
  // Ключ перевода
  k: TKeys;
  // Значение по умолчанию
  default?: string;
  // Параметры для интерполяции
  params?: TranslationValues;
  // Для случаев когда в переводе есть HTML
  html?: boolean;
  // Для сложных случаев с вложенными компонентами
  children?: ReactNode;
  // Дополнительные опции i18next
  options?: Omit<TOptions, "defaultValue">;
}

export function T<TKeys extends string = string>({
  k,
  default: defaultValue,
  params,
  html,
  children,
  options,
}: TProps<TKeys>): JSX.Element {
  const { t } = useTranslation();

  // Объединяем параметры и опции
  const tOptions = useMemo(
    () => ({
      ...options,
      ...params,
      defaultValue,
    }),
    [options, params, defaultValue],
  );

  // Если есть children, используем Trans компонент для сложных переводов
  if (children) {
    return (
      <Trans i18nKey={k} defaults={defaultValue || k} values={params} components={{ ...options?.components }}>
        {children}
      </Trans>
    );
  }

  // Получаем перевод
  const translation = t(k, tOptions);

  // Если перевод содержит HTML и html флаг включен
  if (html) {
    return <span dangerouslySetInnerHTML={{ __html: translation }} />;
  }

  return <>{translation}</>;
}

// Создаем тип для ключей из нашего TRANSLATION_KEYS
export type TranslationKey = keyof typeof import("./keys").TRANSLATION_KEYS;

// Экспортируем типизированную версию компонента
export const TypedT = T as <TKey extends TranslationKey>(props: TProps<TKey>) => JSX.Element;
