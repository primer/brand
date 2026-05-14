---
'@primer/react-brand': patch
---

Added `imageBackgroundColor` support to `RiverAccordion.Visual` for full-bleed visual backgrounds in the gridline variant.

```tsx
<RiverAccordion variant="gridline">
  <RiverAccordion.Item>
    <RiverAccordion.Heading>Heading</RiverAccordion.Heading>
    <RiverAccordion.Content>Content</RiverAccordion.Content>
    <RiverAccordion.Visual imageBackgroundColor="subtle">
      <img src="example.png" alt="Example visual" />
    </RiverAccordion.Visual>
  </RiverAccordion.Item>
</RiverAccordion>
```
