---
'@primer/brand-primitives': minor
---

⚠️ Breaking change: Renamed CSS variables associated with the `IconButton` component to reflect newer naming conventions.

Update any custom token overrides if you previously relied on these tokens.

```diff
- --brand-IconButton-loadingIndicator-animationDuration-default
- --brand-IconButton-loadingIndicator-animationDuration-reducedMotion
+ --brand-IconButton-spinner-animationDuration-default
+ --brand-IconButton-spinner-animationDuration-reducedMotion
```
