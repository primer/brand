---
'@primer/brand-primitives': minor
---

Added a stylelint color allowlist export at `lib/design-tokens/styleLint/colors.json`.

This one-dimensional JSON file lists every brand color custom property keyed by its CSS variable name (including the leading `--`), each annotated with `$type: "color"`. It gives stylelint plugins (and other tooling) an authoritative, type-aware allowlist of brand color tokens — mirroring the `@primer/primitives` `dist/styleLint/*.json` exports — so consumers can validate color values against brand tokens without relying on brittle name or path heuristics.
