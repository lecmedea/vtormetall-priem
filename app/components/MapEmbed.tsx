import { location } from "../data";

export function MapEmbed() {
  return (
    <div className="map-block">
      <iframe
        title="ВторМеталл на Яндекс Картах"
        src={location.widgetUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="map-block__card">
        <span>ПУНКТ ПРИЁМА</span>
        <h2>Рябиновая ул.<br />53А, стр. 5</h2>
        <p>Круглосуточно • Москва</p>
        <a className="button button--accent" href={location.yandexUrl} target="_blank" rel="noreferrer">Маршрут в Яндекс Картах <span>↗</span></a>
      </div>
    </div>
  );
}
