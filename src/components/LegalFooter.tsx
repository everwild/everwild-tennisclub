type LegalFooterDict = {
  footerLeft: string;
  footerRight: string;
};

export function LegalFooter({ t }: { t: LegalFooterDict }) {
  return (
    <footer className="legal-footer">
      <div className="shell">
        <span>{t.footerLeft}</span>
        <span>{t.footerRight}</span>
      </div>
    </footer>
  );
}
