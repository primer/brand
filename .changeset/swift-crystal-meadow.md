---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

Updated all base color scales and functional tokens.

#### Design token updates

- Updated all 13 base color scale palettes (`gray`, `blue`, `green`, `yellow`, `orange`, `red`, `purple`, `pink`, `coral`, `lemon`, `lime`, `teal`, `indigo`) in both light and dark modes
- Updated `black-0` from `#1f2328` to `#000000`
- Updated semantic tokens: `text.default`, `text.muted`, `border.default`, `border.subtle`, `border.muted`, `success.fg`, `success.emphasis`, `accent.primary`, and all hardcoded alpha tokens (`success.muted`, `error.muted`, `neutral.muted`, `neutral.subtle`)
- Added new semantic tokens: `text.emphasized`, `text.link`, `text.error`, `canvas.muted`
- ⚠️ Deprecated `text.subtle`, which is now remapped to the same value as `text.muted` and will be removed in the future
- Updated `InlineLink.color.rest` and `Link.color.accent` to reference the new `text.link` semantic token
