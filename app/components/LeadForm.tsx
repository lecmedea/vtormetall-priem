"use client";

import { FormEvent, useRef, useState } from "react";
import { materialCards } from "../data";

type Props = { compact?: boolean; defaultMaterial?: string; source?: string; variant?: "dark" | "global" };

export function LeadForm({ compact = false, defaultMaterial = "", source = "site", variant = "dark" }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setMessage("");

    try {
      const data = new FormData(event.currentTarget);
      data.set("source", source);
      const query = new URLSearchParams(window.location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
        const value = query.get(key);
        if (value) data.set(key, value);
      });
      const response = await fetch("/api/leads", { method: "POST", body: data });
      const result = await response.json() as { ok?: boolean; reference?: string; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Не удалось отправить заявку");
      setState("sent");
      setMessage(`Заявка принята${result.reference ? ` · ${result.reference}` : ""}. Мы свяжемся с вами по указанному номеру.`);
      formRef.current?.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку. Позвоните нам напрямую.");
    }
  }

  return (
    <form className={`lead-form${compact ? " lead-form--compact" : ""}${variant === "global" ? " lead-form--global" : ""}`} ref={formRef} onSubmit={submit}>
      <div className="lead-form__head">
        <span>ЗАЯВКА / 01</span>
        <strong>{compact ? "Быстрый расчёт" : "Расскажите, что хотите сдать"}</strong>
      </div>
      <div className="lead-form__grid">
        <label><span>Ваше имя</span><input name="name" autoComplete="name" maxLength={80} placeholder="Например: Иван" /></label>
        <label><span>Телефон *</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={24} placeholder="Например: +7 999 000-00-00" /></label>
        <label><span>Что сдаёте</span><select name="material" defaultValue={defaultMaterial}><option value="">Не знаю / смешанный лом</option>{materialCards.map((item) => <option value={item.title} key={item.slug}>{item.title}</option>)}</select></label>
        <label><span>Примерный вес</span><select name="weight" defaultValue=""><option value="">Не знаю</option><option>До 100 кг</option><option>100–500 кг</option><option>500 кг – 1 тонна</option><option>1–5 тонн</option><option>Больше 5 тонн</option></select></label>
        {!compact && <label className="lead-form__wide"><span>Адрес или район</span><input name="address" maxLength={180} placeholder="Например: Рябиновая улица, Москва — если нужен вывоз" /></label>}
        <label className="lead-form__wide"><span>Комментарий</span><textarea name="comment" maxLength={1200} rows={compact ? 3 : 4} placeholder="Опишите предметы, объём, доступ для машины или задайте вопрос" /></label>
        {!compact && <label className="lead-form__file lead-form__wide"><span>Фото — до 8 МБ</span><input name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" capture="environment" /><small>На телефоне можно сразу открыть камеру.</small></label>}
        <label className="lead-form__trap" aria-hidden="true"><span>Сайт</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="lead-form__consent"><input name="consent" type="checkbox" value="yes" required /><span>Согласен на обработку данных для ответа на заявку. <a href="/politika" target="_blank">Условия</a></span></label>
      <button className="button button--accent button--wide" type="submit" disabled={state === "sending"}>{state === "sending" ? "Отправляем…" : "Получить предварительную оценку"}<span>↗</span></button>
      {message && <p className={`lead-form__message lead-form__message--${state}`} role="status">{message}</p>}
    </form>
  );
}
