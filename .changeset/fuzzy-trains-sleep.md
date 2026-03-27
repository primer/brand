---
'@primer/react-brand': minor
---

Added new subcomponents to `SectionIntroStacked`: `Description`, and a redesigned item structure supporting `ItemIcon`, `ItemHeading`, and `ItemDescription`. Updated default heading and link sizes.

```jsx
<SectionIntroStacked>
  <SectionIntroStacked.Heading>Section heading</SectionIntroStacked.Heading>
  <SectionIntroStacked.Description>A short description of the section.</SectionIntroStacked.Description>
  <SectionIntroStacked.Link href="#">Learn more</SectionIntroStacked.Link>
  <SectionIntroStacked.Items>
    <SectionIntroStacked.Item>
      <SectionIntroStacked.ItemIcon icon={CpuIcon} />
      <SectionIntroStacked.ItemHeading>Feature one</SectionIntroStacked.ItemHeading>
      <SectionIntroStacked.ItemDescription>A brief description of this feature.</SectionIntroStacked.ItemDescription>
    </SectionIntroStacked.Item>
    <SectionIntroStacked.Item>
      <SectionIntroStacked.ItemIcon icon={ZapIcon} />
      <SectionIntroStacked.ItemHeading>Feature two</SectionIntroStacked.ItemHeading>
      <SectionIntroStacked.ItemDescription>A brief description of this feature.</SectionIntroStacked.ItemDescription>
    </SectionIntroStacked.Item>
  </SectionIntroStacked.Items>
</SectionIntroStacked>
```
