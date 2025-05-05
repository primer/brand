---
'@primer/react-brand': patch
---

⚠️ Breaking changes

The `PricingOptions.FeatureListHeading` component has been renamed to `PricingOptions.FeatureListGroupHeading`. `PricingOptions.FeatureListHeading` is now used to optionally customize the heading of the `PricingOptions` feature list accordion.

E.g.,

```jsx
<PricinOptions>
  <PricingOptions.FeatureList>
    <PricingOptions.FeatureListHeading>My custom title</PricingOptions.FeatureListHeading>
    <PricingOptions.FeatureListGroupHeading>Feature set 1</PricingOptions.FeatureListGroupHeading>
    <PricingOptions.FeatureListItem>Feature A</PricingOptions.FeatureListItem>
    <PricingOptions.FeatureListItem>Feature B</PricingOptions.FeatureListItem>
    <PricingOptions.FeatureListItem>Feature C</PricingOptions.FeatureListItem>
  </PricingOptions.FeatureList>
</PricinOptions>
```
