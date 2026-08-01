import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";
import { materialCards } from "../data";

export const metadata: Metadata = {
  title: "Какие металлы принимаем",
  description: "Медь, кабель, латунь, алюминий, нержавейка, аккумуляторы, чёрный лом и другие категории. Подготовка и предварительная оценка.",
  alternates: { canonical: "/metally" },
};

export default function MaterialsPage() {
  return <><Header /><main><PageHero eyebrow="Каталог металлов" title="Что можно" accent="сдать" lead="Откройте нужную категорию: покажем примеры, подготовку и факторы, которые влияют на итоговую цену." ctaLabel="Определить металл" />
    <section className="section shell">
      <div className="materials-grid materials-grid--catalog">
        {materialCards.map((item, index) => <Link className="material-card" href={`/metally/${item.slug}`} key={item.slug}><span className="material-card__index">{String(index + 1).padStart(2, "0")}</span><span className="material-card__mark">{item.mark}</span><h2>{item.title}</h2><p>{item.examples}</p><span className="material-card__link">Условия приёма ↗</span></Link>)}
      </div>
    </section>
    <section className="section section--ink"><div className="shell content-callout"><div><p className="eyebrow eyebrow--light"><span /> Не нашли свой металл?</p><h2>Не выбрасывайте.<br /><em>Сначала спросите.</em></h2></div><div><p>Опишите предмет или приложите фотографию. Если мы не принимаем эту категорию, честно скажем и не заставим ехать зря.</p><Link className="button button--accent" href="/otsenka">Показать лом <span>↗</span></Link></div></div></section>
  </main><Footer /></>;
}
