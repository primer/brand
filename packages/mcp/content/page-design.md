# Page design patterns

These page-level guidelines complement the component APIs and documentation. Apply them unless the brief says otherwise. `primer_brand_review` catches some code-level mistakes automatically, but it cannot judge every visual or layout decision; use this guide for the full composition rules.

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

The gridline look is crucial and literal, not just a set of variants. Gridlines are thin ruled lines that frame the content column and separate sections (see "Contain content within the grid" section below).

Confirm the exact options with `primer_brand_component` rather than assuming which variants a component has — the specific names evolve over time.

## Page structure

### Frame every page with a header and footer

Every full page should be framed top and bottom, unless the user has requested a custom implementation.

- **Do** — use `SubdomainNavBar` at the top and `MinimalFooter` at the bottom (APIs via `primer_brand_component`).
- **Don't** — hand-roll a `<header>`, `<nav>`, or `<footer>` unless user has a separate plan for it.

### Contain content within the grid

Body content must sit in one centered, max-width grid framed by the brand's gridlines — it should rarely stretch edge-to-edge.

Examples of this are in the Flexsuite recipes.

- **Do** — keep heroes, `River`s, `ComparisonTable` / `PricingOptions`, connected Card or Pillar groups, forms, `CTABanner`s, and prose on the same `Grid` / `Section` column. Draw thin side rules on the column and full-bleed horizontal rules between major sections.
- **Don't** — give each section a different width, stretch content edge-to-edge, or let a section bleed full-width unless it is a deliberate background band behind the shared grid.
- **Mobile** — use a modest, consistent side inset and make sure nothing overflows the viewport.

Resolve gutter, inset, and gridline (border) values with `primer_brand_tokens`; don't hardcode hex or pixel values.

### Responsive rules

Generous spacing is what lets a layout breathe; the Flexsuite recipes are a good reference for the rhythm to aim for.

- **Do** — use `Box` and `Stack` responsive spacing props and the established scale. Useful page-composition steps include `--base-size-20` for narrow gutters, `--base-size-60` / `--base-size-64` for regular section rhythm, and `--base-size-80` for wide breathing room.
- **Do** — match the canonical wide `Grid` / container gutter instead of reproducing reviewed measurements as hardcoded values.
- **Don't** — pack sections edge-to-edge, hand-roll ad-hoc margins, or invent one-off gap values.

### Typographic hierarchy

A page has one clear headline and a calm step-down from there.

- **Do** — use a single hero heading, make secondary section headings a clear step smaller, and keep body copy regular weight. Left-align long-form copy; reserve centering for short hero or section intros.
- **Don't** — size secondary headings close to the hero, set body text in heavy weights, or center long paragraphs.

Resolve exact sizes and weights with `primer_brand_tokens`.

## Component & element patterns

### Generated dither backgrounds

**Always pair dither wallpaper with product UI.** Dither is a supporting background texture, never standalone media or content.

- Use two separate layers for every product UI visual: a dither background and a contained product-shot foreground. Keep them as distinct layers, never one flattened image.
- Treat a solid subtle/gray surround as placeholder-only. Replace the entire surrounding surface with dither.
- When no screenshot is provided, proactively create one lightweight, representative product UI mockup to show that product imagery matters and that the user should replace it with their own screenshot.
- When product UI does not fit the brief, use a relevant non-dither wallpaper, approved illustration, or video.
- Apply dither only as the background of an outer media wrapper.
- Never pass dither to `Hero.Image`, `Image`, `<img>`, or `<picture>`, or make it the direct image child of `River.Visual`.
- Layer the product shot above the dither, leaving dither visible around it.
- In Hero media, make the dither wrapper span the full viewport width.
- In River media, make the dither wrapper fill the `River.Visual` cell.

### Hero

**Do**

- Every Hero must include relevant visual media and a label unless the brief explicitly requires a text-only Hero.
- A missing input screenshot is not a reason to omit Hero media.
- For one non-product media asset, use `Hero.Image` / `Hero.Video`.
- For product UI, use the two-layer treatment in **Generated dither backgrounds**. Do not render product UI directly through `Hero.Image`.
- Place a product UI media band immediately after the Hero copy.
- Constrain only the product-shot foreground to the shared content-grid width; the full-width media band is not permission to make the product shot itself bleed full-width.
- Use a single flattened, precomposed landscape image only when the brief explicitly requires one.
- Keep decorative or illustrative media inside the shared grid with a stable aspect ratio and a token-backed maximum height so it cannot dominate the page or bleed full-width.
- If needed, place custom media after `Hero`; use `trailingComponent` only when it must live inside the Hero composition.

**Don't**

- Finish a Hero as text and actions only because the brief did not provide an image.
- Add irrelevant hero media, or use social or open-graph templates for hero media.
- Put dither behind the Hero copy, inside `Hero.Image`, inside the content grid, or in a flattened product shot. The dither is the full-bleed media-band background; the product shot is the contained foreground.
- Let decorative or illustrative Hero media grow arbitrarily tall or bleed outside the shared grid.

### River

**Do**

- Use `<River variant="gridline" align="start">` throughout a page; omitting `align` also means start.
- Keep River descriptions to a maximum of 160 characters.
- Prefer the default `50:50` image-to-text ratio where possible; set `imageTextRatio="60:40"` only when the visual needs more space or emphasis.
- When a River explains a product feature, prefer real product UI over a standalone wallpaper.
- For River product UI, use the two-layer treatment in **Generated dither backgrounds** inside `River.Visual`.
- Use a standalone non-dither wallpaper only when no meaningful product UI can demonstrate the feature.

**Don't**

- Zigzag gridline Rivers with `align="end"`.
- Render dither as the direct image child of `River.Visual`; it must cover the full visual cell as the background behind a separate product shot.
- Use a wallpaper as the only River visual when a product shot would communicate the feature; wallpaper-only product Rivers read as placeholders.

### Repeated panels

**Do**

- Place `Card`, `Pillar`, `Box`, or custom items in a square frame using `<Grid columnGap="none" rowGap="none" enableGutters={false}>`.
- Draw shared dividers on custom frame/cell wrappers and use `border-radius: 0` there.

**Don't**

- Render repeated panels as separate rounded cards, double their shared borders, or override `Card` / `Pillar` internals.
- `Pillar` has no grid variant; don't invent one.

### CTABanner

**Do**

- Without media, use the default `CTABanner` with `align="center"` and `hasGridLines`.
- With media, use `<CTABanner variant="balanced" hasGridLines>` with a direct `CTABanner.Image`. Use Octovisuals for artwork; reserve `CTABanner.Logo` for genuine logos.

**Don't**

- Use `CTABanner variant="balanced"` without a direct `CTABanner.Image`, or use `CTABanner.Logo` for decorative artwork.

### Forms

**Do**

- Use a square, zero-gap `Grid` with connected benefits beside a subtle form surface. Use responsive token gutters, Primer Brand form controls, and an enabled `<Button variant="primary" type="submit">`.

**Don't**

- Use raw form controls or put the form section in a floating rounded panel.

### FAQs

**Do**

- Use `FAQGroup` navigation for multiple meaningful categories and one `FAQ` directly for a single category.

**Don't**

- Show `FAQGroup` navigation for a single category.

### Section backgrounds

**Do**

- Keep one default background across sections. Use `backgroundColor="subtle"` only to clarify a functional region.

**Don't**

- Alternate section background colors merely for decoration.

### Labels

**Do**

- Use `Hero.Label`, `SectionIntro.Label`, or `EyebrowText`; keep labels intrinsic-width and aligned with their section.

**Don't**

- Stretch Label components full-width or hand-style replacements for the label components. Labels should preserve their auto width; don't let the parent stretch them.

### Lists

**Do**

- Use dot bullets without decorative dividers between items.

**Don't**

- Use dashes as bullets.

### Buttons

**Do**

- Show enabled controls with a clear primary/secondary hierarchy.

**Don't**

- Make normal controls look disabled.

### Icons

**Do**

- Keep Octicons at the default green in `Card.Icon`, `Pillar.Icon`, and `Icon` unless there is a deliberate exception.

**Don't**

- Tint default-green Octicons without a deliberate reason. `Pillar.Icon` has no `color` prop.

## Visual verification

When browser tooling is available, screenshot desktop, tablet, and mobile. Check that:

- Content shares one centered grid and consistent gutters.
- Repeated panels share square boundaries and dividers.
- Nothing clips, overflows, or overlaps; labels remain intrinsic-width.
- Hero media and images render correctly; text has sufficient contrast.
- Copy is real and specific, with no glows, purple gradients, pill buttons, or glassmorphism.

Fix issues and re-screenshot before finishing.
