---
'@primer/react-brand': minor
---

Made the ESM barrel (`@primer/react-brand/esm`) tree-shakeable so consumers only bundle the CSS for the components they actually import, and added granular `./esm/*` subpath exports.

Previously the ESM barrel module was flagged as side-effectful, which forced bundlers to retain every component's co-located CSS even when only a handful of components were imported. Removing the barrel from `sideEffects` — while keeping `**/*.css` and the base `./esm/css/stylesheets.js` side-effectful — lets bundlers prune unused components and their CSS. Importing `ThemeProvider` + `MinimalFooter`, for example, now emits roughly 42&nbsp;KB of CSS instead of the full ~686&nbsp;KB component set. The ~21&nbsp;KB base layer (design tokens, color modes, reset, utilities) is always retained.

The new `./esm/*` export additionally exposes per-component ESM modules and their types (e.g. `@primer/react-brand/esm/Button/Button.js`) for consumers that want an explicit minimal import path. All existing entry points (`.`, `./esm`, `./lib`, `./lib/*`, `./fonts/*`) are unchanged.

Note: consumers that implicitly relied on all Brand CSS being present without importing the corresponding components may need to import those components — or `@primer/react-brand/esm/css/stylesheets.js` (equivalently `@primer/brand-css`) — explicitly.
