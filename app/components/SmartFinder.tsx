"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { materialCards } from "../data";

type Material = (typeof materialCards)[number];
type FeatureExtractor = ((texts: string[], options: { pooling: "mean"; normalize: true }) => Promise<{ dims: number[]; data: Float32Array }>) & { dispose?: () => Promise<void> };

function normalize(text: string) {
  return text.toLowerCase().replace(/ё/g, "е").replace(/[^а-яa-z0-9\s-]/g, " ");
}

function localMatch(query: string): Material | null {
  const text = normalize(query);
  if (!text.trim()) return null;
  let best: { item: Material; score: number } | null = null;
  materialCards.forEach((item) => {
    const terms = [item.title, item.examples, ...item.synonyms].map(normalize);
    const score = terms.reduce((sum, term) => sum + (text.includes(term) || term.includes(text) ? Math.max(2, term.split(" ").length) : term.split(" ").filter((part) => part.length > 3 && text.includes(part)).length), 0);
    if (!best || score > best.score) best = { item, score };
  });
  return best && best.score > 0 ? best.item : null;
}

export function SmartFinder() {
  const [query, setQuery] = useState("");
  const [aiState, setAiState] = useState<"idle" | "loading" | "ready" | "blocked" | "error">("idle");
  const [aiResult, setAiResult] = useState<Material | null>(null);
  const extractorRef = useRef<FeatureExtractor | null>(null);
  const localResult = useMemo(() => localMatch(query), [query]);
  const result = aiResult || localResult;

  async function runAi() {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
    if ((nav.deviceMemory && nav.deviceMemory < 4) || nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType || "")) {
      setAiState("blocked");
      return;
    }
    if (!query.trim()) return;
    setAiState("loading");
    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.useBrowserCache = true;
      if (!extractorRef.current) {
        extractorRef.current = await pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2", { dtype: "q8" }) as unknown as FeatureExtractor;
      }
      const texts = [query, ...materialCards.map((item) => `${item.title}. ${item.examples}. ${item.synonyms.join(" ")}`)];
      const tensor = await extractorRef.current(texts, { pooling: "mean", normalize: true });
      const dims = tensor.dims;
      const width = dims[dims.length - 1];
      const values = Array.from(tensor.data as Float32Array);
      let bestIndex = 0;
      let bestScore = -Infinity;
      for (let row = 1; row < texts.length; row += 1) {
        let score = 0;
        for (let col = 0; col < width; col += 1) score += values[col] * values[row * width + col];
        if (score > bestScore) { bestScore = score; bestIndex = row - 1; }
      }
      setAiResult(materialCards[bestIndex] || null);
      setAiState("ready");
    } catch {
      setAiState("error");
    }
  }

  return (
    <div className="smart-finder">
      <div className="smart-finder__label"><span>SMART MATERIAL FINDER</span><span>HUGGING FACE · OPTIONAL</span></div>
      <label><span>Опишите лом обычными словами</span><textarea value={query} onChange={(event) => { setQuery(event.target.value); setAiResult(null); setAiState("idle"); }} rows={4} placeholder="Например: тяжёлые жёлтые краны и фитинги после ремонта" /></label>
      {result ? (
        <div className="smart-finder__result"><span>{result.mark}</span><div><small>Похоже на</small><strong>{result.title}</strong><p>{result.intro}</p><Link href={`/metally/${result.slug}`}>Как подготовить →</Link></div></div>
      ) : query ? <p className="smart-finder__hint">Категория не очевидна. Оставьте фото — приёмщик поможет определить металл.</p> : null}
      <div className="smart-finder__actions">
        <button className="button button--dark" type="button" onClick={runAi} disabled={aiState === "loading"}>{aiState === "loading" ? "Загрузка модели…" : "Уточнить через AI"}</button>
        <small>{aiState === "blocked" ? "На этом устройстве оставили лёгкий режим, чтобы не тратить трафик." : aiState === "error" ? "AI сейчас недоступен — быстрый подбор продолжает работать." : "AI-модель загружается только после нажатия и сохраняется в кэше браузера."}</small>
      </div>
    </div>
  );
}
