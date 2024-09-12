---
"@primer/brand-primitives": patch
---

Fixed line formatting in `functional/size/size-coarse.css` and `functional/size/size-fine.css`

E.g.

```diff
-    @media (pointer: coarse) { :root {
-  --brand-controlStack-medium-gap-auto: var(--base-size-12);
-  --brand-controlStack-small-gap-auto: var(--base-size-16);
-  --brand-control-minTarget-auto: var(--base-size-44);
-}}
+@media (pointer: coarse) {
+  :root {
+    --brand-controlStack-medium-gap-auto: var(--base-size-12);
+    --brand-controlStack-small-gap-auto: var(--base-size-16);
+    --brand-control-minTarget-auto: var(--base-size-44);
+  }
+}
```
