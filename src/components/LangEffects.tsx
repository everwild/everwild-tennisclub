"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { htmlLangForUiLang, type Lang } from "@/lib/lang";

/** Instant scroll top so route changes (e.g. locale) land flush at y=0 — avoids `scroll-behavior: smooth` stopping short. */
function scrollDocumentToTop() {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

export function LangEffects({ lang }: { lang: Lang }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.lang = htmlLangForUiLang(lang);
  }, [lang]);

  useLayoutEffect(() => {
    scrollDocumentToTop();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";
  }, [pathname]);

  return null;
}
