import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalFooter } from "@/components/LegalFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { htmlLangForUiLang, isLang, type Lang } from "@/lib/lang";
import { siteNavLabels } from "@/lib/siteHeaderLabels";
import { DOCUMENT_TITLE } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { privacyCopy } from "@/messages/privacyCopy";
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
  const t = privacyCopy[lang];
  const path = `${lang}/privacy/`;
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

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  const t = privacyCopy[lang];

  return (
    <>
      <SiteHeader lang={lang} labels={siteNavLabels(lang)} brandStrong="ETC" />
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
              <h2>{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
            </section>
            <section className="legal-block">
              <h2>{t.collectedTitle}</h2>
              <p>{t.collectedBodyOne}</p>
              <p>{t.collectedBodyTwo}</p>
            </section>
            <section className="legal-block">
              <h2>{t.purposeTitle}</h2>
              <ul className="legal-list">
                <li>{t.purposeOne}</li>
                <li>{t.purposeTwo}</li>
                <li>{t.purposeThree}</li>
                <li>{t.purposeFour}</li>
                <li>{t.purposeFive}</li>
              </ul>
            </section>
            <section className="legal-block">
              <h2>{t.retentionTitle}</h2>
              <p>{t.retentionBody}</p>
            </section>
            <section className="legal-block">
              <h2>{t.thirdPartyTitle}</h2>
              <ul className="legal-list">
                <li>{t.platformOne}</li>
                <li>{t.platformTwo}</li>
                <li>{t.platformThree}</li>
                <li>{t.platformFour}</li>
                <li>{t.platformFive}</li>
              </ul>
              <p>{t.thirdPartyBody}</p>
            </section>
            <section className="legal-block">
              <h2>{t.requestTitle}</h2>
              <p>{t.requestBody}</p>
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
