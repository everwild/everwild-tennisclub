import { notFound } from "next/navigation";
import { LangEffects } from "@/components/LangEffects";
import { LANGS, isLang, type Lang } from "@/lib/lang";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: raw } = await params;
  if (!isLang(raw)) {
    notFound();
  }
  const lang = raw as Lang;
  return (
    <>
      <LangEffects lang={lang} />
      {children}
    </>
  );
}
