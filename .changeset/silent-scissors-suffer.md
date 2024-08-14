---
'@primer/brand-primitives': minor
'@primer/react-brand': minor
---

⚠️ This update contains a breaking change.

- Added new `default` variant to `LogoSuite` component which automatically applies `emphasis` or `muted` styles depending on the number of logos in the suite. 5 or fewer uses `emphasis`, 6 or more uses `muted`.
- Reduced `LogoSuite` size on mobile viewports.
- Removed `--brand-LogoSuite-logobar-rowGap` token and replaced it with two new tokens. `--brand-LogoSuite-logobar-rowGap-mobile` is used on mobile viewports, and `--brand-LogoSuite-logobar-rowGap-default` is used on all other viewports.
