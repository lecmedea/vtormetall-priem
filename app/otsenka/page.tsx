import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { LeadForm } from "../components/LeadForm";
import { PageHero } from "../components/PageHero";
import { SmartFinder } from "../components/SmartFinder";

export const metadata: Metadata = { title: "Оценка металлолома по фото", description: "Опишите металл обычными словами, определите категорию и отправьте фотографию для предварительной оценки.", alternates: { canonical: "/otsenka" } };

export default function EstimatePage() {
  return <><Header /><main><PageHero eyebrow="Умная оценка" title="Не знаете металл?" accent="разберёмся" lead="Сначала лёгкий поиск по понятным словам. Если устройство позволяет, можно включить семантический AI-подбор Hugging Face — только по вашему нажатию." ctaHref="#request" ctaLabel="Сразу отправить фото" />
    <section className="section shell smart-section"><SmartFinder /><div className="smart-section__copy"><p className="eyebrow"><span /> Почему это удобно</p><h2>Термины<br /><em>не нужны</em></h2><p>Напишите «жёлтые краны», «старые провода» или «тяжёлая батарея». Сайт предложит вероятную категорию и подскажет, как подготовить лом.</p><ul><li>Мгновенный базовый подбор</li><li>AI не загружается без разрешения</li><li>Экономия трафика на слабых устройствах</li><li>Окончательное решение принимает специалист</li></ul></div></section>
    <section className="section section--ink" id="request"><div className="shell form-split"><div><p className="eyebrow eyebrow--light"><span /> Фото и телефон</p><h2>Покажите<br /><em>как есть.</em></h2><p>Не обрабатывайте фото и снимите общий объём. Можно добавить адрес для расчёта вывоза.</p></div><LeadForm source="smart-estimate" /></div></section>
  </main><Footer /></>;
}
