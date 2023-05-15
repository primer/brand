---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

Changes `Green-blue` and `Red-orange` variants in `Label` colors for improved color contrast:

```diff
- --base-color-scale-green-4
- --base-color-scale-red-4
+ --base-color-scale-green-5
+ --base-color-scale-red-5
```

Adds high contrast mode support for `Label`
