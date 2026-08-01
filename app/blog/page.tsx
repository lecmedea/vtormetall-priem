import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";
import { articles } from "../data";

export const metadata: Metadata = { title: "Полезное о металлоломе", description: "Как подготовить металл, разобраться в цене, определить сплав и безопасно организовать сдачу металлолома.", alternates: { canonical: "/blog" } };

export default function BlogPage() { return <><Header /><main><PageHero eyebrow="База знаний" title="Разобраться" accent="до поездки" lead="Практические инструкции без SEO-каши: как сортировать лом, что влияет на цену и какие ошибки стоят денег." />
  <section className="section shell article-grid">{articles.map((article, index) => <Link href={`/blog/${article.slug}`} key={article.slug}><span>{String(index + 1).padStart(2, "0")} · {article.read}</span><h2>{article.title}</h2><p>{article.excerpt}</p><b>Читать →</b></Link>)}</section>
  </main><Footer /></>; }
