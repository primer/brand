---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
'@primer/brand-css': minor
---

Updated `AnchorNav` visual design and improved support for longer content.

Additional changes:

- Links are now centered and use a green underline that slides to the active section.
- `AnchorNav` always has a solid background and no longer shows a shadow when stuck.
- `AnchorNav` now spans the full page like `SubNav`.
- Supports up to nine `AnchorNav.Link` components.
- `AnchorNav.Action` always uses the small button size.
- Added a responsive `brand-AnchorNav-height` design token.
- New `menuLabels` prop to localize the generated labels, including the navigation landmark name. `AnchorNavMenuLabels` is exported from `@primer/react-brand`.
- Fixed `AnchorNav` not becoming sticky when it starts at the very top of the page.

```jsx
<AnchorNav
  menuLabels={{
    activeLabel: 'Menú de navegación de anclaje. Seleccionado actualmente:',
    navigationLabel: 'Navegación de anclaje',
    overflowMenuLabel: 'Más',
  }}
>
  <AnchorNav.Link href="#overview">Descripción general</AnchorNav.Link>
  <AnchorNav.Link href="#pricing">Precios</AnchorNav.Link>
  <AnchorNav.Action href="#">Registrarse</AnchorNav.Action>
</AnchorNav>
```

⚠️ This is a visual and API breaking change. Please manually verify the following updates on your pages.

- Removed `AnchorNav.SecondaryAction`. Only the first `AnchorNav.Action` is now rendered.
- Removed the `alignment` and `isActive` props. The active link is now set automatically as sections scroll into view.
- Removed `enableDefaultBgColor` from `AnchorNav`. A default background color is always applied.
- Removed `size` from `AnchorNav.Action`. `small` is the new default.
