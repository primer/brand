---
'@primer/react-brand': patch
---

Fixed a bug in the `ActionMenu` component where items with falsy values (eg `""`) would not trigger the `onSelect` callback when selected.
