import Link from "next/link";
import { nav, phones } from "../data";
import { LeadForm } from "./LeadForm";

export function Footer() {
  return (
    <>
      <section className="global-application" id="site-application" aria-labelledby="site-application-title">
        <div className="shell global-application__grid">
          <div className="global-application__copy">
            <p className="eyebrow"><span /> Заявка на приём</p>
            <h2 id="site-application-title">Оформите заявку.<br /><em>Ответим по делу.</em></h2>
            <p>Укажите металл, примерный вес и телефон. Можно приложить фото прямо со старого Android — форма лёгкая и не требует регистрации.</p>
            <div className="global-application__phones" aria-label="Оба телефона пункта">
              {phones.map((phone) => <a href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}<span>↗</span></a>)}
            </div>
          </div>
          <LeadForm source="global-application" variant="global" />
        </div>
      </section>
      <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <Link className="brand brand--footer" href="/">
            <span className="brand__mark">VM</span>
            <span className="brand__text"><strong>ВТОРМЕТАЛЛ</strong><small>приёмный пункт</small></span>
          </Link>
          <p>Приём чёрного и цветного металлолома в Москве. Предварительная оценка и условия услуг уточняются до сдачи.</p>
        </div>
        <div><h3>Разделы</h3>{nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>
        <div><h3>Связаться</h3>{phones.map((phone) => <a href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}</a>)}<Link href="/kontakty">Рябиновая ул., 53А, стр. 5</Link></div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© 2026 ВторМеталл</span>
        <Link href="/politika">Политика обработки данных</Link>
        <span>Цены на сайте не являются публичной офертой</span>
      </div>
      <div className="mobile-actions" aria-label="Быстрые действия">
        <Link href="/kontakty#phones">2 номера</Link>
        <Link href="/otsenka">Оценить лом</Link>
      </div>
      </footer>
    </>
  );
}
