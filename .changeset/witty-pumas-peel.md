---
'@primer/react-brand': minor
---

Improves `PricingOptions` layouts across desktop, tablet, and mobile:

- Renders labels inside their corresponding items.
- Highlights only items with labels.
- Corrects spacing and borders between stacked items.
- **Breaking:** Removes `PricingOptions.testIds.labelRow`. Use `PricingOptions.testIds.label` within the corresponding item instead.
