import type { Metadata } from "next";
import { htmlLangForUiLang, type Lang } from "@/lib/lang";
import { SITE_ORIGIN } from "@/lib/site";

export const DOCUMENT_TITLE = "ETC · EVERWILD Tennis Club";
const SITE_NAME = "EVERWILD Tennis Club";

function langUrl(lang: Lang, pathAfterLang: string) {
  const seg = pathAfterLang.replace(/^\/?/, "").replace(/\/?$/, "");
  if (!seg) {
    return `${SITE_ORIGIN}/${lang}/`;
  }
  return `${SITE_ORIGIN}/${lang}/${seg}/`;
}

export function pageMetadata(opts: {
  lang: Lang;
  pathAfterLang: string;
  title: string;
  description: string;
}): Metadata {
  const { lang, pathAfterLang, title, description } = opts;
  const url = langUrl(lang, pathAfterLang);
  return {
    title: DOCUMENT_TITLE,
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: langUrl("ja", pathAfterLang),
        en: langUrl("en", pathAfterLang),
        "zh-CN": langUrl("zh", pathAfterLang)
      }
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: htmlLangForUiLang(lang)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
