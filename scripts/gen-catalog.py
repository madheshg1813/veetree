#!/usr/bin/env python3
"""
Generates src/lib/catalog/products/*.ts from the founder's product sheet.

The sheet is the source of truth for names, sizes, prices, ingredients,
usage and descriptions. Anything not in the sheet (badges, FAQs, SEO copy)
is derived only from what the sheet actually says — nothing is invented.
"""
import csv, json, re, os, sys
from pathlib import Path

CSV = "/Users/divakar/Documents/Client Websites/veetree-commerce/VEETREE products description  - Products.csv"
OUT = Path("src/lib/catalog/products")

# Display-name corrections. Where a product photograph exists, the printed
# label wins; otherwise these fix plain English typos in the sheet.
RENAME = {
    "Kumkumadi serum": "Kumkumadi Serum",
    "Aqua Rose Brightning Serum": "Aqua Rose Brightening Serum",
    "Aloevera gel": "Aloe Vera Gel",
    "Saffron gel": "Saffron Gel",
    "Multi floral gel": "Multi-Floral Gel",
    "Kumkumayadi night cream": "Kumkumadi Night Cream",
    "Rose hydrosol": "Rose Hydrosol",
    "Teatree Hydrosol": "Tea Tree Hydrosol",
    "Scalp & Hair rebirth serum": "Scalp & Hair Rebirth Serum",
    "Protein Hair pack": "Protein Hair Pack",
    "Seed Petal shampoo": "Seed-Petal Shampoo",
    "Anti Dandruff gel": "Anti-Dandruff Gel",
    "Nalparamadi lotion": "Nalpamaradi Lotion",
    "Ritual body oil": "Ritual Body Oil",
    "Nalparamadi lepam": "Nalpamaradi Lepam",
    "Paucholi shower gel": "Patchouli Shower Gel",
    "Body & face scrub": "Body & Face Scrub",
    "Rose & vannila body butter": "Rose & Vanilla Body Butter",
    "Tender coconut body butter": "Tender Coconut Body Butter",
    "Choco Body butter": "Choco Body Butter",
    "Sandalwood lipbalm": "Sandalwood Lip Balm",
    "Fruit & spice lipbalm": "Fruit & Spice Lip Balm",
    "Orange lip scrub": "Orange Lip Scrub",
    "Coffee lip scrub": "Coffee Lip Scrub",
    "under-eye serum": "Under-Eye Serum",
    "Earth eye cream": "Earth Eye Cream",
}

CATEGORY = {
    "FACE CARE": ("Face Care", "/collections/face-care"),
    "HAIR CARE": ("Hair Care", "/collections/hair-care"),
    "BODY CARE": ("Body Care", "/collections/body-care"),
    "LIP CARE":  ("Lip Care",  "/collections/lip-care"),
    "EYE CARE":  ("Eye Care",  "/collections/eye-care"),
}

# Type-level collections that own a broad category keyword.
SUBCOLLECTION = {
    "kumkumadi-serum": ("Face Serums", "/collections/face-serums"),
    "aqua-rose-brightening-serum": ("Face Serums", "/collections/face-serums"),
    "rose-hydrosol": ("Hydrosols", "/collections/hydrosols"),
    "tea-tree-hydrosol": ("Hydrosols", "/collections/hydrosols"),
    "rosemary-hydrosol": ("Hydrosols", "/collections/hydrosols"),
    "hair-growth-oil": ("Hair Oils", "/collections/hair-oils"),
    "scalp-hair-rebirth-serum": ("Hair Serums", "/collections/hair-serums"),
    "seed-petal-shampoo": ("Shampoos", "/collections/shampoos"),
    "rose-vanilla-body-butter": ("Body Butters", "/collections/body-butters"),
    "tender-coconut-body-butter": ("Body Butters", "/collections/body-butters"),
    "choco-body-butter": ("Body Butters", "/collections/body-butters"),
    "sandalwood-lip-balm": ("Lip Balms", "/collections/lip-balms"),
    "fruit-spice-lip-balm": ("Lip Balms", "/collections/lip-balms"),
    "orange-lip-scrub": ("Lip Scrubs", "/collections/lip-scrubs"),
    "coffee-lip-scrub": ("Lip Scrubs", "/collections/lip-scrubs"),
}

# Photography we already have, keyed by slug.
IMAGES = {
    "kumkumadi-serum": ("kumkumadi-serum", "in a glass dropper bottle with a gold cap, beside a brass lamp and saffron threads"),
    "multi-floral-gel": ("multi-floral-gel", "in a pump bottle beside a red hibiscus flower and blue butterfly pea blooms"),
    "aloe-vera-gel": ("aloe-vera-gel", "in a black jar on a stone plinth, beside fresh cut aloe leaves"),
    "rose-hydrosol": ("rose-hydrosol", "in an amber spray bottle on a stone slab, surrounded by fresh pink garden roses and petals"),
    "hair-growth-oil": ("hair-growth-oil", "in a bottle set in a brass plate with amla, hibiscus, curry leaves and black seeds"),
    "scalp-hair-rebirth-serum": ("scalp-hair-rebirth-serum", "in an amber pump bottle, photographed with pumpkin seeds, amla and rosemary sprigs"),
    "seed-petal-shampoo": ("seed-petal-shampoo", "in an amber bottle beside hibiscus flowers, rosemary sprigs and flaxseeds"),
    "rosemary-hydrosol": ("rosemary-hydrosol", "in an amber spray bottle beside fresh flowering rosemary sprigs"),
    "nalpamaradi-lepam": ("nalpamaradi-body-lebam", "in a metal tin, surrounded by amla, turmeric, lotus petals and herbal roots"),
    "patchouli-shower-gel": ("patchouli-shower-gel", "in an amber bottle on a stone slab with dried lavender buds and sprigs"),
    "mango-lip-oil": ("mango-lip-oil", "in an amber roll-on bottle on a wooden stand, beside a cut mango and a brass diffuser"),
}

def slugify(name):
    s = name.lower().replace("&", " ").replace("'", "")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return re.sub(r"-+", "-", s)

def norm_size(s):
    s = s.strip()
    m = re.match(r"^(\d+)\s*(ml|g|gm)$", s, re.I)
    if m:
        unit = "g" if m.group(2).lower() in ("g", "gm") else "ml"
        return f"{m.group(1)} {unit}"
    return s

def split_ingredients(raw):
    parts = [p.strip(" .\n\t") for p in re.split(r",|\n", raw)]
    out = []
    for p in parts:
        p = re.sub(r"\s+", " ", p).strip(" .")
        if p and len(p) > 1:
            out.append(p)
    return out

def split_steps(raw):
    lines = [l.strip() for l in raw.split("\n")]
    steps, extra = [], []
    for l in lines:
        if not l:
            continue
        m = re.match(r"^[-•*]\s*(.+)$|^\d+[.)]\s*(.+)$", l)
        if m:
            steps.append((m.group(1) or m.group(2)).strip())
        else:
            extra.append(l)
    if not steps:
        steps = [s.strip() for s in re.split(r"(?<=[.!])\s+", " ".join(extra)) if s.strip()]
        extra = []
    return steps, extra

def ts(v):
    return json.dumps(v, ensure_ascii=False)

def main():
    rows = list(csv.DictReader(open(CSV, encoding="utf-8-sig")))
    cat = ""
    items = []
    for r in rows:
        c = (r.get("Category") or "").strip()
        if c: cat = c
        raw_name = (r.get("PRODUCT") or "").strip()
        if not raw_name: continue
        items.append({
            "cat": cat, "raw": raw_name,
            "name": RENAME.get(raw_name, raw_name),
            "size": (r.get("Size") or "").strip(),
            "price": (r.get("PRICE ") or "").strip(),
            "ing": (r.get("Ingredients") or "").strip(),
            "use": (r.get("How to use") or "").strip(),
            "desc": (r.get("DESCRIPTION ") or "").strip(),
        })

    OUT.mkdir(parents=True, exist_ok=True)
    for f in OUT.glob("*.ts"):
        f.unlink()

    by_cat = {}
    generated = []
    notes = []

    for it in items:
        slug = slugify(it["name"])
        cat_label, cat_href = CATEGORY[it["cat"]]
        by_cat.setdefault(it["cat"], []).append(slug)

        sizes = [norm_size(s) for s in re.split(r"&|,", it["size"]) if s.strip()]
        prices = [int(re.sub(r"\D", "", p)) for p in it["price"].split("/") if re.sub(r"\D", "", p)]

        if len(prices) == len(sizes):
            pairs = list(zip(sizes, prices))
        elif len(prices) > len(sizes):
            pairs = [(sizes[0], prices[0])]
            notes.append(f"{it['name']}: {len(prices)} prices for {len(sizes)} size(s) — used ₹{prices[0]} for {sizes[0]}; CONFIRM")
        elif not prices:
            pairs = [(s, None) for s in sizes]
            notes.append(f"{it['name']}: no price in the sheet — shown as 'price on request'")
        else:
            pairs = [(sizes[i], prices[i] if i < len(prices) else None) for i in range(len(sizes))]

        base_sku = "VT-" + re.sub(r"[^A-Z0-9]+", "-", it["name"].upper()).strip("-")
        variants = [{
            "size": s,
            "sku": base_sku + ("-" + re.sub(r"\s+", "", s).upper() if len(pairs) > 1 else ""),
            "price": p,
        } for s, p in pairs]

        ings = split_ingredients(it["ing"])
        steps, extra = split_steps(it["use"])
        img = IMAGES.get(slug)

        generated.append({
            "slug": slug, "name": it["name"], "raw": it["raw"],
            "cat_label": cat_label, "cat_href": cat_href,
            "sub": SUBCOLLECTION.get(slug),
            "variants": variants, "ings": ings, "steps": steps, "extra": extra,
            "desc": re.sub(r"\s+", " ", it["desc"]).strip(),
            "img": img,
        })

    Path("scripts/.catalog-data.json").write_text(json.dumps({
        "products": generated, "byCat": by_cat, "notes": notes
    }, ensure_ascii=False, indent=1))

    print(f"parsed {len(generated)} products")
    print(f"categories: { {k: len(v) for k, v in by_cat.items()} }")
    print("\nnotes:")
    for n in notes: print("  •", n)

main()
