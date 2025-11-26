---
'@primer/react-brand': minor
---

Improved support for React v19.

All components now have improved support for React v19 type signatures, in addition to continued backwards compatibility with React v18.

As part of this change, the following has changed:

- Refs as props are now handled correctly in `FAQGroup`, `ActionMenu`, `Bento`, `Button`/`ButtonGroup`, and other compound components.
- Removed internal type casting on various components. This ensures that props are inferred correctly using the new JSX runtime in React v19.
- Removed internal dependency on `react-is` for `Fragment` detection

No changes to component behavior or presentation is expected as part of this change.
