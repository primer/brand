---
'@primer/react-brand': minor
'@primer/brand-css': minor
---

Improves `PricingOptions` layouts across desktop, tablet, and mobile:

- Renders labels inside their corresponding items.
- Highlights only items with labels.
- Refines borders, dividers, and spacing across pricing layouts.
- Adds `hasGridLines` to continue the outer side borders through the label row in gridline layouts.
- **Breaking:** Removes `PricingOptions.testIds.labelRow` because the shared wrapper for all labels no longer exists. Use `PricingOptions.testIds.label` within the corresponding item instead.
- **Breaking for `@primer/brand-css` consumers:** Move each label cell inside its corresponding `.PricingOptions__item`. The shared `.PricingOptions__labels` wrapper is no longer rendered.
