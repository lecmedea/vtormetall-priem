import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { JsonLd } from "../../components/JsonLd";
import { articles } from "../../data";
import { absoluteUrl, breadcrumbSchema } from "../../seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const article = articles.find((item) => item.slug === slug); return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article", title: article.title, description: article.excerpt, url: `/blog/${slug}`, publishedTime: "2026-08-01T00:00:00+03:00" } } : {}; }

export default async function ArticlePage({ params }: Props) { const { slug } = await params; const article = articles.find((item) => item.slug === slug); if (!article) notFound(); const path = `/blog/${slug}`; const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: "2026-08-01", dateModified: "2026-08-04", mainEntityOfPage: absoluteUrl(path), author: { "@type": "Organization", name: "ВторМеталл", url: absoluteUrl() }, publisher: { "@id": `${absoluteUrl()}#business` }, inLanguage: "ru-RU" }; return <><JsonLd data={[breadcrumbSchema([["Главная", "/"], ["Полезное", "/blog"], [article.title, path]]), articleSchema]} /><Header /><main><article className="article shell"><header><Link href="/blog">← Все материалы</Link><p>{article.date} · {article.read}</p><h1>{article.title}</h1><strong>{article.excerpt}</strong></header><div className="article__body">{article.sections.map(([title,text], index) => <section key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{text}</p></div></section>)}</div><aside><p>Не уверены в категории?</p><Link className="button button--accent" href="/otsenka">Показать металл <span>↗</span></Link></aside></article></main><Footer /></>; }
