---
'@primer/react-brand': minor
---

Improved typographic defaults for all `Text` and `Heading` instances.

> [!WARNING]  
> This release contains various breaking changes.
> Review these notes carefully and validate the updated typography in your project before upgrading.

- `Text` and `Heading` components now apply a default `font-weight` range between `410` and `525`. This leads to an overall lighter typographic style in practice.
- All `Heading` sizes above `700` are now smaller on the widest viewports. E.g. `display` size is now `64px` instead of `96px`.
- No sizes were removed in this update. `weight` prop will continue to allow overriding as before.
- Replaced `monospace` system font with our proprietary Mona Sans Mono typeface for a consistent fixed width character set across OS's
- ⚠️ Mona Sans font file location has been updated. The typeface has also been updated to the latest pre-release version and includes a new `opsz` axes for built-in optically-sized glyphs.

  If you were previously importing the font file directly from the package, please note its new location:

  ```diff
  - @primer/react-brand/fonts/MonaSans.woff2
  + @primer/react-brand/fonts/MonaSansVF[wdth,wght,opsz].woff2
  ```

Additional components affected by changes to font weights:

- `Button`
- `ComparisonTable`
- `EyebrowBanner`
- `FAQ`
- `FormControl`
- `IDE`
- `Label`
- `Link`
- `SectionIntroStacked`
- `SubNav`
- `SubdomainNavBar`
- `Tabs`
- `Testimonial`
- `River`
- `RiverBreakout`
