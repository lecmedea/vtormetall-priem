import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LeadForm } from "../components/LeadForm";
import { MapEmbed } from "../components/MapEmbed";
import { PageHero } from "../components/PageHero";
import { location, phones } from "../data";

export const metadata: Metadata = { title: "Контакты и адрес пункта приёма", description: `${location.address}. Пункт приёма работает круглосуточно. Телефоны и маршрут в Яндекс Картах.`, alternates: { canonical: "/kontakty" } };

export default function ContactsPage() {
  return <><Header /><main><PageHero eyebrow="Контакты" title="Приезжайте" accent="на Рябиновую" lead="Точка в Яндекс Картах ведёт прямо к приёмному пункту. Перед поездкой с редкой категорией или крупной партией лучше позвонить." ctaHref={location.yandexUrl} ctaLabel="Построить маршрут" />
    <section className="section shell contact-facts"><div><span>АДРЕС</span><strong>{location.address}</strong></div><div><span>ГРАФИК</span><strong>{location.hours}</strong></div><div id="phones"><span>ТЕЛЕФОНЫ</span>{phones.map((phone) => <a href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}</a>)}</div></section>
    <section className="shell map-section"><MapEmbed /></section>
    <section className="section section--ink"><div className="shell form-split"><div><p className="eyebrow eyebrow--light"><span /> Перед поездкой</p><h2>Проверьте<br /><em>категорию.</em></h2><p>Так вы будете понимать порядок цены и не повезёте материал, который требует отдельного согласования.</p></div><LeadForm compact source="contacts" /></div></section>
  </main><Footer /></>;
}
