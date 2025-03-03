---
'@primer/react-brand': minor
---

- Updated the `Pagination` component to ensure consistent behaviour across all viewports by displaying a condensed pagination on narrow viewports.
- ⚠️ Deprecated responsive object support in the `showPages` prop.
  - Eg, `showPages={{narrow: false, regular: true, wide: true}}` is no longer supported.
  - The `showPages` prop now only accepts a boolean value to hide/show the page numbers on all viewports.
