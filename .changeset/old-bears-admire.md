---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

Remove the hover text-decoration transition in `InlineLink`, `Accordion`, `Timeline` and align `Prose` with the updated `InlineLink` styles

In case you were using `var(--brand-InlineLink-transition-timing)` variable please migrate to `var(--brand-animation-duration-fast)`

```diff
- var(--brand-InlineLink-transition-timing)
+ var(--brand-animation-duration-fast)
```
