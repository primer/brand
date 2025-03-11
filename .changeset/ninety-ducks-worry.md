---
'@primer/react-brand': minor
---

- Updated the `Pagination` component to ensure consistent behaviour across all viewports by displaying a condensed pagination on narrow viewports.
- ⚠️ Deprecated responsive object support in the `showPages` prop. The `showPages` prop now only accepts a boolean value which will hide/show the page numbers across all viewports.

  ```diff
    <Pagination
  -   showPages={{narrow: true, regular: true, wide: true}}
  +   showPages
    />

    // Or

    <Pagination
  -   showPages={{narrow: false, regular: false, wide: false}}
  +   showPages={false}
    />
  ```
