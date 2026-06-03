---
name: github-brand-web-design
description: Use this skill to generate well-branded interfaces and assets for GitHub's brand / marketing web surface (product landing pages, Copilot / Enterprise / Security pages, heroes, pricing, navigation, footers), either for production or throwaway prototypes/mocks. Contains GitHub's Primer-based colors, the Mona Sans / Hubot Sans / Monaspace type system, fonts, logo & icon assets, and a ready-to-use brand-web UI kit.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

This design system captures GitHub's **brand / marketing web** layer (not the logged-in
product app). Start with:
- `README.md` — company/product context, content & visual foundations, iconography, index.
- `colors_and_type.css` — all design tokens (Primer color scales, semantic light/dark vars,
  the responsive Mona Sans type ramp, spacing, radii, shadows/glows) + fonts via CDN.
- `preview/` — small spec cards for every foundation and component.
- `ui_kits/brand-web/` — an interactive Copilot-style marketing page; reuse its
  components (`components.jsx`, `sections.jsx`) and `kit.css`.
- `assets/` — GitHub Invertocat mark, "GitHub" wordmark, Octicons, customer logos.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out
and create static HTML files for the user to view, importing `colors_and_type.css`. If
working on production code, copy assets and read the rules here to become an expert in
designing with this brand.

Key brand rules (see README for detail):
- Sentence case everywhere except UPPERCASE mono eyebrow labels (paired with a green
  block cursor). No emoji in product copy.
- Type: Mona Sans (headings/copy, wght 425–500, 0% tracking; copy +1%), Monaspace Neon
  (mono/eyebrows). Headings are responsive (desktop/tablet/mobile sizes in the CSS).
- Color: neutral foundation + true black / Primer `#0D1117` dark canvas; signature green
  `#5FED83` / `#08872B`; purple `#8534F3` reserved for product visuals.
- Primary button = green `#08872B` with white text in BOTH themes; 6px radius.
- Icons = Octicons (single-color SVG, currentColor). Never hand-draw or use emoji as icons.

If the user invokes this skill without other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.
