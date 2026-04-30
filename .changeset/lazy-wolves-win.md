---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

`ThemeProvider` now supports derivative color modes. You can pass modes like `"dark_dimmed"` or `"light_high_contrast"` and the right light or dark color tokens will apply. No new themes are added; derivative modes inherit from the existing `light` and `dark` token sets.
