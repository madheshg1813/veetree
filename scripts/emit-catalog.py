#!/usr/bin/env python3
"""Writes typed product data files from the parsed sheet."""
import json, re
from pathlib import Path

D = json.loads(Path("scripts/.catalog-data.json").read_text())
OUT = Path("src/lib/catalog/products")
OUT.mkdir(parents=True, exist_ok=True)
for f in OUT.glob("*.ts"): f.unlink()

def camel(slug):
    parts = slug.split("-")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])

def j(v): return json.dumps(v, ensure_ascii=False)

def sentence(s):
    s = s.strip()
    if s and s[-1] not in ".!?": s += "."
    return s[0].upper() + s[1:] if s else s

index = []

for p in D["products"]:
    slug, name = p["slug"], p["name"]
    var, ings, steps = p["variants"], p["ings"], p["steps"]
    sizes = [v["size"] for v in var]
    priced = [v for v in var if v["price"] is not None]

    # ── badges: only facts the sheet states ──────────────────────────────
    badges = []
    if len(sizes) > 1: badges.append({"label": " / ".join(sizes)})
    else: badges.append({"label": sizes[0]})
    if ings: badges.append({"label": f"{len(ings)} ingredients" if len(ings) > 3 else "Botanical blend"})
    badges.append({"label": p["cat_label"]})

    # ── key ingredients: first few named in the sheet ────────────────────
    key = [{"name": i, "note": "Listed in the product's ingredient list."} for i in ings[:4]]

    how = [{"title": f"Step {n+1}", "detail": sentence(s)} for n, s in enumerate(steps[:6])]

    sections = [{
        "id": "description", "heading": "Product Description", "defaultOpen": True,
        "body": [p["desc"]] + ([sentence(x) for x in p["extra"]] if p["extra"] else []),
    }]
    if len(sizes) > 1:
        sections.append({"id": "sizes", "heading": "Sizes",
            "bullets": [f"{v['size']} — " + (f"₹{v['price']}" if v["price"] is not None else "price on request") for v in var]})
    sections.append({"id": "storage", "heading": "Storage & Care", "body": [
        "Keep the pack closed and store somewhere cool and dry, out of direct sunlight.",
        "Natural formulations vary a little in colour and scent between batches — that is the botanicals, not a fault."]})

    # ── FAQs, answered only from sheet data ──────────────────────────────
    faqs = [{"q": f"What is VeeTree {name}?", "a": p["desc"]}]
    if steps:
        faqs.append({"q": f"How do I use {name}?", "a": " ".join(sentence(s) for s in steps[:4])})
    if len(sizes) > 1:
        faqs.append({"q": "What sizes does it come in?",
                     "a": "It is available in " + " and ".join(sizes) + "."})
    else:
        faqs.append({"q": "What size is it?", "a": f"{sizes[0]}."})
    if ings:
        faqs.append({"q": "What is in it?",
                     "a": "The full ingredient list is published on this page and printed on the pack. Key ingredients include " + ", ".join(ings[:5]) + "."})
    faqs.append({"q": "Is a patch test needed?",
                 "a": "Patch test on a small area of skin before first use, as with any new topical product. If you are pregnant, breastfeeding, or treating a diagnosed skin condition, check with a doctor first."})

    images = []
    if p["img"]:
        fname, desc = p["img"]
        images.append({"src": f"/products/{fname}.jpg",
                       "alt": f"VeeTree {name} {desc}", "width": 1100, "height": 1100})

    price_txt = f"₹{priced[0]['price']}" if priced else ""
    seo_desc = (p["desc"][:150]).rstrip(" .") + "."

    body = f'''import type {{ Product }} from "../types"

/**
 * Source: VeeTree product sheet (founder-supplied).
 * Sheet name: {j(p["raw"])}
 */
export const {camel(slug)}: Product = {{
  slug: {j(slug)},
  name: {j(name)},
  brand: "VeeTree",
  category: {{ label: {j(p["cat_label"])}, href: {j(p["cat_href"])} }},'''
    if p["sub"]:
        body += f'\n  collection: {{ label: {j(p["sub"][0])}, href: {j(p["sub"][1])} }},'
    body += f'''

  variants: {j(var)},

  images: {j(images)},

  rating: null,

  badges: {j(badges)},

  shortDescription: {j(p["desc"])},

  sections: {j(sections)},

  keyIngredients: {j(key)},

  fullIngredients: {j(ings)},

  howToUse: {j(how)},

  faqs: {j(faqs)},

  related: [],

  seo: {{
    title: {j(f"VeeTree {name} | {p['cat_label']}")},
    description: {j(seo_desc)},
    canonical: {j(f"/products/{slug}")},
  }},

  inStock: {"true" if priced else "false"},
}}
'''
    (OUT / f"{slug}.ts").write_text(body, encoding="utf-8")
    index.append({"slug": slug, "camel": camel(slug), "cat": p["cat_label"], "sub": p["sub"][0] if p["sub"] else None, "price": price_txt})

Path("scripts/.catalog-index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1))
print(f"wrote {len(index)} product files")
