import Link from "next/link";
import type { Lang } from "@/lib/lang";
import type { HomeMessages } from "@/messages/tennisHomeCopy";

export function SiteFooter({ lang, t }: { lang: Lang; t: HomeMessages }) {
  const base = `/${lang}`;
  return (
    <footer className="site-footer">
      <div className="footer-bar">
        <div className="footer-branding">
          <span className="footer-overline">{t.footerBrandTitle}</span>
          <span className="footer-brand">
            <span>{t.footerLeft}</span>
          </span>
        </div>
        <div className="footer-links">
          <div className="footer-group">
            <span className="footer-group-title">{t.footerContactTitle}</span>
            <div className="footer-link-list">
              <a className="footer-link" href="mailto:everwildrunningclub@gmail.com">
                {t.footerContactEmail}
              </a>
            </div>
            <span className="footer-group-title">{t.footerBizTitle}</span>
            <div className="footer-link-list">
              <a className="footer-link" href="mailto:everwild.global@gmail.com">
                {t.footerBizEmail}
              </a>
            </div>
          </div>
          <div className="footer-group">
            <span className="footer-group-title">{t.footerLegalTitle}</span>
            <div className="footer-link-list">
              <Link className="footer-link" href={`${base}/legal/`}>
                {t.footerLegalLink}
              </Link>
            </div>
          </div>
          <div className="footer-group">
            <span className="footer-group-title">{t.footerPolicyTitle}</span>
            <div className="footer-link-list">
              <Link className="footer-link" href={`${base}/privacy/`}>
                {t.footerPrivacy}
              </Link>
              <Link className="footer-link" href={`${base}/terms/`}>
                {t.footerTerms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
