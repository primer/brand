---
'@primer/react-brand': patch
---

Fix `useWindowSize` breakpoints to match CSS rem media queries when the browser default font size changes. Align `xxlarge` with the `87.5rem` token (1400px at a 16px default), replacing the previous 1440px threshold.
