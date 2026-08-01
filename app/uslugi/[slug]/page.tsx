import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ImageBrief } from "../../components/ImageBrief";
import { LeadForm } from "../../components/LeadForm";
import { PageHero } from "../../components/PageHero";
import { services } from "../../data";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = services.find((entry) => entry.slug === slug); return item ? { title: item.title, description: item.lead, alternates: { canonical: `/uslugi/${slug}` } } : {}; }

export default async function ServicePage({ params }: Props) {
  const { slug } = await params; const item = services.find((entry) => entry.slug === slug); if (!item) notFound();
  return <><Header /><main><PageHero eyebrow="Услуга" title={item.title} accent="по делу" lead={item.lead} ctaHref="#request" ctaLabel="Обсудить задачу" />
    <section className="section shell split-content"><div><p className="eyebrow"><span /> Что входит</p><h2>Понятно<br /><em>до начала</em></h2></div><ul className="check-list">{item.bullets.map((text) => <li key={text}><span>+</span>{text}</li>)}</ul></section>
    <section className="section section--muted"><div className="shell"><div className="section-heading section-heading--row"><div><p className="eyebrow"><span /> Порядок</p><h2>Как это<br /><em>работает</em></h2></div></div><ol className="horizontal-steps">{item.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol></div></section>
    <section className="section shell image-section"><ImageBrief title={item.title} prompt={item.prompt} /></section>
    <section className="section section--ink" id="request"><div className="shell form-split"><div><p className="eyebrow eyebrow--light"><span /> Обсудить задачу</p><h2>Сначала фото.<br /><em>Потом техника.</em></h2><p>Чем точнее исходные данные, тем точнее предварительный расчёт и меньше лишних рейсов.</p></div><LeadForm source={`service:${item.slug}`} /></div></section>
  </main><Footer /></>;
}
