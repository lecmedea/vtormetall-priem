"use client";

import { useEffect, useMemo, useState } from "react";
import priceData from "../../public/data/prices.json";

type PriceData = typeof priceData;

const materialImages: Record<string, string> = {
  "chernyy-lom": "/assets/seo-photos/ferrous-motors-batteries.jpg",
  med: "/assets/seo-photos/copper-brass-cable.jpg",
  alyuminiy: "/assets/seo-photos/aluminum-stainless.jpg",
  svinec: "/assets/seo-photos/aluminum-stainless.jpg",
  latun: "/assets/seo-photos/copper-brass-cable.jpg",
  bronza: "/assets/seo-photos/copper-brass-cable.jpg",
  nerzhaveyka: "/assets/seo-photos/aluminum-stainless.jpg",
  kabel: "/assets/seo-photos/copper-brass-cable.jpg",
  elektrodvigateli: "/assets/seo-photos/ferrous-motors-batteries.jpg",
  akkumulyatory: "/assets/seo-photos/ferrous-motors-batteries.jpg",
};

const qualities = [
  { value: "clean", label: "Чистый, отсортированный", factor: 1 },
  { value: "mixed", label: "Смешанный лом", factor: 0.9 },
  { value: "assembled", label: "Изделие в сборе", factor: 0.82 },
] as const;

const rubles = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const kilograms = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

export function PriceCalculator() {
  const [prices, setPrices] = useState<PriceData>(priceData);
  const [slug, setSlug] = useState(priceData.items[0].slug);
  const [weight, setWeight] = useState(250);
  const [quality, setQuality] = useState("clean");
  const [contamination, setContamination] = useState(5);
  const [delivery, setDelivery] = useState("self");
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/prices", { signal: controller.signal }).then((response) => response.ok ? response.json() : Promise.reject()).then((payload: PriceData) => setPrices(payload)).catch(() => undefined);
    return () => controller.abort();
  }, []);

  const item = prices.items.find((entry) => entry.slug === slug) ?? prices.items[0];
  const qualityItem = qualities.find((entry) => entry.value === quality) ?? qualities[0];
  const result = useMemo(() => Math.max(0, item.price * weight * qualityItem.factor * (1 - contamination / 100)), [item.price, weight, qualityItem.factor, contamination]);
  const netWeight = Math.max(0, weight * (1 - contamination / 100));

  function recalculate(change: () => void) {
    change();
    setRevision((value) => value + 1);
  }

  return (
    <section className="scrap-calculator" aria-labelledby="calculator-title">
      <div className="scrap-calculator__controls">
        <div className="scrap-calculator__heading">
          <p className="eyebrow eyebrow--light"><span /> Предварительный расчёт</p>
          <h2 id="calculator-title">Настройте<br /><em>свой лом</em></h2>
          <p>Выберите категорию, состояние и укажите вес. Итог на площадке определяется после осмотра и контрольного взвешивания.</p>
        </div>
        <div className="calculator-fields">
          <label><span>Категория металла</span><select value={slug} onChange={(event) => recalculate(() => setSlug(event.target.value))}>{prices.items.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name} — {entry.qualifier ? `${entry.qualifier} ` : ""}{entry.price} ₽/кг</option>)}</select></label>
          <label><span>Состояние</span><select value={quality} onChange={(event) => recalculate(() => setQuality(event.target.value))}>{qualities.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}</select></label>
          <label className="calculator-fields__weight"><span>Заявленный вес</span><div><input type="range" min="1" max="5000" step="1" value={weight} onChange={(event) => recalculate(() => setWeight(Number(event.target.value)))} aria-label="Вес в килограммах" /><input type="number" min="1" max="100000" step="1" value={weight} onChange={(event) => recalculate(() => setWeight(Math.max(1, Number(event.target.value) || 1)))} /><b>кг</b></div></label>
          <label><span>Предполагаемый засор</span><select value={contamination} onChange={(event) => recalculate(() => setContamination(Number(event.target.value)))}>{[0, 3, 5, 7, 10, 15, 20].map((value) => <option key={value} value={value}>{value}%</option>)}</select></label>
          <fieldset><legend>Доставка</legend><label><input type="radio" name="delivery" value="self" checked={delivery === "self"} onChange={(event) => setDelivery(event.target.value)} /> Привезу сам</label><label><input type="radio" name="delivery" value="pickup" checked={delivery === "pickup"} onChange={(event) => setDelivery(event.target.value)} /> Нужен вывоз</label></fieldset>
        </div>
      </div>

      <div className="calculator-machine" aria-label={`Предварительный расчёт: ${kilograms.format(netWeight)} кг, ${rubles.format(result)}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="calculator-machine__background" src="/assets/calculator/weighing-station.png" alt="Высокотехнологичные весы и касса для расчёта металлолома" width="1672" height="940" />
        <div className="calculator-machine__scrap" key={`${slug}-${revision}`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={materialImages[slug]} alt="" width="220" height="140" />
        </div>
        <output className="calculator-machine__weight" aria-label="Расчётный чистый вес"><strong>{kilograms.format(netWeight)}</strong><span>кг</span></output>
        <output className="calculator-machine__cash" aria-live="polite"><small>ОРИЕНТИР</small><strong>{rubles.format(result)}</strong></output>
      </div>

      <div className="calculator-summary">
        <div><span>Базовая цена источника</span><strong>{item.qualifier ? `${item.qualifier} ` : ""}{item.price.toLocaleString("ru-RU")} ₽/кг</strong></div>
        <div><span>Вес после учёта засора</span><strong>{kilograms.format(netWeight)} кг</strong></div>
        <div><span>Состояние материала</span><strong>{qualityItem.label}</strong></div>
        <div><span>Способ сдачи</span><strong>{delivery === "self" ? "Самостоятельно" : "Нужен вывоз"}</strong></div>
      </div>
      <p className="calculator-disclaimer">Расчёт ориентировочный и не является публичной офертой. Стоимость вывоза и погрузки здесь не вычитается — её согласуем отдельно после фото и адреса.</p>
      <div className="calculator-source">Источник ориентира: <a href={prices.source} target="_blank" rel="noreferrer">lom-msk.ru</a> · данные источника от {new Date(`${prices.sourceDate}T12:00:00+03:00`).toLocaleDateString("ru-RU")}</div>
    </section>
  );
}
