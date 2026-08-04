import Link from "next/link";
import { Footer } from "./components/Footer";
import { GrappleScroll } from "./components/GrappleScroll";
import { Header } from "./components/Header";
import { ImageBrief } from "./components/ImageBrief";
import { materialCards, phones } from "./data";
import { homePhotos } from "./media";

const serviceCards = [
  {
    number: "01",
    title: "Привезти самому",
    text: "Заезжаете на площадку, взвешиваем лом, согласовываем сумму и рассчитываемся после приёмки.",
    href: "/kontakty",
    label: "Построить маршрут",
    icon: "/assets/iconly-location.svg",
    iconNode: "33437:4981",
  },
  {
    number: "02",
    title: "Заказать вывоз",
    text: "Сообщите тип металла, примерный вес и адрес. Подберём транспорт и заранее обсудим условия.",
    href: "/uslugi/vyvoz",
    label: "Условия вывоза",
    icon: "/assets/iconly-calling.svg",
    iconNode: "33437:4674",
  },
  {
    number: "03",
    title: "Оценить по фото",
    text: "Сфотографируйте лом без фильтров и приложите ориентир по объёму. Предварительно сориентируем по цене.",
    href: "/otsenka",
    label: "Отправить заявку",
    icon: "/assets/iconly-camera.svg",
    iconNode: "33437:4567",
  },
];

const steps = [
  ["Покажите лом", "Фото, название металла или короткое описание — без специальных терминов."],
  ["Получите ориентир", "Объясним, от чего зависит цена и какой способ сдачи выгоднее."],
  ["Взвесьте при вас", "Итоговая сумма определяется после фактического взвешивания и оценки засора."],
  ["Заберите оплату", "Условия расчёта фиксируем до приёмки, без сюрпризов после разгрузки."],
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-main">
        <GrappleScroll />
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow"><span /> Приёмный пункт на Рябиновой</p>
            <h1 id="hero-title">Металл —<br /><em>в деньги.</em></h1>
            <p className="hero__lead">
              Принимаем чёрный и цветной лом в Москве. Можно привезти на площадку
              или заранее обсудить вывоз. Цена зависит от вида, чистоты и веса —
              говорим об этом прямо.
            </p>
            <div className="hero__actions">
              <a className="button button--accent" href="#site-application">
                Узнать цену <span>↗</span>
              </a>
              <a className="button button--dark" href="#quick-estimate">
                Рассчитать онлайн
              </a>
            </div>
            <div className="hero__facts" aria-label="Ключевая информация">
              <div><strong>24/7</strong><span>пункт работает<br />круглосуточно</span></div>
              <div><strong>2</strong><span>прямых номера<br />без колл-центра</span></div>
              <div><strong>1 мин</strong><span>чтобы оставить<br />заявку с телефона</span></div>
            </div>
          </div>

          <div className="hero__visual" aria-label="Приём металлолома на Рябиновой улице">
            <div className="hero__stamp">ЧЕСТНЫЙ ВЕС<br />БЫСТРЫЙ РАСЧЁТ</div>
            <div className="hero__plate">
              <span>МОСКВА</span>
              <strong>РЯБИНОВАЯ<br />53А, СТР. 5</strong>
              <Link href="/kontakty">Открыть карту →</Link>
            </div>
            <ImageBrief
              title="Главный кадр: приёмка металла"
              src={homePhotos.hero.src}
              alt={homePhotos.hero.alt}
              compact
              priority
            />
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>МЕДЬ • КАБЕЛЬ • ЛАТУНЬ • АЛЮМИНИЙ • ЧУГУН • СТАЛЬ • НЕРЖАВЕЙКА • АККУМУЛЯТОРЫ • </div>
        </div>

        <section className="calculator-promo shell" aria-labelledby="calculator-promo-title">
          <Link href="/ceny#calculator" className="calculator-promo__link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/calculator/calculator-banner.png" alt="Чёрный технологичный калькулятор стоимости металлолома" width="2048" height="683" loading="lazy" decoding="async" />
            <span className="calculator-promo__copy"><small>Вес × категория × состояние</small><strong id="calculator-promo-title">КАЛЬКУЛЯТОР<br />ЛОМА</strong><b>Рассчитать ориентир →</b></span>
          </Link>
        </section>

        <section className="section shell" aria-labelledby="route-title">
          <div className="section-heading">
            <p className="eyebrow"><span /> Как сдать лом</p>
            <h2 id="route-title">Выберите свой<br /><em>маршрут</em></h2>
            <p>Три понятных сценария. Без длинной анкеты и обязательной регистрации.</p>
          </div>
          <div className="service-grid">
            {serviceCards.map((card) => (
              <article className="service-card" key={card.number}>
                <div className="service-card__top">
                  <span className="service-card__number">{card.number}</span>
                  <span className="service-card__icon" data-figma-node-id={card.iconNode}>
                    {/* SVG remains a direct file request to keep these tiny UI icons fast on old Android devices. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.icon} alt="" width="24" height="24" aria-hidden="true" />
                  </span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <Link href={card.href}>{card.label} <span>↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--ink" id="quick-estimate" aria-labelledby="estimate-title">
          <div className="shell estimate-split">
            <div>
              <p className="eyebrow eyebrow--light"><span /> Быстрый ориентир</p>
              <h2 id="estimate-title">Что у вас<br /><em>за металл?</em></h2>
              <p className="estimate-split__lead">
                Не знаете марку сплава — нормально. Откройте умный подбор,
                опишите предмет своими словами или сразу оставьте номер.
              </p>
            </div>
            <div className="estimate-panel">
              <div className="estimate-panel__top">
                <span>УМНЫЙ ПОДБОР</span>
                <span className="status-dot">работает без регистрации</span>
              </div>
              <p className="estimate-panel__example">Например: «старые медные провода, примерно два мешка»</p>
              <Link className="button button--accent button--wide" href="/otsenka">
                Описать свой лом <span>↗</span>
              </Link>
              <small>Базовый подбор открывается мгновенно. AI-режим Hugging Face включается только по желанию и не тормозит загрузку сайта.</small>
            </div>
          </div>
        </section>

        <section className="section shell" aria-labelledby="materials-title">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow"><span /> Что принимаем</p>
              <h2 id="materials-title">Лом, который<br /><em>имеет цену</em></h2>
            </div>
            <Link className="text-link" href="/metally">Смотреть все категории →</Link>
          </div>
          <div className="materials-grid">
            {materialCards.slice(0, 8).map((material, index) => (
              <Link className="material-card" href={`/metally/${material.slug}`} key={material.slug}>
                <span className="material-card__index">0{index + 1}</span>
                <span className="material-card__mark">{material.mark}</span>
                <h3>{material.title}</h3>
                <p>{material.examples}</p>
                <span className="material-card__link">Подробнее ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section shell process" aria-labelledby="process-title">
          <div className="process__intro">
            <p className="eyebrow"><span /> По-человечески</p>
            <h2 id="process-title">Четыре шага.<br /><em>Никакого квеста.</em></h2>
          </div>
          <ol className="process__list">
            {steps.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section shell image-section" aria-labelledby="photo-title">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow"><span /> Прозрачная оценка</p>
              <h2 id="photo-title">Вес и категория<br /><em>перед глазами</em></h2>
            </div>
            <p>Сначала определяем категорию и засор, затем взвешиваем. Итоговые условия согласовываем до расчёта.</p>
          </div>
          <ImageBrief
            title="Честное взвешивание на площадке"
            src={homePhotos.weighing.src}
            alt={homePhotos.weighing.alt}
          />
        </section>

        <section className="section section--acid" aria-labelledby="final-title">
          <div className="shell final-cta">
            <p className="eyebrow"><span /> Можно прямо сейчас</p>
            <h2 id="final-title">Сколько стоит<br />ваш металл?</h2>
            <div className="final-cta__side">
              <p>Позвоните или оставьте короткую заявку. Скажем, что подготовить, и дадим предварительный ориентир.</p>
              <div className="phone-pair">
                {phones.map((phone) => <a className="button button--dark button--wide" href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}<span>↗</span></a>)}
              </div>
              <Link className="text-link text-link--dark" href="/kontakty">Рябиновая ул., 53А, стр. 5 →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
