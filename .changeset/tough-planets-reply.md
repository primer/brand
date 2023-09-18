---
'@primer/react-brand': patch
---

Add `0` option to Box spacing props to reset defined paddings at larger viewports.

```
<Box padding={{
    narrow: 24,
    wide: 0 // <-- this will remove padding at the wide viewport
}} />
```
