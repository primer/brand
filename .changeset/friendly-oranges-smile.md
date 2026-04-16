---
'@primer/react-brand': patch
---

Fixes for `River` and `Tiles` components that use `gridline` layouts. Now uses `100dvw` for the full-bleed borders. This better tracks the visible viewport on browsers with dynamic chrome, and can reduce horizontal overflow or border misalignment on mobile.
