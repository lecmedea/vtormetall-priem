import fallback from "../../../public/data/prices.json";

const SOURCE = "https://www.lom-msk.ru/";
const mapping = [
  ["Сталь", "chernyy-lom", "Чёрный лом"],
  ["Медь", "med", "Медь"],
  ["Алюминий", "alyuminiy", "Алюминий"],
  ["Свинец", "svinec", "Свинец"],
  ["Латунь", "latun", "Латунь"],
  ["Бронза", "bronza", "Бронза"],
  ["Нержавейка", "nerzhaveyka", "Нержавейка"],
  ["Кабель", "kabel", "Кабель"],
  ["Двигатели", "elektrodvigateli", "Электродвигатели"],
  ["Аккумуляторы", "akkumulyatory", "Аккумуляторы"],
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET() {
  try {
    const response = await fetch(SOURCE, { headers: { "user-agent": "VtormetallPriceMonitor/1.0 (+https://vtormetall-priem.ru/)" }, next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    const html = await response.text();
    const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ");
    const items = mapping.map(([sourceName, slug, name]) => {
      const match = text.match(new RegExp(`${escapeRegExp(sourceName)}\\s*[|—-]?\\s*(от|до)?\\s*(\\d+(?:[.,]\\d+)?)\\s*руб`, "i"));
      if (!match) throw new Error(`Price not found: ${sourceName}`);
      return { slug, name, price: Number(match[2].replace(",", ".")), qualifier: (match[1] ?? "").toLowerCase() };
    });
    const dateMatch = text.match(/Цена металла за 1 кг сегодня:\s*(\d{2})\.(\d{2})\.(\d{4})/i);
    const sourceDate = dateMatch ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}` : new Date().toISOString().slice(0, 10);
    return Response.json({ source: SOURCE, sourceDate, updatedAt: new Date().toISOString(), currency: "RUB", unit: "kg", items }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return Response.json(fallback, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300", "X-Price-Data": "fallback" } });
  }
}
