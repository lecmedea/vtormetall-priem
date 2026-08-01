import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vtormetall-priem.lecmedea.chatgpt.site"),
  title: { default: "Приём металлолома в Москве — ВторМеталл", template: "%s | ВторМеталл" },
  description: "Приём чёрного и цветного металлолома в Москве на Рябиновой улице. Оценка по фото, вывоз и демонтаж по согласованию. Два прямых телефона.",
  applicationName: "ВторМеталл",
  keywords: ["приём металлолома Москва", "сдать металл", "цены на лом", "приём меди", "вывоз металлолома", "ломбард металлолома", "Рябиновая 53А"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
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
    url: "https://vtormetall-priem.lecmedea.chatgpt.site",
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
