#!/usr/bin/env python3
import os
import csv
import json
import re
import base64
import time
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
  MODEL_IMAGE_TEXT: default gpt-4o-mini
  MODEL_IMAGE: default gpt-image-1
  OUT_DIR: default ./blog/articles
  BLOG_PERSONA_NAME: override persona name (default: Dr. Émile Hartmann)
"""

try:
    from openai import OpenAI
except Exception:
    OpenAI = None  # allow running without the package for now

# Optional pillow for post-processing images
try:
    from PIL import Image, ImageOps
except Exception:
    Image = None
    ImageOps = None


def slugify(value: str) -> str:
    value = re.sub(r"[^\w\-\s]", "", value.strip(), flags=re.UNICODE)
    value = re.sub(r"\s+", "-", value)
    return value.lower() or "article"


def tidy_html(html: str) -> str:
    html = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", html)
    html = re.sub(r"</p>\s*<p>", "</p>\n\n<p>", html)
    return html.strip()


# --- Art Direction for featured images: FranzIQ mascot ---
BRAIN_MASCOT_AD = (
    "Minimalist black & white, hand-drawn look. A small friendly brain-on-legs mascot (no face text), "
    "bold irregular lines, subtle roughness, contemporary folk/tribal graphic vibe. Avoid realism. "
    "No text, no letters, no numbers, no logos. Clean negative space, center composition, "
    "geometric scaffolding echoes (subtle). Works as blog hero at 1600x900."
)

CATEGORY_MOTIFS = {
    "culture-g": [
        "timeline of abstract nodes", "vintage notebook grid", "portrait silhouette minimal", "light scientific diagram"
    ],
    "tests-qi": [
        "raven-like 3x3 matrix tiles", "triangle square circle sequence", "isometric cube net", "stopwatch outline"
    ],
    "comparatifs": [
        "balanced scale", "split composition left vs right", "arrows in opposite directions", "checkmarks vs crosses"
    ],
    "methodes": [
        "blueprint diagram", "flowchart arrows", "compass and ruler silhouettes", "gear outline minimal"
    ],
}


def _infer_topic_tokens(title: str) -> List[str]:
    t = title.lower()
    tokens: List[str] = []
    if "flynn" in t:
        tokens += ["ascending steps", "upward arrow motif", "population silhouettes tiny"]
    if "raven" in t:
        tokens += ["3x3 matrix with one missing cell"]
    if "wais" in t:
        tokens += ["two-part brain halves comparison"]
    if "chronométré" in t or "chrono" in t or "temps" in t:
        tokens += ["stopwatch outline"]
    if "adaptatif" in t or "adaptive" in t:
        tokens += ["branching arrows"]
    if "en ligne" in t or "online" in t:
        tokens += ["browser window frame minimal"]
    if "accessibil" in t:
        tokens += ["high-contrast eye icon"]
    if "pct" in t or "%" in t or "percentile" in t:
        tokens += ["gaussian curve silhouette"]
    return tokens


def build_image_prompt(title: str, meta_description: str, category: str, client: OpenAI) -> str:
    if client is None:
        motif = CATEGORY_MOTIFS.get(category, CATEGORY_MOTIFS["tests-qi"])[:2]
        extra = ", ".join(_infer_topic_tokens(title)[:2])
        return (
            f"Black & white hand-drawn hero. Brain-on-legs mascot + {', '.join(motif)} {extra}. "
            f"No text. Minimal rough lines, folk graphic vibe. 1600x900 composition."
        )
    system = (
        "You design concise topic-aware prompts for black & white, hand-drawn hero illustrations. "
        "Style: minimal, rough lines, friendly, modern folk/tribal. Absolutely no text/letters/numbers."
    )
    motifs = ", ".join(CATEGORY_MOTIFS.get(category, CATEGORY_MOTIFS["tests-qi"]))
    heur = ", ".join(_infer_topic_tokens(title))
    user = (
        f"Topic: {title}\n"
        f"Category: {category}\n"
        f"Meta: {meta_description}\n\n"
        f"Art direction: {BRAIN_MASCOT_AD}\n"
        f"Category motifs to use tastefully: {motifs}.\n"
        f"Heuristic tokens from title: {heur}.\n"
        "Rules: black & white only; include the friendly brain-on-legs only if it serves the topic; if it distracts, omit it; "
        "compose with 1–2 symbolic objects strongly tied to the subject; no words, letters or digits anywhere; keep clean negative space; hero fits 1600x900.\n"
        "Return ONLY the final concise prompt text."
    )
    for attempt in range(4):
        try:
            resp = client.chat.completions.create(
                model=os.getenv("MODEL_IMAGE_TEXT", "gpt-4o-mini"),
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                timeout=60 + attempt * 30,
            )
            return (resp.choices[0].message.content or "").strip()
        except Exception:
            if attempt == 3:
                break
            time.sleep(2 ** attempt)
    motif = CATEGORY_MOTIFS.get(category, CATEGORY_MOTIFS["tests-qi"])[:2]
    extra = ", ".join(_infer_topic_tokens(title)[:2])
    return (
        f"Minimalist B&W hand-drawn hero related to {title}. {', '.join(motif)} {extra}. No text."
    )


def generate_featured_image(file_base: str, title: str, meta: str, category: str, out_dir: Path, client: OpenAI) -> str:
    """Generate a 1600x900 JPG; return filename or ''."""
    prompt = build_image_prompt(title, meta, category, client)
    for attempt in range(3):
        try:
            img = client.images.generate(
                model=os.getenv("MODEL_IMAGE", "gpt-image-1"),
                prompt=prompt,
                n=1,
                size="1536x1024",
            )
            first = img.data[0]
            b64_json = getattr(first, "b64_json", None) or (first.get("b64_json") if isinstance(first, dict) else None)
            target = out_dir / f"{file_base}.jpg"
            if b64_json:
                import base64 as _b
                raw = _b.b64decode(b64_json)
                target.write_bytes(raw)
            else:
                url = getattr(first, "url", None) or (first.get("url") if isinstance(first, dict) else None)
                if not url:
                    return ""
                import urllib.request as _u
                _u.urlretrieve(url, target)
            # post-process
            if Image is not None:
                try:
                    im = Image.open(target).convert("L")
                    im = ImageOps.autocontrast(im)
                    tw, th = 1600, 900
                    scale = tw / im.width
                    im = im.resize((tw, int(im.height * scale)))
                    if im.height >= th:
                        top = (im.height - th) // 2
                        im = im.crop((0, top, tw, top + th))
                    else:
                        pad = Image.new("L", (tw, th), 255)
                        pad.paste(im, (0, (th - im.height) // 2))
                        im = pad
                    im = im.convert("RGB")
                    im.save(target, quality=90)
                except Exception:
                    pass
            return target.name
        except Exception:
            if attempt == 2:
                return ""
            time.sleep(2 ** attempt)
    return ""


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
    last_err = None
    for attempt in range(4):
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                timeout=180 + attempt * 60,
            )
            return tidy_html(resp.choices[0].message.content or "")
        except Exception as err:
            last_err = err
            time.sleep(2 ** attempt)
    raise last_err


def gen_seo(client, model: str, article_html: str) -> Dict:
    if client is None:
        return {"title_seo": "Article FranzIQ", "h1": "Article", "meta_description": "", "slug": "article"}
    prompt = (
        "À partir de l'article HTML ci-dessous, fournis STRICTEMENT un JSON avec: title_seo (<=60), h1, meta_description (<=160), slug (minuscule, tirets), category (slug), featured_image (nom fichier conseillé). Pas de texte hors JSON.\n\nARTICLE:\n"
        + article_html[:12000]
    )
    for attempt in range(4):
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                timeout=90 + attempt * 30,
            )
            raw = (resp.choices[0].message.content or "").strip()
            raw = raw.split("```json")[-1].split("```", 1)[0].strip() if raw.startswith("```json") else raw
            data = json.loads(raw)
            return data if isinstance(data, dict) else {}
        except Exception:
            if attempt == 3:
                return {}
            time.sleep(2 ** attempt)


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
        # image generation (fix argument order: title, meta, category)
        img_name = generate_featured_image(slug, title, seo.get("meta_description") or title, category, out_dir, client) if client else ""
        index.append({
            "file": fname,
            "h1": seo.get("h1") or title,
            "title_seo": seo.get("title_seo") or title[:60],
            "meta_description": seo.get("meta_description") or "",
            "slug": slug,
            "category": category,
            "featured_image": img_name,
            "date": os.getenv("BLOG_DEFAULT_DATE", "aujourd'hui")
        })

    # write index
    (out_dir / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(index)} articles → {out_dir}")


if __name__ == "__main__":
    main()


