---
'@primer/react-brand': minor
---

Added new subcomponents and `variant` prop to the `SectionIntroStacked` component:

- `SectionIntroStacked.Description`
- `SectionIntroStacked.ItemIcon`
- `SectionIntroStacked.ItemHeading`
- `SectionIntroStacked.ItemDescription`

Heading and link sizes have also been updated. New `variant` prop supports `default` and `gridline` options.

```jsx
<SectionIntroStacked variant="gridline">
  <SectionIntroStacked.Heading>Section heading</SectionIntroStacked.Heading>
  <SectionIntroStacked.Description>A short description.</SectionIntroStacked.Description>
  <SectionIntroStacked.Link href="#">Learn more</SectionIntroStacked.Link>
  <SectionIntroStacked.Items>
    <SectionIntroStacked.Item>
      <SectionIntroStacked.ItemIcon icon={CpuIcon} />
      <SectionIntroStacked.ItemHeading>Feature one</SectionIntroStacked.ItemHeading>
      <SectionIntroStacked.ItemDescription>Description of this feature.</SectionIntroStacked.ItemDescription>
    </SectionIntroStacked.Item>
  </SectionIntroStacked.Items>
</SectionIntroStacked>
```
