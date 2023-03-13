---
'@primer/brand-primitives': minor
'@primer/react-brand': minor
---

Added new ActionMenu component

Use `ActionMenu` to display a list of actions or selections that expand through a trigger button.

```jsx
<ActionMenu>
  <ActionMenu.Button>Open menu</ActionMenu.Button>
  <ActionMenu.Overlay>
    <ActionMenu.Item value="Copilot" selected>
      Copilot
    </ActionMenu.Item>
    <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
    <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
  </ActionMenu.Overlay>
</ActionMenu>
```

:link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/ActionMenu)
