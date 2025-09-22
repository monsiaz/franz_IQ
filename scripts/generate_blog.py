#!/usr/bin/env python3
import os
import csv
import json
import re
import base64
from pathlib import Path
from typing import List, Dict

"""
Minimal blog generator for FranzIQ, with a strong persona-driven editorial voice.
- Reads a CSV with columns: title, category
- Uses OpenAI via environment variable OPENAI_API_KEY (never commit .env)
- Writes HTML to blog/articles and updates blog/articles/index.json

Usage:
  OPENAI_API_KEY=... python3 scripts/generate_blog.py articles.csv

Environment (optional):
  MODEL_ARTICLE: default gpt-5-2025-08-07
  MODEL_SEO: default gpt-4o-mini
  OUT_DIR: default ./blog/articles
  BLOG_PERSONA_NAME: override persona name (default: Dr. Émile Hartmann)
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
    persona_name = os.getenv("BLOG_PERSONA_NAME", "Dr. Émile Hartmann")
    PERSONA = (
        f"Persona: {persona_name}, inventeur contemporain de tests de QI visuels et mobiles, psychométricien exigeant. "
        "Convictions: 1) clarté visuelle universelle (peu de texte, biais culturels minimisés), 2) rigueur psychométrique (validité, fidélité, IRT quand pertinent), "
        "3) accessibilité WCAG par design (contraste, rythme, alternatives), 4) transparence sur les limites (un test est une estimation), 5) éthique (anti clickbait, anti surpromesse). "
        "Axe éditorial: démystifier les tests de QI, expliquer les règles visuelles et les choix de scoring, relier UX moderne et mesure fiable."
    )

    CATEGORY_NORMS = (
        "Règles par catégorie: "
        "tests-qi → sections pratiques (stratégies, erreurs fréquentes, exemples pas à pas); "
        "comparatifs → critères clairs (validité, fidélité, UX, coût, durée) + AU PLUS UN tableau utile; "
        "culture-g → repères historiques, idées reçues vs faits; "
        "methodes → procédure concrète (étapes, inputs/outputs, risques)."
    )

    prompt = (
        PERSONA + "\n" + CATEGORY_NORMS + "\n" +
        "Tu écris en HTML FR (sans <html> ni <body>), aléatoirement entre 1500 et 2900 mots, ton précis, engagé et sourcé (sans références formelles). "
        "Évite tout placeholder. Structure OBLIGATOIRE: \n"
        "- Introduction (80–120 mots, sans <h2>).\n"
        "- 4 à 6 sections en <h2> très concrètes et spécifiques au sujet.\n"
        "- <h3> seulement si cela apporte une valeur pratique (exemples, repères).\n"
        "- Une dernière section en <h2> qui ouvre légèrement SANS le mot 'Conclusion'.\n"
        "Mise en forme: <p> courts avec une ligne vide entre eux; utilise <strong> pour les points clés; aucun blockquote ni encadré; pas de tiret cadratin. "
        "Option: AU PLUS UN <table> si la comparaison l'exige (catégorie comparatifs). "
        f"Sujet: {title}. Catégorie: {category}. Parle avec la voix du persona, assume ses convictions, et illustre avec des exemples visuels adaptés aux tests de QI modernes."
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
    model_article = os.getenv("MODEL_ARTICLE", "gpt-5-2025-08-07")
    model_seo = os.getenv("MODEL_SEO", "gpt-4o-mini")
    out_dir = Path(os.getenv("OUT_DIR", "./blog/articles")).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    client = OpenAI(api_key=api_key) if (OpenAI and api_key) else None

    if len(sys.argv) < 2:
        print("Usage: python3 scripts/generate_blog.py articles.csv")
        sys.exit(1)

    csv_path = Path(sys.argv[1]).resolve()
    rows: List[Dict[str, str]] = []
    # Robust delimiter detection (supports ; , \t |)
    with open(csv_path, "r", encoding="utf-8") as f:
        sample = f.read(4096)
        f.seek(0)
        try:
            dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
            delimiter = dialect.delimiter
        except Exception:
            delimiter = ";" if ";" in sample else ","
        reader = csv.DictReader(f, delimiter=delimiter)
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


