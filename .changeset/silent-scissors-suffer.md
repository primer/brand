---
'@primer/brand-primitives': minor
'@primer/react-brand': minor
---

> **Warning**
> This update contains a breaking visual change to the `LogoSuite` component. `LogoSuite` components without a specified `variant` prop will now automatically apply either `emphasis` or `muted` styles depending on the number of logos in the `LogoBar`.

- Added new default behaviour to the `variant` prop of the `LogoSuite` component. If `variant` is `undefined` then either `emphasis` or `muted` styles are automatically applied depending on the number of logos in the `LogoBar`. Five or fewer logos apply the `emphasis` style, while six or more use the `muted` style.
- Reduced `LogoSuite` size on mobile viewports.
