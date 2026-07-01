# Page design patterns

These are the page design guidelines for GitHub marketing and landing pages, beyond what the component APIs or documentation guidelines recommend. Apply these by default unless the brief says otherwise. These are **design conventions** and the `primer_brand_review` tool does not flag them, so consult this before composing a page.

Learn individual component APIs and usage with `primer_brand_docs` and `primer_brand_component`. This guide is the step after: how to lay out an entire page and use those components alongside your custom ones correctly.

## Start here

The Flexsuite recipe templates are the current canonical source of truth for what GitHub web pages should look like today. Every component in them reflects the latest brand, unlike many older standalone examples. Use them as your
starting point and reference, and mirror their composition and section order:

- **Overview / landing page** — `FlexSuiteAIOverview` (hero with media, logo suite, gridline card
  grids, rivers, pricing, FAQ, footer).
- **Category page** — `FlexSuiteSecurityCategory`.
- **Details page** — `FlexSuiteAIDetailsPlaylist`.

Pull adaptable component snippets with `primer_brand_examples`.

## Aesthetic: prefer the gridline look

`@primer/react-brand` spans multiple generations of GitHub's design language, and many components expose that choice as a variant or prop. **Gridline** is the current brand direction. It's a connected, ruled-line aesthetic, as seen throughout the Flexsuite templates. Bias toward it.

- **Do** — when a component offers a gridline-family option, choose it over the older or default look. "Expressive" gridline options are a more pronounced sub-variant of the same aesthetic, not a competing style; reach for them where a section wants extra emphasis.
- **Don't** — settle for a component's plainest or legacy variant, or borrow section layouts from an older brand generation, when a gridline equivalent exists.

Confirm the exact options with `primer_brand_component` rather than assuming which variants a component has — the specific names evolve over time.

## Page structure

### Frame every page with a header and footer

Every full page should be framed top and bottom, unless the user has requested a custom implementation.

- **Do** — use `SubdomainNavBar` at the top and `MinimalFooter` at the bottom (APIs via `primer_brand_component`).
- **Don't** — hand-roll a `<header>`, `<nav>`, or `<footer>` unless user has a separate plan for it.

### Spacing

Generous spacing is what lets a layout breathe; the Flexsuite recipes are a good reference for the rhythm to aim for.

- **Do** — use `Box` and `Stack` (both have responsive spacing props) to add consistent rhythm between sections.
- **Don't** — pack sections edge-to-edge or hand-roll ad-hoc margins.

## Component & element patterns

### Heroes carry media

A text-only hero reads as unfinished; heroes should carry a visual.

- **Do** — give `Hero` a `Hero.Image` (or `Hero.Video`); source imagery from `primer_brand_asset` (Octovisuals) or the Asset Generator MCP tooling (if installed).
- **Don't** — ship a bare, text-only hero.

### Group cards inside gridlines

A grid of items (features, pathways, plans) uses the connected **gridline** grid, not floating cards.

- **Do** — render a `Grid` with `columnGap="none" rowGap="none" enableGutters={false}` inside a bordered frame and let the frame draw the shared lines. Refer to the Flexsuite recipes for an example of this.
- **Don't** — output separate bordered `Card`s with gaps between them.

### Labels hug their content

Eyebrow/section labels are intrinsic width; stretching them reads as off-brand.

- **Do** — let `Hero.Label` / `SectionIntro.Label` / `EyebrowText` size to their content; alignment follows the section (start by default, or centered inside a centered `SectionIntro`).
- **Don't** — set a label full-width or give it a block/full-bleed background.

## General guidance

If you have browser tooling available, render the page and review it visually to check it against this guidance.
