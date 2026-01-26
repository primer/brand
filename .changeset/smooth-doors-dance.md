---
'@primer/react-brand': minor
---

Renamed font files to replace square brackets with hyphens for better URL compatibility

⚠️ **Breaking change**: Font file names have changed. If you are importing font files directly, update your imports:

```diff
- @primer/react-brand/fonts/MonaSansVF[wdth,wght,opsz].woff2
+ @primer/react-brand/fonts/MonaSansVF-wdth,wght,opsz.woff2

- @primer/react-brand/fonts/MonaSansMonoVF[wght].woff2
+ @primer/react-brand/fonts/MonaSansMonoVF-wght.woff2
```
