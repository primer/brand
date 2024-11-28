---
'@primer/react-brand': minor
---

Updates to `SubNav` component

- New anchor-based navigation pattern available:

  Use `variant="anchor"` on `SubNav.SubMenu` to apply anchor navigation as an alternative to the default dropdown-based submenu.

  ```jsx
  <SubNav>
    <SubNav.Heading href="#">Heading</SubNav.Heading>
    <SubNav.Link href="#" aria-current="page">
      Link with anchor navigation
      <SubNav.SubMenu variant="anchor">
        <SubNav.Link href="#">Anchor link one</SubNav.Link>
        <SubNav.Link href="#">Anchor link two</SubNav.Link>
        <SubNav.Link href="#">Anchor link three</SubNav.Link>
        <SubNav.Link href="#">Anchor link four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
  </SubNav>
  ```

- Overlay now closes when user clicks outside of it

- Dropdown submenus now appear with white and black background and foreground colors respectively, irrespective of color mode.

- Various other visual updates to improve brand-alignment. These include adjustments to text size, weight, color and iconography.
