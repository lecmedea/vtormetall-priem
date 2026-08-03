export const homePhotos = {
  hero: {
    src: "/assets/seo-photos/hero-yard.jpg",
    alt: "Чёрный ломовоз с манипулятором и погрузчик на пункте приёма металлолома в Москве",
  },
  weighing: {
    src: "/assets/seo-photos/certified-weighing.jpg",
    alt: "Взвешивание чёрного ломовоза на промышленных автомобильных весах пункта приёма",
  },
} as const;

const copper = "/assets/seo-photos/copper-brass-cable.jpg";
const lightMetals = "/assets/seo-photos/aluminum-stainless.jpg";
const heavyMetals = "/assets/seo-photos/ferrous-motors-batteries.jpg";

export const materialPhotos: Record<string, { src: string; alt: string }> = {
  med: { src: copper, alt: "Отсортированные медный кабель, медь и латунный лом на пункте приёма" },
  kabel: { src: copper, alt: "Медный кабель и цветной металлолом, подготовленные к оценке" },
  latun: { src: copper, alt: "Латунные детали и медный лом, разложенные по категориям" },
  bronza: { src: copper, alt: "Бронзовые и латунные детали на сортировочном столе пункта приёма" },
  alyuminiy: { src: lightMetals, alt: "Алюминиевый профиль и листовой алюминий в сортировочных контейнерах" },
  nerzhaveyka: { src: lightMetals, alt: "Нержавеющая сталь и алюминий, разделённые перед взвешиванием" },
  svinec: { src: lightMetals, alt: "Цветные металлы, безопасно рассортированные для приёмки" },
  cink: { src: lightMetals, alt: "Цинк, алюминий и листовой металл в отдельных контейнерах" },
  radiatory: { src: lightMetals, alt: "Алюминиевые радиаторы и профиль на площадке приёма металлолома" },
  "chernyy-lom": { src: heavyMetals, alt: "Чёрный лом, чугунные детали и электродвигатели на приёмной площадке" },
  elektrodvigateli: { src: heavyMetals, alt: "Электродвигатели, подготовленные к сдаче и взвешиванию" },
  akkumulyatory: { src: heavyMetals, alt: "Целые аккумуляторы на защитном поддоне пункта приёма" },
};

const fleet = "/assets/seo-photos/scrap-pickup-fleet.jpg";
const cutting = "/assets/seo-photos/dismantling-cutting.jpg";

export const servicePhotos: Record<string, { src: string; alt: string }> = {
  vyvoz: { src: fleet, alt: "Чёрный ломовоз с манипулятором для вывоза металлолома по Москве" },
  "arenda-spectehniki": { src: fleet, alt: "Ломовоз, перегружатель и грузовой фургон для погрузки металлолома" },
  demontazh: { src: cutting, alt: "Безопасный демонтаж металлоконструкции с погрузкой чёрной спецтехникой" },
  rezka: { src: cutting, alt: "Профессиональная газовая резка стальной балки в защитной экипировке" },
  "ocenka-po-foto": { src: "/assets/seo-photos/photo-assessment.jpg", alt: "Фотографирование медного кабеля, латуни и алюминия для предварительной оценки" },
};
