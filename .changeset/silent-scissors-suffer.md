---
'@primer/brand-primitives': minor
'@primer/react-brand': minor
---

⚠️ This update contains a breaking change.

- Added new default behaviour to the `variant` prop of the `LogoSuite` component. If `variant` is not provided then either `emphasis` or `muted` styles are automatically applied depending on the number of logos in the suite. 5 or fewer uses `emphasis`, 6 or more uses `muted`.
- Reduced `LogoSuite` size on mobile viewports.
