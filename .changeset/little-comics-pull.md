---
"@primer/brand-primitives": patch
"@primer/react-brand": patch
---

Replaced the `--brand-VideoPlayer-tooltip-padding` design token in the `VideoPlayer` component with two new tokens that separately account for padding along each axis: `--brand-VideoPlayer-tooltip-padding-inline` and `--brand-VideoPlayer-tooltip-padding-block`.

*Note: This update does not introduce any visual changes. Please update any manual references to `--brand-VideoPlayer-tooltip-padding` to use the new tokens.*

```diff
- --brand-VideoPlayer-tooltip-padding
+ --brand-VideoPlayer-tooltip-padding-inline
+ --brand-VideoPlayer-tooltip-padding-block
```
