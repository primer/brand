---
'@primer/react-brand': minor
---

Updated `SectionIntroStacked` with a new `Description` sub-component and a redesigned `Item` structure supporting `Item.Icon`, `Item.Heading`, and `Item.Description` sub-components. Updated default heading and link sizes.

```jsx
<SectionIntroStacked>
  <SectionIntroStacked.Heading>Section heading</SectionIntroStacked.Heading>
  <SectionIntroStacked.Description>A short description of the section.</SectionIntroStacked.Description>
  <SectionIntroStacked.Link href="#">Learn more</SectionIntroStacked.Link>
  <SectionIntroStacked.Items>
    <SectionIntroStacked.Item>
      <SectionIntroStacked.Item.Icon icon={CpuIcon} />
      <SectionIntroStacked.Item.Heading>Feature one</SectionIntroStacked.Item.Heading>
      <SectionIntroStacked.Item.Description>A brief description of this feature.</SectionIntroStacked.Item.Description>
    </SectionIntroStacked.Item>
    <SectionIntroStacked.Item>
      <SectionIntroStacked.Item.Icon icon={ZapIcon} />
      <SectionIntroStacked.Item.Heading>Feature two</SectionIntroStacked.Item.Heading>
      <SectionIntroStacked.Item.Description>A brief description of this feature.</SectionIntroStacked.Item.Description>
    </SectionIntroStacked.Item>
  </SectionIntroStacked.Items>
</SectionIntroStacked>
```
