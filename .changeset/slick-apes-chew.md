---
'@primer/react-brand': minor
---

⚠️ Breaking changes to the `Card` component.

- Removed the `torchlight` Card variant. Cards now use the standard appearance in both light and dark mode.

  ```diff
  - <Card variant="torchlight" />
  + <Card />
  ```

- `Card.Label` now uses `EyebrowText` under the hood, with `default`, `muted`, and `accent` variants. Migrate previous `size` and `color` usage to the closest supported `variant`.

  ```diff
  - <Card.Label size="200" color="green">Beta</Card.Label>
  + <Card.Label variant="accent">Beta</Card.Label>
  ```

- Added new `ctaVariant` prop with `text`, `arrow`, and `none` options to control how the card's primary action is rendered.
- Added `leadingVisual` prop for rendering a logo or brand mark above the card content. Note that `leadingVisual` and `Card.Icon` cannot be used together.
- Added `Card.Tokens` for rendering metadata before or after the main copy, with `position="block-start"` and `position="block-end"` options.
