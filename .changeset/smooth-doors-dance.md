---
'@primer/react-brand': minor
---

Renamed font files to replace URL-unsafe characters (square brackets and commas) with hyphens

⚠️ **Breaking change**: Font file names have changed. If you are importing font files directly, update your imports:

```diff
- @primer/react-brand/fonts/MonaSansVF[wdth,wght,opsz].woff2
+ @primer/react-brand/fonts/MonaSansVF-wdth-wght-opsz.woff2

- @primer/react-brand/fonts/MonaSansMonoVF[wght].woff2
+ @primer/react-brand/fonts/MonaSansMonoVF-wght.woff2
```
