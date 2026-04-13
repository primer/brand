---
'@primer/react-brand': minor
---

⚠️ Breaking changes to the `Card` component.

- Removed the `torchlight` Card variant. Cards now use the standard appearance in both light and dark mode.
- Replaced `Card.Label` using `EyebrowText` under the hood, with `default`, `muted`, and `accent` variants. Previous `size` and `color` props are no longer supported.
- Added new `ctaVariant` prop with `text`, `arrow`, and `none` options to control how the card's primary action is rendered.
- Added `leadingVisual` prop for rendering a logo or brand mark above the card content. Note that `leadingVisual` and `Card.Icon` cannot be used together.
- Added `Card.Tokens` for rendering metadata before or after the main copy, with `position="block-start"` and `position="block-end"` options.
