import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";
import { services } from "../data";

export const metadata: Metadata = { title: "Вывоз, демонтаж и оценка металлолома", description: "Услуги пункта приёма: вывоз, демонтаж и резка металлоконструкций, оценка по фото, подбор спецтехники.", alternates: { canonical: "/uslugi" } };

export default function ServicesPage() {
  return <><Header /><main><PageHero eyebrow="Услуги" title="Заберём лишнее" accent="оставим деньги" lead="От фотографии до вывоза: выбирайте нужную услугу, заранее согласовывайте объём работ и условия расчёта." />
    <section className="section shell"><div className="service-list">{services.map((service, index) => <Link href={`/uslugi/${service.slug}`} key={service.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{service.title}</h2><p>{service.short}</p></div><b>↗</b></Link>)}</div></section>
  </main><Footer /></>;
}
