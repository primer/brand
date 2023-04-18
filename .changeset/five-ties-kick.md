---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

New and updated `River` spacing tokens aiming for a responsive logic in both `gap` and `padding` values of the main container.

```diff
# New small gap
+  --brand-River-small-gap: var(--base-size-24);
# Updated medium/large gap naming
-  --brand-River-gap-column-medium: var(--base-size-32);
+  --brand-River-medium-gap: var(--base-size-32);
-  --brand-River-gap-column-large: var(--base-size-48);
+  --brand-River-large-gap: var(--base-size-48);
# Updated margin to be responsive padding
-  --brand-River-layout-margin-vertical: var(--base-size-24);
+  --brand-River-small-padding: var(--base-size-28);
+  --brand-River-medium-padding: var(--base-size-36);
+  --brand-River-large-padding: var(--base-size-48);
```
