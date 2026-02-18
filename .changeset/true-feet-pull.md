---
'@primer/react-brand': patch
---

Fixed circular dependency import issues in `River` that led to runtime errors in some bundlers.

Applies to `River`, `RiverBreakout`, `Heading` and `Text`. These now import directly from the component files rather than the root export file.
