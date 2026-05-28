---
'@primer/react-brand': patch
---

Updated the RiverAccordion gridline variant to include full-bleed visual backgrounds by default. Override `--brand-RiverAccordion-visual-background` to customize the visual background with a color, gradient, or image.

```tsx
<RiverAccordion variant="gridline">
  <RiverAccordion.Item>
    <RiverAccordion.Heading>Heading</RiverAccordion.Heading>
    <RiverAccordion.Content>Content</RiverAccordion.Content>
    <RiverAccordion.Visual>
      <img src="example.png" alt="Example visual" />
    </RiverAccordion.Visual>
  </RiverAccordion.Item>
</RiverAccordion>
```
