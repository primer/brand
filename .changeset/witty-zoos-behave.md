---
'@primer/react-brand': minor
---

The torchlight visual effect on dark mode `Card` components is now optional. The new default effect is now similar to its `light` mode counterpart.

To re-enable the torchlight effect, use `variant="torchlight"`. Note this effect continues to only work in `dark` color modes.

```jsx
<ThemeProvider colorMode="dark">
  <Card variant="torchlight" />
</ThemeProvider>
```
