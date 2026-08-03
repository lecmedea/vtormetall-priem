import type { MetadataRoute } from "next";
import { articles, materialCards, services } from "./data";
import { SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/ceny", "/metally", "/uslugi", "/o-kompanii", "/faq", "/blog", "/kontakty", "/otsenka", "/dokumenty", ...materialCards.map((x) => `/metally/${x.slug}`), ...services.map((x) => `/uslugi/${x.slug}`), ...articles.map((x) => `/blog/${x.slug}`)];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-08-04"),
    changeFrequency: path === "/ceny" ? "daily" : path.startsWith("/blog") ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["/ceny", "/metally", "/uslugi", "/kontakty"].includes(path) ? .9 : .7,
  }));
}
