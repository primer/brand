---
'@primer/react-brand': patch
---

Restore font folder to package root

In `0.5.2` release, the `/fonts` folder was mistakenly placed in `dist/` following the conversion of primer/brand to a monorepo.

This has now been fixed in `0.5.3` by restoring the folder to package root to preserve backwards compatibility.
