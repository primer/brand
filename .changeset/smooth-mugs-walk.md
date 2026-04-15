---
'@primer/react-brand': minor
---

Major updates to `PricingOptions` with new features, layout fixes, and design refinements.

> [!WARNING]  
> Breaking changes in this release

- `PricingOptions.Label` is no longer a wrapper around the `Label` component. It now renders as plain text in a dedicated header row above the pricing columns. Props like `size` and `color` are no longer supported.

```diff
 <PricingOptions.Item>
-  <PricingOptions.Label size="medium" color="green">Recommended</PricingOptions.Label>
+  <PricingOptions.Label>Recommended</PricingOptions.Label>
   <PricingOptions.Heading>Pro</PricingOptions.Heading>
 </PricingOptions.Item>
```

Other new features:

- **`infoTooltip` prop on `PricingOptions.FeatureListItem`**: Adds an info icon with tooltip. See [usage example](https://primer.style/brand/components/PricingOptions).
- **`PricingOptions.MenuAction` sub-component**: A wrapper for rendering `ActionMenu` inside the actions area. See [With Menu Action story](https://primer.style/brand/storybook?path=/story/components-pricingoptions-features--with-menu-action).
- **`PricingOptions.testIds.menuAction`**: `PricingOptions.MenuAction` now exposes a dedicated default test id instead of sharing `PricingOptions__primaryAction`.
- **`style` prop on `PricingOptions`** can now be forwarded to the `PricingOptions` root element.
