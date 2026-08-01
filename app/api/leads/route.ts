import { getDb } from "../../../db";
import { getBindings } from "../../../db/runtime";
import { leads } from "../../../db/schema";

const acceptedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const maxPhotoSize = 8 * 1024 * 1024;

function field(form: FormData, name: string, max = 1200) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function extension(type: string) {
  return ({ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/heic": "heic", "image/heif": "heif" } as Record<string, string>)[type] || "bin";
}

export async function POST(request: Request) {
  let uploadedKey: string | null = null;
  try {
    const form = await request.formData();
    if (field(form, "website", 200)) return Response.json({ ok: true }, { status: 201 });

    const phone = field(form, "phone", 24);
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) return Response.json({ error: "Проверьте номер телефона" }, { status: 400 });
    if (field(form, "consent", 10) !== "yes") return Response.json({ error: "Нужно согласие на обработку данных" }, { status: 400 });

    const photo = form.get("photo");
    let photoName: string | null = null;
    let photoType: string | null = null;
    if (photo instanceof File && photo.size > 0) {
      if (photo.size > maxPhotoSize) return Response.json({ error: "Фотография больше 8 МБ" }, { status: 413 });
      if (!acceptedPhotoTypes.has(photo.type)) return Response.json({ error: "Поддерживаются JPG, PNG, WebP и HEIC" }, { status: 415 });
      uploadedKey = `leads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension(photo.type)}`;
      await getBindings().BUCKET.put(uploadedKey, photo.stream(), { httpMetadata: { contentType: photo.type }, customMetadata: { originalName: photo.name.slice(0, 180) } });
      photoName = photo.name.slice(0, 180);
      photoType = photo.type;
    }

    const reference = `VM-${Date.now().toString(36).toUpperCase().slice(-6)}${crypto.randomUUID().slice(0, 2).toUpperCase()}`;
    const db = getDb();
    await db.insert(leads).values({
      reference,
      name: field(form, "name", 80),
      phone,
      material: field(form, "material", 80),
      weight: field(form, "weight", 80),
      address: field(form, "address", 180),
      comment: field(form, "comment"),
      source: field(form, "source", 120) || "site",
      utmSource: field(form, "utm_source", 180),
      utmMedium: field(form, "utm_medium", 180),
      utmCampaign: field(form, "utm_campaign", 180),
      utmContent: field(form, "utm_content", 180),
      utmTerm: field(form, "utm_term", 180),
      photoKey: uploadedKey,
      photoName,
      photoType,
    });
    return Response.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    if (uploadedKey) await getBindings().BUCKET.delete(uploadedKey).catch(() => undefined);
    const message = error instanceof Error ? error.message : "Не удалось принять заявку";
    if (message.includes("no such table") || message.includes("D1 binding") || message.includes("R2")) return Response.json({ error: "Форма временно недоступна. Позвоните по номеру в шапке сайта." }, { status: 503 });
    return Response.json({ error: "Не удалось отправить заявку. Позвоните нам напрямую." }, { status: 500 });
  }
}
