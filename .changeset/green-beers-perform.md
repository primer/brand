---
"@primer/react-brand": patch
---

Adds responsive toggling of feature lists in the `PricingOptions` component. 

`PricingOptions.FeatureList` can now be collapsed at regular and wide viewports.

```jsx
<PricingOptions>
  <PricingOptions.Item>
    <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}} />
  </PricingOptions.Item>
</PricingOptions>
```
