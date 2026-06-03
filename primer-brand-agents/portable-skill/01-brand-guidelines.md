# 01 — Brand guidelines (voice, visual foundations, iconography)

The complete set of decisions an agent needs to make on-brand copy and visuals.

---

## CONTENT FUNDAMENTALS

**Voice — confident, technical, builder-to-builder.** Copy speaks to developers as peers.
It is direct and active, never salesy or fluffy. Imperative, craft-oriented headlines:
*"Command your craft," "Code, command, and collaborate," "Make your editor your most
powerful accelerator," "Ship faster with AI that codes with you."*

- **Person:** Address the reader as **"you" / "your"**; the product is the subject of verbs
  ("Copilot writes…", "GitHub secures…"). First-person plural ("we") only in
  foundational/brand statements.
- **Casing:** **Sentence case everywhere** — headlines, buttons, nav, section titles
  (e.g. "Take flight with GitHub Copilot"). The ONE exception is the **mono eyebrow/kicker
  label**, which is **ALL-CAPS** with wide tracking (`EYEBROW`, `GITHUB COPILOT`, `EXPLORE`).
- **Headlines:** short, punchy, benefit-led, often a verb phrase. Pair with a one- to
  two-sentence supporting description in muted gray.
- **Product naming:** Always "GitHub Copilot", "GitHub Enterprise", "GitHub Advanced
  Security" on first/marketing reference; "Copilot" thereafter. Feature names are sentence
  case ("Code security", "Secret protection", "Supply chain").
- **CTAs:** action verbs — "Get started", "Sign up for free", "Contact sales", "Explore
  documentation", "Compare plans". Buttons come in clusters of up to 2 buttons + up to 2
  inline links (primary, secondary, tertiary).
- **Emoji:** **Not used** in production marketing copy.
- **Microcopy tone:** plain, helpful, lowercase-friendly in metadata/footers; legal and nav
  links are terse single words ("Pricing", "Docs", "About", "Enterprise").
- **Numbers/stats:** used sparingly and only when concrete and sourced (e.g. "increased
  developer productivity by 94% with Copilot"). No vanity metrics.

---

## VISUAL FOUNDATIONS

**Overall vibe:** clean, high-contrast, engineering-grade. Lots of whitespace on light
pages; deep true-black drama on dark pages. A monospace "terminal" motif threads through
everything (eyebrows, labels, code visuals). The signature move is **bright green + true
black + a purple-gradient product visual.**

- **Color** — Neutral foundation (white / `#F2F5F3` subtle / true black `#000` / Primer
  canvas `#0D1117`) with a tight accent set: **brand green `#5FED83`** (bright accent &
  glow), **`#08872B`** (primary-button green on light), **blue `#3094FF`** (links/accent),
  and **purple `#8534F3`** reserved for Copilot/product imagery. Neutrals are subtly
  **green-tinted warm grays**, not pure grays. Full 10-step Primer tonal scales exist for
  every hue. (See `02-tokens.md` for every value.)
- **Themes** — First-class light AND dark. Dark hero sections sit on pure black; product
  app screenshots use Primer `#0D1117`. Borders go from `#D2D9D4` (light) to `#262C28`
  (dark). Toggle with `[data-theme="dark"]`.
- **Type** — **Mona Sans** for headings & copy (heading weights 440–500, near-zero
  tracking, tight 110–140% leading). **Monaspace Neon** for mono labels, eyebrows and code.
  **Hubot Sans** for the most expressive oversized display headlines. Big type is set tight
  and negative-tracked.
- **Backgrounds** — Mostly flat solid fills (white, subtle gray, black). The one signature
  gradient is the **purple radial/linear glow** behind product/editor screenshots (purple
  `#8534F3 → #B870FF`), often overlaid with a faint **dotted/halftone texture**. No bluish-
  purple "AI slop" gradients on text sections. Full-bleed photography appears in customer-
  story bands (warm, natural-light office/people photography).
- **Imagery vibe** — Two registers: (1) crisp **product/editor screenshots** floated on
  purple-gradient panels, and (2) **warm, real, natural-light photography** for
  customer/enterprise stories. Brand spot illustrations use the green/black/purple palette.
- **The eyebrow + cursor motif** — section kickers are uppercase Monaspace labels followed
  by a small solid-green **block cursor** (`▍`), evoking a terminal prompt.
- **Borders & dividers** — hairline 1px borders (`#D2D9D4` light / `#262C28` dark).
  "Branded dividers" and "rivers" use thin rules and the green accent. Strict grid/section
  alignment on a 12-column feel with a generous ~176px desktop gutter.
- **Corner radii** — buttons & inputs **6px**; cards **12px**; large media panels
  **16–24px**; whole marketing sections can round to **40px**. Pills/avatars fully round.
- **Cards** — light: white fill, 1px `#D2D9D4` border, modest radius (12px), subtle or no
  shadow (flat-with-border is the default). Dark: `#0D1117`/`#0F1511` fill with `#262C28`
  border. Elevation is restrained — borders do most of the work; soft shadows only on
  popovers/menus.
- **Shadows & glows** — UI shadows are soft and low (`0 3px 6px rgba(31,35,40,.10)`). The
  brand's signature elevation is a **green glow** `0 0 60px rgba(95,237,131,.75)` (and a
  blue glow `rgba(158,236,255,.70)`) used behind hero product art and accent moments.
- **Transparency & blur** — secondary buttons and some overlays use translucent fills
  (`rgba(0,0,0,0.06)`) with `backdrop-filter: blur(40px)`. Nav becomes a blurred translucent
  bar on scroll.
- **Buttons** — Primary: solid green (`#08872B` light / `#5FED83` dark), 6px radius, `1px
  rgba(0,0,0,.12)` inner border, 16px Mona Sans medium, 0.01em tracking, ~11/20px padding.
  Secondary: translucent fill + 1px gray border + blur. Tertiary: text link with arrow.
  Small + default sizes.
- **Hover / press** — Hover darkens fills slightly and/or raises subtle shadow; links gain
  underline; tertiary links nudge their trailing arrow. Press states reduce brightness (no
  big squash). Transitions short and functional (~120–200ms ease), **no bouncy or
  decorative looping animation** on marketing content. Entrances are gentle fades/rises.
- **Layout** — Fixed top nav (68px, hairline bottom border) that blurs on scroll; centered
  max-width content (~1280px) inside ~176px gutters; alternating "river" image/text bands;
  sticky-ish pricing and FAQ accordions.

---

## ICONOGRAPHY

GitHub uses **Octicons** — its own open-source SVG icon set — almost exclusively. Icons are
**single-color line/solid SVGs** that inherit `currentColor`, sized on a **16px / 24px**
grid, with a clean even stroke and rounded terminals.

- Common icons in this system: `search`, `star` / `star-fill`, `zap`, `copilot`,
  `chevron-down`, `chevron-right`, `triangle-down`, `link-external`, `shield-lock`, `lock`,
  `code-square`, `codescan`, `issue-opened`, `comment-discussion`, `code-review`,
  `code-scan`, `sparkle-fill`, `mcp`, `gift`, `book`, `gear`, `globe`, `check`. All Octicons.
- **No icon font** — icons are inline SVG. (Editor/code visuals additionally show VS Code's
  Codicon/Seti glyphs as product chrome, not brand iconography.)
- **Emoji:** never used as UI iconography.
- **Unicode glyphs as icons:** the only notable one is the **▍ block cursor** in eyebrows
  (rendered as a small green rectangle, not a character).

See `04-assets.md` for how to pull any Octicon from the public CDN and for the GitHub mark +
wordmark SVG. **Always use real icon vectors — never hand-draw or substitute emoji.**
