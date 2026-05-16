import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TennisHomeEffects } from "@/components/home/TennisHomeEffects";
import { TennisHomeMain } from "@/components/home/TennisHomeMain";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { siteNavLabels } from "@/lib/siteHeaderLabels";
import { SITE_ORIGIN } from "@/lib/site";
import { tennisHomeCopy } from "@/messages/tennisHomeCopy";

const ogLogo = `${SITE_ORIGIN}/assets/images/logo/horizontal-white.png`;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    return {};
  }
  const lang = raw as Lang;
  const t = tennisHomeCopy[lang];
  const base = pageMetadata({
    lang,
    pathAfterLang: "",
    title: "Home",
    description: t.heroBody
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      title: t.pageTitle,
      images: [ogLogo]
    },
    twitter: {
      ...base.twitter,
      title: t.pageTitle,
      images: [ogLogo]
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  const t = tennisHomeCopy[lang];

  return (
    <>
      <SiteHeader lang={lang} labels={siteNavLabels(lang)} />
      <TennisHomeMain lang={lang} t={t} />
      <SiteFooter lang={lang} t={t} />
      <TennisHomeEffects />
    </>
  );
}
