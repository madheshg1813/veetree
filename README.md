# VeeTree

Landing page for **veetree.life** — Ayurvedic skin and hair care, sold through WhatsApp.
No cart, no checkout: every "Buy" button opens a chat with the product already named.

Built with **Next.js 16** (App Router) and **TypeScript**.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | ⚠️ Not usable — see note below |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

> **`npm start` doesn't work here.** `next.config.ts` sets `output: "standalone"`
> for a small Docker image, and `next start` is incompatible with it. To run a
> production build locally:
>
> ```bash
> npm run build && cp -R public .next/standalone/ && cp -R .next/static .next/standalone/.next/ && node .next/standalone/server.js
> ```

## Layout

```
src/
  app/
    layout.tsx        metadata, fonts, <html> shell
    page.tsx          composes the sections
    globals.css       the entire design system
  components/
    SiteHeader.tsx    sticky header + mobile menu      (client)
    Hero.tsx          headline, CTAs, product collage
    TrustStrip.tsx    four brand pillars
    Story.tsx         "Our Roots"
    Collection.tsx    filterable product grid           (client)
    ProductCard.tsx   one card
    Ritual.tsx        "The VeeTree Promise"
    CtaBand.tsx       closing call to action
    SiteFooter.tsx    footer
    WhatsAppFab.tsx   floating button                   (client)
    Reveal.tsx        scroll-in animation wrapper       (client)
    icons.tsx         inline SVGs
  lib/
    site.ts           brand config — phone, Instagram, copy
    products.ts       the 11 products, typed
    whatsapp.ts       wa.me deep-link builder
public/
  products/           11 optimised photos
Product Images/       your untouched originals (not deployed)
```

Only four components are client components; everything else renders on the server.

## Editing

| What | Where |
|---|---|
| **WhatsApp number** | `src/lib/site.ts` → `whatsappNumber` (and `whatsappDisplay`) |
| **Message wording** | `src/lib/whatsapp.ts` |
| **Instagram, tagline, SEO copy** | `src/lib/site.ts` |
| **Products** | `src/lib/products.ts` |
| **Colours, gradients, type** | `:root` at the top of `src/app/globals.css` |

### Adding a product

Add an entry to the `products` array in `src/lib/products.ts` and drop a photo at
`public/products/<slug>.jpg`. That's it — the card, the WhatsApp message, and the
filter chip counts are all derived from that array, so nothing else needs touching.

TypeScript enforces the shape, and `category` must be one of `skin | hair | body | lips`.

## Deploying

Railway builds the `Dockerfile` automatically — no configuration needed.

1. New Project → Deploy from GitHub repo → this repo
2. Settings → Networking → **Generate Domain**

The multi-stage build ships only the standalone server, so the runtime image
carries neither the source nor the 18 MB of original photography.

### Custom domain

Add the domain in Railway (Settings → Networking → Custom Domain); it gives you a
CNAME target to enter at your DNS provider.

A CNAME cannot legally sit on a root domain, so `veetree.life` needs either a DNS
provider that flattens CNAMEs (Cloudflare does, free) or a root → `www` redirect.

## Copy to confirm before launch

These lines are placeholders and should be checked against what VeeTree can
actually stand behind:

- Ticker claims: *100% Natural · No Parabens · No Sulphates · Cruelty Free*
- The four Promise cards in `Ritual.tsx` — sourcing, batch size, freshness
- The brand story in `Story.tsx`
- Product sizes, which were read off the label photographs
