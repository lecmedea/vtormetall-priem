import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "О пункте приёма ВторМеталл", description: "Как устроена приёмка металлолома на Рябиновой: предварительная оценка, сортировка, взвешивание и расчёт.", alternates: { canonical: "/o-kompanii" } };

export default function AboutPage() {
  return <><Header /><main><PageHero eyebrow="О пункте" title="Нормальная приёмка" accent="без театра" lead="Наша задача простая: быстро понять, что вы привезли, прозрачно объяснить оценку и не превращать сдачу металла в бюрократический марафон." />
    <section className="section shell split-content"><div><p className="eyebrow"><span /> Принципы</p><h2>Видно вес.<br /><em>Понятно цену.</em></h2></div><div className="statement"><p>Мы не обещаем одну цифру для любого металла: сорт, чистота, вес и состояние партии имеют значение.</p><p>Для крупного объёма сначала смотрим фотографии, габариты и подъезд. Это экономит время и клиенту, и бригаде.</p><p>Если категория спорная, её лучше проверить отдельно, чем потерять ценный металл внутри общего микса.</p></div></section>
    <section className="section shell team-section" aria-labelledby="team-title">
      <div className="section-heading section-heading--row"><div><p className="eyebrow"><span /> Люди ВторМеталла</p><h2 id="team-title">Наша<br /><em>команда</em></h2></div><p>Два места под реальные фотографии сотрудников. Сюда можно поставить портреты без изменения вёрстки.</p></div>
      <div className="team-grid">
        <article className="team-card"><div className="team-card__photo" role="img" aria-label="Место для фотографии Куфтова Ярослава"><span>ФОТО СОТРУДНИКА</span><small>Разместить портрет позже</small></div><h3>Куфтов Ярослав</h3><p>Генеральный директор</p></article>
        <article className="team-card"><div className="team-card__photo" role="img" aria-label="Место для фотографии Сергея Бежаева"><span>ФОТО СОТРУДНИКА</span><small>Разместить портрет позже</small></div><h3>Сергей Бежаев</h3><p>Топ-Менеджер</p></article>
      </div>
    </section>
    <section className="section section--acid"><div className="shell values-grid">{[["01","Не обещаем невозможное","Предварительная оценка остаётся предварительной до анализа и взвешивания."],["02","Не прячем условия","Вывоз, резка, засор и сортировка обсуждаются до разгрузки."],["03","Не усложняем","Телефон, фото и понятное описание — обычно этого достаточно, чтобы начать."]].map(([n,t,p]) => <article key={n}><span>{n}</span><h2>{t}</h2><p>{p}</p></article>)}</div></section>
  </main><Footer /></>;
}
