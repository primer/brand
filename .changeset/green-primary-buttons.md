---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
'@primer/brand-css': minor
---

Updated Button appearance and API ergonomics:

- ⚠️ Breaking change: Removed the `accent` Button variant. Use `primary` instead, which now applies the previous `accent` appearance.
- Updated `secondary`, and `subtle` variant colors and state styles.
- Updated Button hover background colors to use transitionable color values and standardized hover transitions with a 0.2s background color transition. Previously, they would not animate at all.
- Updated Button border radius, medium Button sizing, and medium ActionMenu item height to better match the new Figma treatment.
- Updated the shared medium control size token from `48px` to `43px`, so medium Button, ActionMenu, TextInput, and Select controls stay aligned.
- Updated medium Button label typography to better match the new Figma treatment.
- Fixed vertical alignment issues in the `Button` component so labels are centered consistently in browsers like Firefox.
- Deprecated the `hasArrow` prop and hid Button arrows by default.
  - Note: `hasArrow` will be removed entirely in a future release.
