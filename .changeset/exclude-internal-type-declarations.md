---
'@primer/react-brand': minor
---

⚠️ Changes to the files listed in the package: `lib/` (UMD) and `esm/` (ESM) bundles now ship a clean, filtered list of React modules and type declarations (everything exported from `index.ts`). Internal-only modules that were never intended for the package like `recipes/` and Storybook test `fixtures/` — are no longer included:

```diff
- @primer/react-brand/esm/recipes/**
- @primer/react-brand/{lib,esm}/**/fixtures/**
- @primer/react-brand/{lib,esm}/**/*.fixtures.d.ts
```
