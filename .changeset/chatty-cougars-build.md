---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

Updated custom animation times and easing values across all components to leverage globally available values.

Two new variables have been added to `@primer/brand-primitives`:

- `--brand-animation-duration-fast`
- `--brand-animation-duration-faster`

Example:

```diff
- 0.3s cubic-bezier(0.16, 1, 0.3, 1)
+ var(--brand-animation-duration-fast) var(--brand-animation-easing-default)
```
