---
'@primer/react-brand': minor
---

Fixes `PricingOptions.Label` so labels are visible on mobile viewports, adds mobile label dividers, and restores the label separators on larger viewports.

This includes a breaking change for consumers relying on the `PricingOptions.testIds.labelRow` test ID, which has been removed because labels now render inside each `PricingOptions.Item` instead of a shared label row.
