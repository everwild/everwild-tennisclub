export const LANGS = ["ja", "en", "zh"] as const;

export type Lang = (typeof LANGS)[number];

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export function htmlLangForUiLang(lang: Lang): string {
  if (lang === "ja") {
    return "ja-JP";
  }
  if (lang === "zh") {
    return "zh-CN";
  }
  return "en";
}
