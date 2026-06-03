---
name: github-brand-web-design
description: Use this skill to generate well-branded interfaces and assets for GitHub's brand / marketing web surface (product landing pages, Copilot / Enterprise / Security pages, heroes, rivers, pricing, navigation, footers, CTA banners, FAQs), either for production or for throwaway prototypes/mocks. Contains GitHub's Primer-based color scales, the Mona Sans / Hubot Sans / Monaspace type system, fonts, logo & icon asset pointers, the full component CSS, and ready-to-use markup recipes.
user-invocable: true
---

# GitHub Brand Web — design skill

This skill captures GitHub's **brand / marketing web** layer — the public github.com
marketing surface: product landing pages, Copilot / Enterprise / Security category pages,
pricing, heroes, rivers, navigation, footers. It is **not** the logged-in product app.
It is built on GitHub's **Primer** color foundations and the open-source **Mona Sans /
Hubot Sans / Monaspace** typefaces.

## Read these in order
1. **`01-brand-guidelines.md`** — voice & content rules, visual foundations, iconography.
2. **`02-tokens.md`** — all design tokens + the full `colors_and_type.css` to drop in.
3. **`03-components.md`** — the full component CSS + HTML/React recipes for every section.
4. **`04-assets.md`** — fonts (CDN), Octicons (CDN), the GitHub mark + wordmark SVG, logos.

## Workflow
- **For visual artifacts** (slides, mocks, throwaway prototypes): create static HTML, link
  or paste in the CSS from `02` (and `03` if using components), pull fonts + icons from the
  CDNs in `04`. View in a browser.
- **For production work**: copy the CSS into your project, read the rules in `01`, and
  design as an expert in this brand.
- If invoked with no other guidance, **ask the user what they want to build**, ask a few
  scoping questions, then act as an expert designer who outputs HTML or production code.

## The 10 brand rules you must not break
1. **Sentence case everywhere** (headlines, buttons, nav) — the ONE exception is the
   **ALL-CAPS mono eyebrow label**, paired with a small solid-green block cursor (▍).
2. **Type:** Mona Sans for headings + copy; Monaspace Neon for mono/eyebrows/code; Hubot
   Sans for rare oversized display. Body copy gets +1% (`0.01em`) tracking; big type is set
   tight.
3. **Color:** neutral green-tinted warm-gray foundation + true black / Primer `#0D1117`
   dark canvas. Signature **green `#5FED83`** (bright accent/glow) and **`#08872B`**
   (primary-button green). Blue `#3094FF` for links. **Purple `#8534F3` is reserved for
   Copilot/product visuals only** — never as a text-section background gradient.
4. **Primary button = green** (`#08872B` light / `#5FED83` dark) with white text in BOTH
   themes, **6px radius**, 1px inner border.
5. **First-class light AND dark themes** — toggle with `[data-theme="dark"]`.
6. **Borders do the work, not shadows.** Cards = flat fill + 1px hairline border. The
   signature elevation is a **green glow**, used only behind hero/product art.
7. **Icons = Octicons** (single-color SVG inheriting `currentColor`, 16/24px grid). Never
   hand-draw icons; never use emoji as icons.
8. **No emoji in product copy.** Stats only when concrete and sourced — no vanity metrics.
9. **The eyebrow + cursor motif** (uppercase Monaspace kicker + green block cursor) threads
   through every section as a terminal-prompt cue.
10. **Motion is short and functional** (~120–200ms ease); gentle fade/rise entrances. No
    bouncy or looping decorative animation on marketing content.

## Voice in one line
Confident, technical, builder-to-builder. Address the reader as **"you"**; the product is
the subject of verbs ("Copilot writes…", "GitHub secures…"). Imperative, craft-oriented
headlines ("Command your craft", "Code, command, and collaborate").
