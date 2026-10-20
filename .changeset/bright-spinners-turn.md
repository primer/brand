---
'@primer/react-brand': patch
'@primer/brand-primitives': minor
---

Updates to `IconButton`.

- Added support for custom SVG elements.
- **Breaking change:** Renamed CSS variables to reflect newer naming conventions.

Update any custom token overrides if you previously relied on these tokens.

```diff
- --brand-IconButton-loadingIndicator-animationDuration-default
- --brand-IconButton-loadingIndicator-animationDuration-reducedMotion
+ --brand-IconButton-spinner-animationDuration-default
+ --brand-IconButton-spinner-animationDuration-reducedMotion
```
