---
'@primer/react-brand': patch
---

Updated the global reset for `input`, `button`, `textarea`, and `select` elements to inherit only `font-family` instead of the entire `font` shorthand.

```diff
input,
button,
textarea,
select {
-  font: inherit;
+  font-family: inherit;
}
```

⚠️ Controls now retain their existing `font-size`, `font-style`, `font-weight`, `line-height`, and other `font-*` values.

Affected Primer Brand controls preserve their previous typography through component-scoped styles. Consumers that relied on the global reset to inherit these values from a parent must set them explicitly after upgrading.
