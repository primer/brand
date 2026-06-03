# GitHub Brand Web — Skill Summary

A quick-reference summary of what this design system skill lets me do for you.

## What this skill is

The **`github-brand-web-design`** skill captures GitHub's **brand & marketing web** layer — the public github.com marketing surface (product landing pages, Copilot / Enterprise / Security category pages, pricing, heroes, navigation, footers). It is **not** the logged-in product app.

It's built on GitHub's **Primer** color foundations and the open-source **Mona Sans / Hubot Sans / Monaspace** typefaces, and ships with ready-to-use tokens, fonts, logo & icon assets, and an interactive UI kit.

## What I can build with it

- **Marketing / landing pages** — heroes, "river" image+text bands, CTA banners, content pillars
- **Category pages** — Copilot, Enterprise, Advanced Security styling
- **Pricing** — pricing tables / plan comparison
- **Navigation & footers** — fixed blur-on-scroll top nav, full footers
- **Social proof** — customer/partner logo strips
- **FAQs** — accordions
- Either **throwaway prototypes/mocks** (static HTML you can view) **or production-grade code**

## Core capabilities

### Content & voice
- Confident, technical, builder-to-builder tone; addresses the reader as **"you"**
- **Sentence case everywhere** — the one exception is the ALL-CAPS mono eyebrow label
- The signature **eyebrow + green block cursor (▍)** terminal motif
- No emoji in product copy; stats used sparingly and only when concrete/sourced

### Type system
- **Mona Sans** — headings & body copy
- **Hubot Sans** — oversized expressive display headlines
- **Monaspace Neon** — mono labels, eyebrows, code
- Responsive type ramp (desktop / tablet / mobile) built into the CSS

### Color & theming
- Neutral, subtly green-tinted warm-gray foundation
- Signature **green `#5FED83`** accent + green glow, **`#08872B`** primary button green
- Blue `#3094FF` for links; **purple `#8534F3`** reserved for Copilot/product imagery
- First-class **light and dark** themes (`[data-theme="dark"]`), full 10-step Primer scales

### Components & styling rules
- Primary button = green, white text in both themes, 6px radius
- Cards: flat white fill + 1px hairline border (borders do the work, not shadows)
- Radii: buttons/inputs 6px · cards 12px · media panels 16–24px · sections up to 40px
- Signature elevation = **green glow**, not heavy drop shadows
- Short, functional transitions — no bouncy or looping marketing animation

### Iconography
- **Octicons** — single-color SVGs that inherit `currentColor`, on a 16/24px grid
- GitHub **Invertocat** mark + official "GitHub" wordmark included
- Never hand-drawn icons, never emoji-as-icons

## What's in the system

| Path | What it is |
|---|---|
| `README.md` | Full context — content & visual foundations, iconography, index |
| `colors_and_type.css` | All design tokens: color scales, semantic vars, type ramp, spacing, radii, shadows/glows, fonts |
| `SKILL.md` | The skill manifest |
| `assets/github-mark.svg` | GitHub Invertocat mark |
| `assets/github-logo.svg` | Official "GitHub" wordmark |
| `assets/icons/` | Octicons (single-color SVG) |
| `assets/logos/` | Customer/partner logos for social-proof strips |
| `preview/` | Spec cards for every foundation & component |
| `ui_kits/brand-web/` | Brand-web UI kit: nav, hero, rivers, pricing, FAQ, footer, buttons + interactive demo |

## How to put me to work

Just tell me what you want to build — e.g. *"a Copilot landing hero,"* *"a pricing page,"* *"a dark CTA banner"* — and whether you want a **mock/prototype** or **production code**. I'll design it on-brand using the tokens, components, and assets above.
