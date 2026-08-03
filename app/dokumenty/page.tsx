import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "Документы для сдачи металлолома", description: "Реквизиты, закрывающие документы и документы на вывоз металлолома для физических и юридических лиц.", alternates: { canonical: "/dokumenty" } };
export default function DocumentsPage() { return <><Header /><main><PageHero eyebrow="Документы" title="Проверить" accent="до сделки" lead="Для юридических лиц и крупных партий заранее уточним комплект документов под конкретную операцию." ctaHref="#site-application" ctaLabel="Запросить документы" /><section className="section shell"><div className="document-grid">{[["01","Документы на деятельность","Копии и актуальность подтверждаются по запросу перед заключением сделки."],["02","Реквизиты","Предоставляются ответственным специалистом для подготовки договора и безналичного расчёта."],["03","Закрывающие документы","Состав зависит от типа клиента, услуги и способа расчёта."],["04","Документы на вывоз","Согласовываются вместе с адресом, объёмом и условиями погрузки."]].map(([n,t,p]) => <article key={n}><span>{n}</span><h2>{t}</h2><p>{p}</p></article>)}</div></section></main><Footer /></>; }
