---
'@primer/react-brand': patch
---

Increase specificity of custom fill styles in `PricingOptions.FeatureListItem` and `UnorderedList.Item`. This update ensures that the value of `leadingVisualFill` takes a higher precedence over rules that might otherwise override it.
