---
'@primer/react-brand': patch
---

- Added new `size` option to `ActionMenu`
- Improved, automatic overlay positioning dependent on the action menu's location in the viewport.

Example:

```jsx
<>
  <ActionMenu size="small">
    <ActionMenu.Button>Small</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="Menu items">
      <ActionMenu.Item value="Item 1">Item 1</ActionMenu.Item>
      <ActionMenu.Item value="Item 2">Item 2</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
  <ActionMenu size="medium">
    <ActionMenu.Button>Medium</ActionMenu.Button>
    <ActionMenu.Overlay aria-label="Menu items">
      <ActionMenu.Item value="Item 1">Item 1</ActionMenu.Item>
      <ActionMenu.Item value="Item 2">Item 2</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
</>
```

🔗 [See the documentation for more examples](https://primer.style/brand/components/ActionMenu#sizes)
