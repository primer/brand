---
'@primer/react-brand': minor
'@primer/brand-css': patch
---

Improves `PricingOptions` layouts across desktop, tablet, and mobile:

- Renders labels inside their corresponding items.
- Highlights only items with labels.
- Removes duplicate borders on stacked items and balances spacing around prices, collapsed feature lists, and mobile footnotes.
- Aligns the top border with the first row when no plan has a label.
- Uses solid borders in the default layout with the gradient appearance.
- Adds a full-width divider above `PricingOptions.Footnote`.
- Adds `hasGridLines` to continue the outer side borders through the label row in gridline layouts.
- Removes the background and borders from `PricingOptions.ActionsMessage` and updates its spacing. Use `<Text as="p" size="200" variant="muted">` for the message.
- **Breaking:** Removes `PricingOptions.testIds.labelRow` because the shared wrapper for all labels no longer exists. Use `PricingOptions.testIds.label` within the corresponding item instead.
