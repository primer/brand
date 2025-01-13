---
'@primer/react-brand': minor
---

Anti-aliasing is now applied automatically to all `Text` instances _except_ under these conditions:

- When explicitly disabled via `hasAntiAliasing={false}`
- When font weight is `light` or `extralight` AND size is `'100'` or `'200'`
- When size is `100` (regardless of weight)
