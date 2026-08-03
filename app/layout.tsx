import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Приём металлолома в Москве — ВторМеталл", template: "%s | ВторМеталл" },
  description: "Приём чёрного и цветного металлолома в Москве на Рябиновой улице. Оценка по фото, вывоз и демонтаж по согласованию. Два прямых телефона.",
  applicationName: "ВторМеталл",
  keywords: ["приём металлолома Москва", "сдать металл", "цены на лом", "приём меди", "вывоз металлолома", "ломбард металлолома", "Рябиновая 53А"],
  alternates: { canonical: "/", languages: { "ru-RU": "/" } },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "ru_RU",
    title: "ВторМеталл — приём металлолома в Москве",
    description: "Честный вес, понятные условия, оценка и вывоз по согласованию.",
    siteName: "ВторМеталл",
  },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#151a16",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RecyclingCenter",
    name: "ВторМеталл",
    url: SITE_URL,
    telephone: ["+7 999 996 22 06", "+7 916 348 95 36"],
    address: { "@type": "PostalAddress", streetAddress: "Рябиновая улица, 53А, стр. 5", addressLocality: "Москва", addressCountry: "RU" },
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: ["Москва", "Московская область"],
    sameAs: ["https://yandex.ru/navi/org/vtormetall/121976909154"],
  };
  return (
    <html lang="ru">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        {children}
      </body>
    </html>
  );
}
