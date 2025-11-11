---
'@primer/react-brand': minor
---

Improved typographic defaults for all `Text` and `Heading` instances.

- `Text` and `Heading` components now apply a default `font-weight` range between `410` and `525`. This leads to an overall lighter typographic style in practice.
- All `Heading` sizes above `700` are now smaller on the widest viewports. E.g. `display` size is now `64px` instead of `96px`.
- No sizes were removed in this update. `weight` prop will continue to allow overriding as before.
- Replaced `monospace` system font with our proprietary Mona Sans Mono typeface for a consistent fixed width character set across OS's
