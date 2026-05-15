import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalFooter } from "@/components/LegalFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { htmlLangForUiLang, isLang, type Lang } from "@/lib/lang";
import { DOCUMENT_TITLE } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";
import { legalCopy } from "@/messages/legalCopy";
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
  const t = legalCopy[lang];
  const path = `${lang}/legal/`;
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

export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  const t = legalCopy[lang];

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
              <h2>{t.operatorTitle}</h2>
              <p>{t.operatorBody}</p>
            </section>
            <section className="legal-block">
              <h2>{t.detailsTitle}</h2>
              <dl className="legal-definition">
                <div>
                  <dt>{t.companyLabel}</dt>
                  <dd>{t.companyValue}</dd>
                </div>
                <div>
                  <dt>{t.addressLabel}</dt>
                  <dd>{t.addressValue}</dd>
                </div>
                <div>
                  <dt>{t.representativeLabel}</dt>
                  <dd>{t.representativeValue}</dd>
                </div>
                <div>
                  <dt>{t.siteEmailLabel}</dt>
                  <dd>{t.siteEmailValue}</dd>
                </div>
                <div>
                  <dt>{t.phoneLabel}</dt>
                  <dd>{t.phoneValue}</dd>
                </div>
              </dl>
            </section>
            <section className="legal-block">
              <h2>{t.contentTitle}</h2>
              <p>{t.contentBodyOne}</p>
              <p>{t.contentBodyTwo}</p>
            </section>
            <section className="legal-block">
              <h2>{t.contactTitle}</h2>
              <p>{t.contactBodyOne}</p>
              <p>{t.contactBodyTwo}</p>
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
