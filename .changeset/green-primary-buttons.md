---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
'@primer/brand-css': minor
---

Updated Button appearance and API ergonomics:

- ⚠️ Breaking change: Removed the `accent` Button variant. Use `primary` instead, which now applies the previous `accent` appearance.
- Updated `secondary`, and `subtle` variant colors and state styles.
- Updated medium Button label typography to better match the new Figma treatment.
- Deprecated the `hasArrow` prop and hid Button arrows by default.
  - Note: `hasArrow` will be removed entirely in a future release.
