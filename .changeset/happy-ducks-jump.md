---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

Partial revert of changes to the `LogoSuite` logobar elements.

To allow optimal treatment of logos based on their respective file formats, `<img>` tag will continue be styled with a CSS filter, whereas inline `<svg>` elements will be styled with CSS fill.
