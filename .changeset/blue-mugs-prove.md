---
'@primer/react-brand': patch
---

Updates to `PricingOptions` component:

- New center-aligned layout available via `align` prop.
- Added support for 4 pricing options. Previous maximum of 3.
- Removed heading level constraint to `as` prop in `PricingOptions.Heading`. Now accepts all heading levels, while retaining the previous `h3` default.
- Added `accordionAs`prop to `PricingOptions.FeatureList` for granular control over heading size.
- Fixed layout alignment bug when trailing text is not present under price.
- Fixed layout bug when footnote contains an inline link.
