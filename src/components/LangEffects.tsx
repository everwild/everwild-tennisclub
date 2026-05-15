"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { htmlLangForUiLang, type Lang } from "@/lib/lang";

export function LangEffects({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.lang = htmlLangForUiLang(lang);
  }, [lang]);

  useEffect(() => {
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";
  }, [pathname]);

  return null;
}
