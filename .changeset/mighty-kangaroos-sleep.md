---
'@primer/brand-primitives': patch
---

Removes old control border radius tokens

```diff
-  --brand-control-border-radius
-  --brand-control-large-borderRadius
-  --brand-control-medium-borderRadius
```

Modifies border radius scale values and adds new `xlarge` border radius option to the scale

```diff
+ --brand-borderRadius-small: 4px
+ --brand-borderRadius-medium: 8px
+ --brand-borderRadius-large: 16px
+ --brand-borderRadius-xlarge: 24px
```
