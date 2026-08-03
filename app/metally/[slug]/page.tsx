import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ImageBrief } from "../../components/ImageBrief";
import { JsonLd } from "../../components/JsonLd";
import { LeadForm } from "../../components/LeadForm";
import { PageHero } from "../../components/PageHero";
import { materialCards } from "../../data";
import { materialPhotos } from "../../media";
import { breadcrumbSchema, serviceSchema } from "../../seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return materialCards.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = materialCards.find((entry) => entry.slug === slug);
  if (!item) return {};
  return { title: `Приём ${item.title.toLowerCase()} в Москве`, description: `${item.intro} Пункт приёма на Рябиновой улице, оценка по фото и условия вывоза.`, alternates: { canonical: `/metally/${item.slug}` } };
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params;
  const item = materialCards.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const path = `/metally/${item.slug}`;
  const photo = materialPhotos[item.slug];
  return <><JsonLd data={[breadcrumbSchema([["Главная", "/"], ["Металлы", "/metally"], [item.title, path]]), serviceSchema({ name: `Приём ${item.title.toLowerCase()} в Москве`, description: item.intro, path })]} /><Header /><main><PageHero eyebrow={`Приём · ${item.mark}`} title={`Сдать ${item.title.toLowerCase()}`} accent="выгодно" lead={item.intro} ctaHref="#request" ctaLabel="Узнать условия" index={`${item.mark} / METAL`} />
    <section className="section shell split-content">
      <div><p className="eyebrow"><span /> Принимаем</p><h2>Что относится<br /><em>к категории</em></h2></div>
      <ul className="check-list">{item.accepted.map((text) => <li key={text}><span>+</span>{text}</li>)}</ul>
    </section>
    <section className="section section--muted"><div className="shell split-content split-content--top"><div><p className="eyebrow"><span /> Подготовка</p><h2>Чтобы приёмка<br /><em>прошла быстрее</em></h2><p className="section-copy">Не тратьте часы на сложную разборку. Достаточно безопасно отделить очевидные примеси и показать материал до поездки.</p></div><ol className="number-list">{item.preparation.map((text, index) => <li key={text}><span>{String(index + 1).padStart(2, "0")}</span><p>{text}</p></li>)}</ol></div></section>
    <section className="section shell image-section"><ImageBrief title={`Реальный лом: ${item.title}`} src={photo.src} alt={photo.alt} /></section>
    <section className="section section--ink" id="request"><div className="shell form-split"><div><p className="eyebrow eyebrow--light"><span /> Предварительная оценка</p><h2>Покажите<br /><em>{item.title.toLowerCase()}</em></h2><p>Укажите вес, состояние и приложите фотографию. Точную сумму можно определить только после проверки и взвешивания.</p></div><LeadForm defaultMaterial={item.title} source={`material:${item.slug}`} /></div></section>
  </main><Footer /></>;
}
