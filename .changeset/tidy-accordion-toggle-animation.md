---
'@primer/react-brand': patch
'@primer/brand-css': patch
---

- Updated the `Accordion` toggle indicator to use the `TriangleDownIcon` octicon, which rotates anti-clockwise between its open and closed states.

- Improved `Accordion` content open and close animation so items transition using measured content height.

- Added a `disableAnimation` prop to `Accordion` now that it includes a default animation, which may not be applicable in all use-cases.

- Updated `Accordion` to close immediately when reduced motion is preferred.
