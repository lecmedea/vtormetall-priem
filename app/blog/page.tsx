import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { JsonLd } from "../components/JsonLd";
import { PageHero } from "../components/PageHero";
import { articles } from "../data";
import { absoluteUrl, breadcrumbSchema } from "../seo";

export const metadata: Metadata = { title: "Полезное о металлоломе", description: "Как подготовить металл, разобраться в цене, определить сплав и безопасно организовать сдачу металлолома.", alternates: { canonical: "/blog" } };

export default function BlogPage() { const listSchema = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: absoluteUrl(`/blog/${article.slug}`) })) }; return <><JsonLd data={[breadcrumbSchema([["Главная", "/"], ["Полезное", "/blog"]]), listSchema]} /><Header /><main><PageHero eyebrow="База знаний" title="Разобраться" accent="до поездки" lead="Практические инструкции: как сортировать лом, что влияет на цену и какие ошибки могут уменьшить итоговую сумму." />
  <section className="section shell article-grid">{articles.map((article, index) => <Link href={`/blog/${article.slug}`} key={article.slug}><span>{String(index + 1).padStart(2, "0")} · {article.read}</span><h2>{article.title}</h2><p>{article.excerpt}</p><b>Читать →</b></Link>)}</section>
  </main><Footer /></>; }
