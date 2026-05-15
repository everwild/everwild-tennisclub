import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalFooter } from "@/components/LegalFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { htmlLangForUiLang, isLang, type Lang } from "@/lib/lang";
import { DOCUMENT_TITLE } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { termsCopy } from "@/messages/termsCopy";
import "@/styles/legal.css";

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
  const t = termsCopy[lang];
  const path = `${lang}/terms/`;
  return {
    title: DOCUMENT_TITLE,
    description: t.intro,
    alternates: { canonical: `${SITE_ORIGIN}/${path}` },
    openGraph: {
      title: t.pageTitle,
      description: t.intro,
      url: `${SITE_ORIGIN}/${path}`,
      images: [`${SITE_ORIGIN}/assets/images/logo/horizontal-white.png`],
      locale: htmlLangForUiLang(lang)
    }
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  const t = termsCopy[lang];

  return (
    <>
      <SiteHeader lang={lang} labels={t} brandStrong="ETC" />
      <main>
        <section className="legal-hero">
          <div className="legal-shell">
            <span className="legal-kicker">{t.kicker}</span>
            <h1 className="legal-title">{t.title}</h1>
            <p className="legal-intro">{t.intro}</p>
          </div>
        </section>
        <section className="legal-body">
          <div className="legal-shell legal-content">
            <section className="legal-block">
              <h2>{t.disclaimerTitle}</h2>
              <p>{t.disclaimerBodyOne}</p>
              <p>{t.disclaimerBodyTwo}</p>
            </section>
            <section className="legal-block">
              <h2>{t.changesTitle}</h2>
              <p>{t.changesBodyOne}</p>
              <p>{t.changesBodyTwo}</p>
            </section>
            <section className="legal-block">
              <h2>{t.safetyTitle}</h2>
              <p>{t.safetyBodyOne}</p>
              <p>{t.safetyBodyTwo}</p>
              <p>{t.safetyBodyThree}</p>
            </section>
            <section className="legal-block">
              <h2>{t.externalTitle}</h2>
              <p>{t.externalBodyOne}</p>
              <p>{t.externalBodyTwo}</p>
            </section>
            <section className="legal-block">
              <h2>{t.updatedTitle}</h2>
              <p>{t.updatedValue}</p>
            </section>
          </div>
        </section>
      </main>
      <LegalFooter t={t} />
    </>
  );
}
