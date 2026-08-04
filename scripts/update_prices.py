#!/usr/bin/env python3
"""Refresh public calculator prices from the public lom-msk.ru price block."""

from __future__ import annotations

import datetime as dt
import html
import json
import re
import urllib.request
from pathlib import Path

SOURCE = "https://www.lom-msk.ru/"
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "data" / "prices.json"
MAPPING = {
    "Сталь": ("chernyy-lom", "Чёрный лом"),
    "Медь": ("med", "Медь"),
    "Алюминий": ("alyuminiy", "Алюминий"),
    "Свинец": ("svinec", "Свинец"),
    "Латунь": ("latun", "Латунь"),
    "Бронза": ("bronza", "Бронза"),
    "Нержавейка": ("nerzhaveyka", "Нержавейка"),
    "Кабель": ("kabel", "Кабель"),
    "Двигатели": ("elektrodvigateli", "Электродвигатели"),
    "Аккумуляторы": ("akkumulyatory", "Аккумуляторы"),
}


def main() -> None:
    request = urllib.request.Request(SOURCE, headers={"User-Agent": "VtormetallPriceMonitor/1.0 (+https://vtormetall-priem.ru/)"})
    with urllib.request.urlopen(request, timeout=30) as response:
        page = response.read().decode("utf-8", errors="replace")

    text = re.sub(r"<script\b[^>]*>.*?</script>", " ", page, flags=re.I | re.S)
    text = re.sub(r"<style\b[^>]*>.*?</style>", " ", text, flags=re.I | re.S)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    text = re.sub(r"\s+", " ", text)

    items = []
    for source_name, (slug, display_name) in MAPPING.items():
        match = re.search(rf"{re.escape(source_name)}\s*[|—-]?\s*(от|до)?\s*(\d+(?:[.,]\d+)?)\s*руб", text, re.I)
        if not match:
            raise RuntimeError(f"Price not found for {source_name}")
        qualifier = (match.group(1) or "").lower()
        price = float(match.group(2).replace(",", "."))
        items.append({"slug": slug, "name": display_name, "price": price, "qualifier": qualifier})

    date_match = re.search(r"Цена металла за 1 кг сегодня:\s*(\d{2}\.\d{2}\.\d{4})", text, re.I)
    source_date = dt.datetime.strptime(date_match.group(1), "%d.%m.%Y").date().isoformat() if date_match else None
    moscow = dt.timezone(dt.timedelta(hours=3))
    payload = {
        "source": SOURCE,
        "sourceDate": source_date,
        "updatedAt": dt.datetime.now(moscow).replace(microsecond=0).isoformat(),
        "currency": "RUB",
        "unit": "kg",
        "items": items,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {len(items)} calculator prices from {SOURCE}")


if __name__ == "__main__":
    main()
