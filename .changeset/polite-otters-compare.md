---
'@primer/react-brand': patch
---

Improved accessibility of `SubNav` component when no active link — denoted by `aria-current="page"` — is present.

- Hide last separator when there is no active link
- Set a fallback accessible label on the overlay toggle when there is no active link
