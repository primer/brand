---
'@primer/react-brand': minor
---

Added a `backgroundVisual` prop to `RiverBreakoutTabs` for rendering a decorative background component. The background persists across tab changes.

Also added an `imagePosition` prop to inset and align the media over the `backgroundVisual`.

```tsx
<RiverBreakoutTabs backgroundVisual={<MyCustomBackground />} imagePosition="block-end">
  <RiverBreakoutTabs.A11yHeading>Workflows</RiverBreakoutTabs.A11yHeading>
  {/* ...items... */}
</RiverBreakoutTabs>
```
