---
'@primer/react-brand': patch
---

Added `fullWidth` prop to `Pillar`. When set, the component removes its default `max-width` constraint so it can fill the available container width.

```tsx
<Pillar fullWidth>
  <Pillar.Heading>Heading</Pillar.Heading>
  <Pillar.Description>Description</Pillar.Description>
</Pillar>
```
