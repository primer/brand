---
'@primer/react-brand': minor
---

Improves `PricingOptions` layouts across desktop, tablet, and mobile:

- Renders labels inside their corresponding items.
- Highlights only items with labels.
- Corrects spacing and borders between stacked items.
- Uses solid borders in the default layout with the gradient appearance.
- Adds a full-width divider above `PricingOptions.Footnote`.
- Adds `hasGridLines` to continue the outer side borders through the label row in gridline layouts.
- **Breaking:** Removes `PricingOptions.testIds.labelRow` because the shared wrapper for all labels no longer exists. Use `PricingOptions.testIds.label` within the corresponding item instead.
