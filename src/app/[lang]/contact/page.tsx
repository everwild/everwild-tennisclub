import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLang, type Lang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { toSiteHeaderLabels } from "@/lib/siteHeaderLabels";
import { getStrings } from "@/messages/strings";
import { tennisHomeCopy } from "@/messages/tennisHomeCopy";
import "@/styles/contact-page.css";

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
  const t = getStrings(lang);
  return pageMetadata({
    lang,
    pathAfterLang: "contact",
    title: t.contact.pageTitle,
    description: t.contact.lead
  });
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  const homeT = tennisHomeCopy[lang];
  const t = getStrings(lang);
  const c = t.contact;

  return (
    <>
      <SiteHeader lang={lang} labels={toSiteHeaderLabels(homeT)} />
      <main className="contact-page-main">
        <div className="shell" style={{ paddingTop: "clamp(5.5rem, 10vw, 7rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <div className="contact-page-grid">
            <header className="contact-page-intro">
              <h1 className="contact-page-title">{c.title}</h1>
              <p className="contact-page-lead">{c.lead}</p>
              <dl className="contact-page-dl">
                <div>
                  <dt>{c.labelAddress}</dt>
                  <dd>{c.address}</dd>
                </div>
                <div>
                  <dt>{c.labelPhone}</dt>
                  <dd>
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>{c.labelEmail}</dt>
                  <dd>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>{c.labelHours}</dt>
                  <dd>{c.hours}</dd>
                </div>
              </dl>
              <a className="contact-page-map" href="https://maps.google.com/?q=placeholder" target="_blank" rel="noopener noreferrer">
                {c.mapLabel}
              </a>
            </header>
            <div className="contact-page-form-card">
              <ContactForm
                labels={{
                  formName: c.formName,
                  formEmail: c.formEmail,
                  formMessage: c.formMessage,
                  formSubmit: c.formSubmit,
                  formNote: c.formNote,
                  formSent: c.formSent,
                  formFailed: c.formFailed
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} t={homeT} />
    </>
  );
}
