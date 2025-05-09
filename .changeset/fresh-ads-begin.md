---
'@primer/react-brand': patch
---

Add support for deeper link nesting in `SubNav`

Use `SubNav.SubHeading` to present another tier of content between the `SubNav.Heading` and `SubNav.Link` sub-components.

Usage example:

```jsx
<SubNav>
  <SubNav.Heading href="#">Top-level page</SubNav.Heading>
  <SubNav.SubHeading href="#">Sub-level page</SubNav.SubHeading>
  <SubNav.Link href="#">Child page</SubNav.Link>
  <SubNav.Link href="#">Child page</SubNav.Link>
  <SubNav.Link href="#">Child page</SubNav.Link>
  <SubNav.Link href="#">Child page</SubNav.Link>
</SubNav>
```
