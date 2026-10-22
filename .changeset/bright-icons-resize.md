---
'@primer/react-brand': patch
'@primer/brand-primitives': patch
---

Updated `IconButton` sizing and icon colors.

- `size` now supports arbitrary `number` values for granular control. Icon sizes scale automatically with the size of the button.

```jsx
<IconButton icon={SearchIcon} aria-label="Search" size={80} />
```

- `secondary`, `subtle`, and `invisible` variants now use muted icon colors by default for a softer visual appearance.

  You can customize the color or revert to the previous color by overriding the new, dedicated CSS variables:

```jsx
<IconButton
  icon={SearchIcon}
  aria-label="Search"
  variant="secondary"
  style={{'--brand-IconButton-secondary-fgColor': 'var(--brand-color-text-default)'}}
/>
```

🔗 [See `IconButton` documentation for more usage examples](https://primer.style/brand/components/IconButton/react)
