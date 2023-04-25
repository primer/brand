---
'@primer/react-brand': patch
---

Add `Card.Icon` to the `Card` component to allow using `Octicons` along with `Card.Label` and `Card.Heading`. The `Card.Icon` component is optional and has a `hasBackground` prop to add a background color to the icon and a `color` prop to customize the color of the icon.

```jsx
<Card href="https://github.com">
  <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
  <Card.Heading>Code search & code view</Card.Heading>
  <Card.Description>
    Enables you to rapidly search, navigate, and understand code, right from
    GitHub.com.
  </Card.Description>
```
