---
'@primer/react-brand': patch
---

Add `none` option to Box spacing props to reset defined paddings at larger viewports.

```
<Box padding={{
    narrow: 24,
    wide: 'none' // <-- this will remove padding at the wide viewport
}} />
```
