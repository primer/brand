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

Primer Brand control components preserve their previous typography through component-scoped styles.

You must set these manually going forward if you previously relied on the `font-*` declarations from the `reset.css`.
