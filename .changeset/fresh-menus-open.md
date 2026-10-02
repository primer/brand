---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

Added icon-only options `ActionMenu`.

These new options use the new `IconButton` component internally.

```jsx
<ActionMenu mode="split-button">
  <ActionMenu.IconButton as="a" href="#repository" icon={MarkGithubIcon} aria-label="Open repository" />
  <ActionMenu.Overlay aria-label="Repository actions">
    <ActionMenu.Item as="a" href="#issues">
      Issues
    </ActionMenu.Item>
  </ActionMenu.Overlay>
</ActionMenu>
```

🔗 [See `ActionMenu` documentation for more usage examples](https://primer.style/brand/components/ActionMenu#icon-button-trigger)
