---
'@primer/react-brand': minor
---

Removed max-width from the `ActionMenu` component

⚠️ Please check your usage of `ActionMenu` as the computed width may now be larger than before, potentially causing unintended layout changes.

This change was made because the previous max-width of `200px` caused longer localized labels to unintentionally wrap onto two lines.
