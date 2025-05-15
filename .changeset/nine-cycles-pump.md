---
'@primer/react-brand': patch
---

Accessibility fixes to `Pagination` component

- Fixed a bug where the "..." button was focusable
- Fixed a bug where the "Previous" and "Next" buttons had the role `"link"` instead of `"button"`
- Fixed a bug where the "Previous" and "Next" buttons lost their `aria-label` when disabled
- Internal refactoring
