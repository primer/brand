---
'@primer/react-brand': patch
'@primer/brand-css': patch
---

- Updated the `Accordion` toggle indicator to animate from a down chevron into an up chevron using decorative CSS bars.

- Improved `Accordion` content open and close animation so items transition using measured content height.

- Added a `disableAnimation` prop to `Accordion` now that it includes a default animation, which may not be applicable in all use-cases.

- Updated `Accordion` to close immediately when reduced motion is preferred.
