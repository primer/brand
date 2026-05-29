---
'@primer/brand-primitives': minor
---

Removed Pagination-specific CSS variables from `@primer/brand-*` packages. Pagination now uses the shared Brand `Button` component styling, so the previous custom token variables are no longer emitted or required:

```diff
- --brand-pagination-link-bgColor-rest
- --brand-pagination-link-bgColor-active
- --brand-pagination-borderColor-hover
```
