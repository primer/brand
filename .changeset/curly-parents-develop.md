---
'@primer/react-brand': patch
---

Added support for `[Octicons](https://primer.style/design/foundations/icons)` in the `Card` component. The new `Card.Icon` child is optional, and can be used alongside a `Card.Label`. Icon color and background can be customized using the `color` and `hasBackground` prop respectively.

```jsx
<Card href="https://github.com">
  <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
  <Card.Heading>Code search & code view</Card.Heading>
  <Card.Description>
    Enables you to rapidly search, navigate, and understand code, right from
    GitHub.com.
  </Card.Description>
```
