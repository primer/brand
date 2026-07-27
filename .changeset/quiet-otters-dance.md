---
'@primer/react-brand': minor
---

⚠️ Breaking change: Removed the `imageBackgroundColor` prop from `River.Visual`, `RiverBreakout.Visual`, and `RiverBreakoutTabs.Visual`.

The `gridline` variant now applies the full-bleed visual background layout by default. Remove `imageBackgroundColor="subtle"` from `River.Visual` and `RiverBreakout.Visual` when using the `gridline` variant.

Remove `imageBackgroundColor` from `RiverBreakoutTabs.Visual` without replacement. Its default visual treatment is unchanged.

The background treatment is not applied to the default `River` or `RiverBreakout` variants.

Updated the River `gridline` variant tablet layout with a `618px` max-width and lateral gridlines.
