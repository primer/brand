---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

Updated all base color scales and functional tokens.

#### Design token updates

- Updated all 13 base color scale palettes (`gray`, `blue`, `green`, `yellow`, `orange`, `red`, `purple`, `pink`, `coral`, `lemon`, `lime`, `teal`, `indigo`) in both light and dark modes
- Updated `black-0` from `#1f2328` to `#000000` in both light and dark modes
- Updated functional design tokens: `--brand-color-text-default`, `--brand-color-text-muted`, `--brand-color-border-default`, `--brand-color-border-subtle`, `--brand-color-border-muted`, `--brand-color-success-fg`, `--brand-color-success-emphasis`, `--brand-color-accent-primary`, and all hardcoded alpha tokens (`--brand-color-success-muted`, `--brand-color-error-muted`, `--brand-color-neutral-muted`, `--brand-color-neutral-subtle`)
- Added new functional design tokens: `--brand-color-text-emphasized`, `--brand-color-text-link-rest`, `--brand-color-text-link-pressed`, `--brand-color-text-error`, `--brand-color-canvas-muted`
- ⚠️ Deprecated `--brand-color-text-subtle`, which is now remapped to the same value as `--brand-color-text-muted` and will be removed in the future
- Updated `--brand-InlineLink-color-rest` and `--brand-InlineLink-color-pressed` to reference the new `--brand-color-text-link-rest` and `--brand-color-text-link-pressed` functional tokens
- Updated `--brand-Link-color-accent` to reference the new `--brand-color-text-link-rest` functional token
