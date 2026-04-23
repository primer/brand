---
'@primer/react-brand': minor
---

⚠️ Breaking changes to the `Card` component.

- Removed the `torchlight` Card variant.

  ```diff
  - <Card variant="torchlight" />
  + <Card />
  ```

- `Card.Label` now renders a `Token` by default and supports `token` and `accent-text` variants. Use `variant="accent-text"` to render accent-styled eyebrow text above the heading. The legacy `size` and `color` props are no longer supported.

  ```diff
  - <Card.Label variant="accent">GitHub Copilot</Card.Label>
  + <Card.Label variant="accent-text">GitHub Copilot</Card.Label>

  - <Card.Label color="blue-purple">Beta</Card.Label>
  + <Card.Label>Beta</Card.Label>
  ```

- Added new `ctaVariant` prop with `text`, `arrow`, and `none` options to control how the card's primary action is rendered. Center-aligned CTA links now wrap correctly and omit the trailing arrow so the action remains visually centered.
- Added `backgroundColor` prop with `default`, `subtle`, and `none` options to control the card background color. `minimal` cards default this prop to `none` to preserve their transparent appearance unless explicitly overridden.
- Added `leadingVisual` prop for rendering a logo or brand mark above the card content. Note that `leadingVisual` and `Card.Icon` cannot be used together.
- Added `Card.Tokens` for rendering metadata before or after the main copy, with `position="block-start"` and `position="block-end"` options.
