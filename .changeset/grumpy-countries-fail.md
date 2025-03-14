---
'@primer/react-brand': patch
---

Fixed a bug in Safari where an `Icon` component with `hasBackground={true}` would cut off the corners of the rendered SVG. To resolve this the `Icon` component now wraps the rendered SVG in a div.
