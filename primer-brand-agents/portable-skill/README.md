# GitHub Brand Web — Portable Skill Package

This folder is a **self-contained, portable copy** of the *GitHub Brand Web* design
system, written so that **any AI agent or developer elsewhere can reproduce near-identical
results without access to the original tool.** Everything an agent needs to make on-brand
decisions is here as plain markdown — the brand rules, the *verbatim* design tokens, the
component recipes, and public CDN pointers for fonts and icons (no binary files required).

> **Why this works:** a design system isn't only prose. To get identical output you need
> three layers — (1) the **instructions** an agent reads, (2) the **exact token values**
> (colors, type ramp, spacing) embedded so nothing is approximated, and (3) **asset
> pointers** (fonts + icons via CDN) so no files have to travel. All three are in here.

## Files in this package

| File | What it is | Used by the agent to… |
|---|---|---|
| `SKILL.md` | The skill manifest (YAML frontmatter) + orientation + workflow. | **Decide** when to use the system and **how to start**. |
| `01-brand-guidelines.md` | Voice/content rules, visual foundations, iconography. | Make on-brand **copy + visual** decisions. |
| `02-tokens.md` | Every design token, as tables **and** the full `colors_and_type.css` embedded verbatim. | Get **exact** colors, type ramp, spacing, radii, shadows. |
| `03-components.md` | The full `kit.css` embedded + HTML markup recipes + React component APIs. | Build **identical components** (nav, hero, river, pricing, FAQ, footer…). |
| `04-assets.md` | Font CDN imports, Octicon CDN usage, the GitHub mark + wordmark SVG inline, logo notes. | Wire up **fonts, icons, logo** with no local files. |

## How to install it into another agent

**Option A — Claude Code / Agent Skills.** Drop this whole folder into your agent's skills
directory (e.g. `.claude/skills/github-brand-web/`). `SKILL.md`'s frontmatter `description`
is what the agent matches against to auto-invoke it; the body tells it to read the numbered
files. Done.

**Option B — Any other agent / chatbot.** Paste `SKILL.md` + `01`–`04` into the system
prompt or a project-knowledge / context store. The agent now has the full system in context.

**Option C — A human developer.** Read `01`, copy the CSS from `02` and `03` into your
project as `colors_and_type.css` and `kit.css`, wire fonts/icons per `04`, and follow the
component recipes. You'll have the live UI kit.

## Fidelity notes

- **Pixel-identical** for everything token-driven: colors, type ramp, spacing, radii,
  shadows, button/card/nav styling — because the real CSS is embedded verbatim.
- **Fonts** load from the public Fontsource CDN, so Mona Sans / Hubot Sans / Monaspace Neon
  render exactly as designed (no substitution).
- **Icons** pull from the public Primer Octicons CDN — same vectors GitHub ships.
- **Customer/partner logos** are the one thing that can't travel (they're third-party
  trademarks). Swap in real logo SVGs, or use neutral placeholders — they don't affect the
  look of the system itself.
- This is a **brand/marketing-web** recreation for design + prototyping, **not** official
  GitHub production code or the logged-in product app.
