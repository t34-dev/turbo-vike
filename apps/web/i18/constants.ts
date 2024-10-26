export const SUPPORTED_NAMESPACES = ["common", "default"] as const;
export type Namespaces = (typeof SUPPORTED_NAMESPACES)[number];
export const DEFAULT_NAMESPACE: Namespaces = "common";

export const SUPPORTED_LANGS = ["en", "ru"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";
