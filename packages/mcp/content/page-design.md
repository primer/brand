# Page design patterns

These are the page design guidelines for GitHub marketing and landing pages, beyond what the component APIs or documentation guidelines recommend. Apply these by default unless the brief says otherwise. These are **design conventions** and the `primer_brand_review` tool does not flag them, so consult this before composing a page.

Learn individual component APIs and usage with `primer_brand_docs` and `primer_brand_component`. This guide is the step after: how to lay out an entire page and use those components alongside your custom ones correctly.

## Start here

The Flexsuite recipe templates are the current canonical source of truth for what GitHub web pages should look like today. Every component in them reflects the latest brand, unlike many older standalone examples. Use them as your starting point and reference, and mirror their composition and section order:

- **Overview / landing page** — `FlexSuiteAIOverview` (hero with media, logo suite, gridline card grids, rivers, pricing, FAQ, footer).
- **Category page** — `FlexSuiteSecurityCategory`.
- **Details page** — `FlexSuiteAIDetailsPlaylist`.

Pull adaptable component snippets with `primer_brand_examples`.

## Aesthetic: prefer the gridline look

`@primer/react-brand` spans multiple generations of GitHub's design language, and many components expose that choice as a variant or prop. **Gridline** is the current brand direction. It's a connected, ruled-line aesthetic, as seen throughout the Flexsuite templates. Bias toward it.

- **Do** — when a component offers a gridline-family option, choose it over the older or default look. "Expressive" gridline options are a more pronounced sub-variant of the same aesthetic, not a competing style; reach for them where a section wants extra emphasis.
- **Don't** — settle for a component's plainest or legacy variant, or borrow section layouts from an older brand generation, when a gridline equivalent exists.

The gridline look is crucial and literal, not just a set of variants. They are thin ruled lines that frame the content column and separate sections (see "Contain content within the grid" section below).

Confirm the exact options with `primer_brand_component` rather than assuming which variants a component has — the specific names evolve over time.

## Page structure

### Frame every page with a header and footer

Every full page should be framed top and bottom, unless the user has requested a custom implementation.

- **Do** — use `SubdomainNavBar` at the top and `MinimalFooter` at the bottom (APIs via `primer_brand_component`).
- **Don't** — hand-roll a `<header>`, `<nav>`, or `<footer>` unless user has a separate plan for it.

### Contain content within the grid

Body content must always sit in a centered, max-width column framed by the brand's gridlines — it should rarely stretch edge-to-edge.

Examples of this are in the flexsuite recipes.

- **Do** — keep content (heroes, rivers, tables, card grids, CTAs, prose) in a shared max-width column with clear left and right gutters, and let thin ruled gridlines run down both sides of the column with full-bleed horizontal rules between major sections.
- **Don't** — stretch tables, card grids, CTAs, or text edge-to-edge, or let a section bleed full-width unless it is a deliberate background band.
- **Mobile** — use a modest, consistent side inset and make sure nothing overflows the viewport.

Resolve gutter, inset, and gridline (border) values with `primer_brand_tokens`; don't hardcode hex or pixel values.

### Spacing

Generous spacing is what lets a layout breathe; the Flexsuite recipes are a good reference for the rhythm to aim for.

- **Do** — use `Box` and `Stack` (both have responsive spacing props) to add consistent rhythm between sections, and take spacing steps from the standard scale so gaps repeat predictably across sections and inside cards.
- **Don't** — pack sections edge-to-edge, hand-roll ad-hoc margins, or invent one-off gap values.

### Typographic hierarchy

A page has one clear headline and a calm step-down from there.

- **Do** — use a single hero heading, make secondary section headings a clear step smaller, and set body copy at the standard body size and weight. Left-align long-form copy; reserve centering for short hero or section intros.
- **Don't** — size secondary headings close to the hero, set body text in heavy weights, or center long paragraphs.

Resolve exact sizes and weights with `primer_brand_tokens`.

## Component & element patterns

### Heroes carry media

A text-only hero reads as unfinished; heroes should carry a visual and lead with a label.

- **Do** — give `Hero` a `Hero.Image` (or `Hero.Video`); source imagery from `primer_brand_asset` (Octovisuals) or generate it with the Asset Generator MCP (see _Generated imagery_ below). Lead the hero with an eyebrow label (see _Labels hug their content_), and bound decorative or illustrative media with a set aspect ratio and max height so it stays inside the grid.
- **Don't** — ship a bare, text-only hero, drop the eyebrow, or let an illustration run arbitrarily tall or bleed full-width.

### Generated imagery adds color and interest

Bring on-brand color and life to the page with the Asset Generator MCP (when installed) instead of leaving large areas flat — most pages want at least one generated visual.

- **Do** — use **`create_product_landscape`** when the visual demos a product or feature (a hero or section showing the thing itself), and **`create_wallpaper`** for everything else, to add a colorful on-brand backdrop or accent. Browse the current set with `list_templates` / `list_themes` and pick a theme that fits the page's topic.
- **Don't** — reach for social media-specific templates like `create_social_square` or `create_landscape` when a product shot or wallpaper fits better.

### Group cards inside gridlines

A grid of items (features, pathways, plans) uses the connected **gridline** grid, not floating cards.

- **Do** — render a `Grid` with `columnGap="none" rowGap="none" enableGutters={false}` inside a bordered frame and let the frame draw the shared lines. Refer to the Flexsuite recipes for an example of this.
- **Don't** — output separate bordered `Card`s with gaps between them.

### Labels hug their content

Lead heroes and sections with an eyebrow/section label; it is intrinsic width, and stretching it reads as off-brand.

- **Do** — use `Hero.Label` / `SectionIntro.Label` / `EyebrowText` for the standard treatment (a short, monospace, uppercase label) and let it size to its content; alignment follows the section (start by default, or centered inside a centered `SectionIntro`).
- **Don't** — set a label full-width, give it a block/full-bleed background, or hand-style your own instead of the label components.

### Sweat the small details

Small, repeated treatments are where a page quietly drifts off-brand.

- **Do** — use dot bullets for lists; keep buttons in their real interactive states (hover/active) and use a `Button` for a primary CTA rather than a bare link; show FAQ/accordion category navigation only when there are several categories; leave `Icon` at its default green wherever Octicons appear (`Card.Icon`, `Pillar.Icon`, and standalone `Icon`) so icons read as one consistent accent.
- **Don't** — use dashes as bullets, add divider rules between list items or sections, ship flat/stateless buttons, render an empty single-category sidebar, or override the `color` prop on `Icon` or `Card.Icon` to tint icons off-green without a strong, deliberate reason (`Pillar.Icon` has no `color` prop — it's already locked to green).

## General guidance

- If browser tooling (e.g. the Playwright MCP) is available, verify your work visually before finishing: serve the page locally, open it, and take screenshots across different breakpoints. Review the screenshots against this guidance and automatically fix obvious defects like content that bleeds edge-to-edge instead of sitting in the gridline column, clipped or overflowing content, cramped or one-off spacing, stretched/full-width labels that should preserve their intrinsic width, a hero with no eyebrow, an illustration that runs too tall, dashes used as bullets, low-contrast text, a text-only hero, broken images, and off-brand tells (glows, purple gradients, pill buttons, glassmorphism, placeholder copy). Re-screenshot to confirm the fixes.
