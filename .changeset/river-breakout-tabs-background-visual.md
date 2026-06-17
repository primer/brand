---
'@primer/react-brand': minor
---

Added a `backgroundVisual` prop to `RiverBreakoutTabs` for rendering a decorative background component. The background persists across tab changes.

Also added an `imagePosition` prop to inset and align the media over the `backgroundVisual`.

Also added a `backgroundVisualWidth` prop to render the `backgroundVisual` contained or full-bleed to the gridline edges.

Non-full-bleed backgrounds are now inset from the top gridline to match the side spacing — only `backgroundVisualWidth="full-bleed"` reaches the gridline edges. This also applies to `imageBackgroundColor="subtle"` visuals, which previously bled to the top gridline.

```tsx
<RiverBreakoutTabs backgroundVisual={<MyCustomBackground />} imagePosition="block-end">
  <RiverBreakoutTabs.A11yHeading>Workflows</RiverBreakoutTabs.A11yHeading>
  {/* ...items... */}
</RiverBreakoutTabs>
```
