---
'@primer/react-brand': minor
---

⚠️ Breaking change: `SectionIntro.Label` no longer forwards props from the `Label` component, such as `size` and `color`.

- `SectionIntro` vertical padding has been reduced at wider viewports
- `SectionIntro.Label` now appears as muted text with a green cursor icon for visual parity with `Hero.Label`.
  - An optional `animate` prop is available to enable streaming cursor effect.

`Hero.Label` has minor adjustments to line height. Now uses the same `EyebrowText` component as `River`.
