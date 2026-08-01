import Link from "next/link";
import { nav, phones } from "../data";

export function Header() {
  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-bar__inner">
          <span className="utility-bar__status"><i /> Пункт работает круглосуточно</span>
          <span className="utility-bar__address">Москва, Рябиновая ул., 53А, стр. 5</span>
          <span className="utility-bar__phones">
            {phones.map((phone) => <a href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}</a>)}
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell site-header__inner">
          <Link className="brand" href="/" aria-label="ВторМеталл — главная">
            <span className="brand__mark">VM</span>
            <span className="brand__text"><strong>ВТОРМЕТАЛЛ</strong><small>приёмный пункт</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Главное меню">
            {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <Link className="header-call" href="/kontakty#phones"><span>2 номера</span><b>↗</b></Link>
          <details className="mobile-menu">
            <summary aria-label="Открыть меню"><span /><span /><span /></summary>
            <div className="mobile-menu__panel">
              {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
              <div className="mobile-menu__phones">
                {phones.map((phone) => <a href={`tel:${phone.raw}`} key={phone.raw}>{phone.display}</a>)}
              </div>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
