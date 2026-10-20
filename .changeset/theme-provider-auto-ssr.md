---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Improved `auto` support in `ThemeProvider`

System preferences now render before hydration in SSR contexts.

- ⚠️ `ThemeProvider` with `colorMode="auto"` now passes through `data-color-mode="auto"` instead of resolving to `light` or `dark`.
  Use `colorMode` from `useTheme()` for the resolved value.

- Adds `originalColorMode` to `useTheme` return value to preserve the original mode when forwarding themes.
