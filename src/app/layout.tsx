import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/site-core.css";
import "@/styles/home.css";
import "@/styles/tennis-overrides.css";
import { BASE_PATH } from "@/lib/base-path";
import { DOCUMENT_TITLE } from "@/lib/metadata";
import { SITE_ORIGIN } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#fff8e7"
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: DOCUMENT_TITLE,
  description: "Courts, coaching, and community — EVERWILD Tennis Club.",
  icons: {
    icon: [
      {
        url: "/assets/images/logo/favicon.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    shortcut: ["/assets/images/logo/favicon.png"],
    apple: [
      {
        url: "/assets/images/logo/favicon.png",
        sizes: "512x512"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const earlyHtmlAttrsScript = `
    (function () {
      try {
        var base = ${JSON.stringify(BASE_PATH)};
        var p = (window.location && window.location.pathname) || "/";
        if (base && p.indexOf(base) === 0) {
          p = p.slice(base.length) || "/";
        }
        var m = p.match(/^\\/(ja|en|zh)(?:\\/|$)/i);
        var lang = m ? m[1].toLowerCase() : "zh";
        document.documentElement.lang =
          lang === "zh" ? "zh-CN" : lang === "ja" ? "ja-JP" : "en";
        var platform = (navigator.platform || "");
        var ua = (navigator.userAgent || "");
        var isApple = /Mac|iPhone|iPad|iPod/i.test(platform) || /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua);
        if (isApple) {
          document.documentElement.dataset.platform = "apple";
        } else {
          delete document.documentElement.dataset.platform;
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: earlyHtmlAttrsScript }} />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
