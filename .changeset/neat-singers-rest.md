---
'@primer/react-brand': patch
---

Internal change to CSS module type definition in `IDE` component.

Active class is now namespaced.

```diff
- .active
+ .IDE__Editor-tab--active
```
