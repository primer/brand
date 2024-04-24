---
'@primer/react-brand': patch
---

Added support for optional `Button` and sub menu's in `SubNav` component.

Also added `fullWidth` prop to optionally remove the default component padding.

```jsx
<SubNav>
  <SubNav.Heading href="#">Heading</SubNav.Heading>
  <SubNav.Link href="#">Link</SubNav.Link>
  <SubNav.Link href="#">Link</SubNav.Link>
  <SubNav.Link href="#">Link</SubNav.Link>
  <SubNav.Link href="#" aria-current="page">
    Link
    <SubNav.SubMenu>
      <SubNav.Link href="#">Link feature one</SubNav.Link>
      <SubNav.Link href="#">Link feature two</SubNav.Link>
      <SubNav.Link href="#">Link feature three</SubNav.Link>
      <SubNav.Link href="#">Link feature four</SubNav.Link>
    </SubNav.SubMenu>
  </SubNav.Link>
  <SubNav.Link href="#">Link</SubNav.Link>
  <SubNav.Link href="#">Link</SubNav.Link>
  <SubNav.Action href="#" variant="secondary">
    Optional CTA
  </SubNav.Action>
</SubNav>
```
