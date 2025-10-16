---
'@primer/react-brand': minor
---

Replaced logical `end` values with physical `flex-end` across multiple components to resolve downstream compilation issues with older browserslist configs. This change removes automatic RTL support where `end` was previously used.

This change affects the following components:

- `Bento`
- `SubNav`
- `Select`
- `RiverBreakout`
