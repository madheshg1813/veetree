# VeeTree — Landing Page

Single-page site for **veetree.life**. No cart, no checkout — every "Buy" button opens
WhatsApp with a pre-filled message naming that exact product.

## Preview locally

Just double-click `index.html` — it opens in any browser and works as-is.

For a proper local server (recommended, avoids browser file:// quirks):

```bash
cd "/Users/divakar/Documents/Client Websites/VeeTree Life" && python3 -m http.server 4321 --directory .
```

Then open http://localhost:4321

## Publishing

It's a plain static site. Drag the whole folder onto **Netlify Drop**, **Cloudflare Pages**,
or **Vercel** — no build step. Point `veetree.life` at it and you're live.

## Editing things

| What | Where |
|---|---|
| **WhatsApp number** | `assets/js/main.js`, line 10 — `WHATSAPP_NUMBER` (country code, no `+`, no spaces) |
| **Pre-filled chat text** | `assets/js/main.js` — `GENERAL_MESSAGE` and `productMessage()` |
| **Colours / gradients** | `assets/css/styles.css`, the `:root` block at the top |
| **Product name, size, blurb** | `index.html` — each `<article class="card">` |
| **Product photo** | replace the file in `assets/img/products/`, keep the same filename |
| **Instagram link** | search `veetree.life` in `index.html` (3 places) |

### Adding a product

Copy any `<article class="card">` block in `index.html` and change:

- `data-cat="skin|hair|body|lips"` — which filter chip it appears under
- `style="--c1:#…;--c2:#…"` — the two accent colours pulled from that product's photo
  (they drive the hover border, the image tint and the ingredient tags)
- `data-wa="Product Name (size)"` — becomes the WhatsApp message
- the `<img src>` and alt text

Then bump the count in the matching filter chip near `<div class="filters">`.

## Copy to confirm before going live

These lines are written as placeholders and should be checked against what VeeTree can
actually stand behind:

- The ticker claims: *100% Natural · No Parabens · No Sulphates · Cruelty Free*
- The four "Promise" cards (`#ritual`) — sourcing, batch size, freshness
- The "Our Roots" brand story paragraphs (`#story`)
- Product sizes were read off the label photos — worth a second look

## Structure

```
index.html                  the whole page
assets/css/styles.css       all styling
assets/js/main.js           WhatsApp links, filters, menu, scroll reveal
assets/img/products/        11 optimised product photos (~1.5 MB total)
assets/img/hero-backdrop.jpg  soft blurred wash behind the hero
assets/img/favicon.svg      tab icon
Product Images/             your originals, untouched
```
