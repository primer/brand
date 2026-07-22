---
'@primer/react-brand': patch
---

Fixed missing form-control color tokens in the ESM build. `TextInput`, `Textarea`, `Select`, `Checkbox`, `Radio`, and `FormControl` now bundle the `--brand-control-*` color tokens directly, so their borders and boxes render correctly for consumers that import from `@primer/react-brand/esm` without also loading the global `@primer/react-brand/lib/css/main.css` stylesheet.

Previously these tokens only reached CSS through a shared side-effect import in the forms barrel (`forms/index.ts`), which the ESM build drops. On ESM-only pages this left `var(--brand-control-*)` undefined, collapsing control borders (and rendering checkboxes and radios invisible). This affected the `0.70.0` and `0.71.0` releases; consumers using `@primer/react-brand/esm` should upgrade to this release.
