import { useTranslation } from "react-i18next";
import type { TranslationValues } from "../types";
import { TranslationKey } from "@/components/T/T";

export function useTypedTranslation() {
  const { t, i18n } = useTranslation();

  return {
    t: (key: TranslationKey, defaultValue?: string, params?: TranslationValues) => {
      return t(key, {
        defaultValue: defaultValue || key,
        ...params,
      });
    },
    i18n,
  };
}
