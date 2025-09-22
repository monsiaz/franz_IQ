#!/usr/bin/env python3
import os
import csv
import json
import re
import base64
from pathlib import Path
from typing import List, Dict

"""
Minimal blog generator for FranzIQ.
- Reads a CSV with columns: title, category
- Uses OpenAI via environment variable OPENAI_API_KEY (never commit .env)
- Writes HTML to blog/articles and updates blog/articles/index.json

Usage:
  OPENAI_API_KEY=... python3 scripts/generate_blog.py articles.csv

Environment (optional):
  MODEL_ARTICLE: default gpt-4o-mini
  MODEL_SEO: default gpt-4o-mini
  OUT_DIR: default ./blog/articles
"""

try:
    from openai import OpenAI
except Exception:
    OpenAI = None  # allow running without the package for now


def slugify(value: str) -> str:
    value = re.sub(r"[^\w\-\s]", "", value.strip(), flags=re.UNICODE)
    value = re.sub(r"\s+", "-", value)
    return value.lower() or "article"


def tidy_html(html: str) -> str:
    html = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", html)
    html = re.sub(r"</p>\s*<p>", "</p>\n\n<p>", html)
    return html.strip()


def gen_article_html(client, model: str, title: str, category: str) -> str:
    prompt = (
        "Tu es un rédacteur pour FranzIQ. Génère un article HTML FR (sans <html> ni <body>), 800-1200 mots, pédagogique, concret, sans placeholder. "
        "Structure: intro courte, 3-5 sections en <h2>, éventuellement <h3> utiles, une dernière section qui ouvre légèrement sans le mot 'Conclusion'. "
        "Mise en forme: <p> courts, <strong> pour points clés, pas de blockquote, pas de callout. Sujet: " + title + " (catégorie: " + category + ")."
    )
    if client is None:
        return f"<p><strong>{title}</strong></p><p>Brouillon en attente de génération.</p>"
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        timeout=120,
    )
    return tidy_html(resp.choices[0].message.content or "")


def gen_seo(client, model: str, article_html: str) -> Dict:
    if client is None:
        return {"title_seo": "Article FranzIQ", "h1": "Article", "meta_description": "", "slug": "article"}
    prompt = (
        "À partir de l'article HTML ci-dessous, fournis STRICTEMENT un JSON avec: title_seo (<=60), h1, meta_description (<=160), slug (minuscule, tirets), category (slug), featured_image (nom fichier conseillé). Pas de texte hors JSON.\n\nARTICLE:\n"
        + article_html[:12000]
    )
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        timeout=60,
    )
    raw = (resp.choices[0].message.content or "").strip()
    raw = raw.split("```json")[-1].split("```", 1)[0].strip() if raw.startswith("```json") else raw
    try:
        data = json.loads(raw)
    except Exception:
        data = {}
    return data


def main():
    import sys
    api_key = os.getenv("OPENAI_API_KEY")
    model_article = os.getenv("MODEL_ARTICLE", "gpt-4o-mini")
    model_seo = os.getenv("MODEL_SEO", "gpt-4o-mini")
    out_dir = Path(os.getenv("OUT_DIR", "./blog/articles")).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    client = OpenAI(api_key=api_key) if (OpenAI and api_key) else None

    if len(sys.argv) < 2:
        print("Usage: python3 scripts/generate_blog.py articles.csv")
        sys.exit(1)

    csv_path = Path(sys.argv[1]).resolve()
    rows: List[Dict[str, str]] = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = (row.get("title") or row.get("Titre") or "").strip()
            category = (row.get("category") or row.get("Catégorie") or "Divers").strip()
            if title:
                rows.append({"title": title, "category": category})

    index = []
    for i, r in enumerate(rows, 1):
        title = r["title"]
        category = r["category"].lower().replace(" ", "-")
        html = gen_article_html(client, model_article, title, category)
        seo = gen_seo(client, model_seo, html)
        slug = seo.get("slug") or slugify(title)
        fname = f"{i:03d}-{slug}.html"
        (out_dir / fname).write_text(html, encoding="utf-8")
        index.append({
            "file": fname,
            "h1": seo.get("h1") or title,
            "title_seo": seo.get("title_seo") or title[:60],
            "meta_description": seo.get("meta_description") or "",
            "slug": slug,
            "category": category,
            "featured_image": seo.get("image_filename") or "",
            "date": os.getenv("BLOG_DEFAULT_DATE", "aujourd'hui")
        })

    # write index
    (out_dir / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(index)} articles → {out_dir}")


if __name__ == "__main__":
    main()


