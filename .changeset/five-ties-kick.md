---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
---

New and updated `River` spacing tokens aiming for a responsive logic in both `gap` and `padding` values of the main container.

```diff
# Updated medium/large gap and margin on pro of a responsive logic (Small/Medium/Large sizes) and inner/outer spacing
-  --brand-River-gap-column-medium: var(--base-size-32);
-  --brand-River-gap-column-large: var(--base-size-48);
+  --brand-River-spacing-inner: var(--base-size-24)/var(--base-size-36)/var(--base-size-48);
-  --brand-River-layout-margin-vertical: var(--base-size-24);
+  --brand-River-spacing-outer: var(--base-size-28)/var(--base-size-36)/var(--base-size-48);
# Updated heading margin
-  --brand-River-gap-heading-bottom: var(--base-size-8);
+  --brand-River-heading-margin: var(--base-size-8);
```
