---
'@primer/react-brand': minor
---

⚠️ Breaking change: Removed the `imageBackgroundColor` prop from `River.Visual`, `RiverBreakout.Visual`, and `RiverBreakoutTabs.Visual`.

The `River` `gridline` variant now applies the full-bleed visual background layout by default. Remove `imageBackgroundColor="subtle"` from `River.Visual` when using the `gridline` variant.

Remove `imageBackgroundColor` from `RiverBreakout.Visual` and `RiverBreakoutTabs.Visual` without replacement. Their default visual treatments are unchanged.

The background treatment is not applied to the default `River` variant or either `RiverBreakout` variant.

Updated the River `gridline` variant tablet layout with a `618px` max-width and lateral gridlines.
