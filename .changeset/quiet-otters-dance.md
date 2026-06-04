---
'@primer/react-brand': minor
---

⚠️ Breaking change: Removed the `imageBackgroundColor` prop from `River.Visual`.

The `gridline` variant now applies the full-bleed visual background layout by default. Remove `imageBackgroundColor="subtle"` from `River.Visual` when using `River variant="gridline"`.

River now uses a `618px` max-width and lateral gridlines on tablet viewports to match the RiverAccordion tablet layout.
