---
'@primer/react-brand': patch
---

Added new props to `Grid` component for tighter layout control:

- `columnGap`: controls the gap between columns. Accepts `'default'` or `'none'`.
- `rowGap`: controls the gap between rows. Accepts `'default'` or `'none'`.

No breaking changes. Both updates are opt-in and previous `gap` values remain the `default`.
