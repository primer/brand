---
'@primer/react-brand': patch
---

Added new `fullWidth` prop to `Card` component for easier placement in narrow viewports. This elimates the requirement for end-users to author additional custom CSS to achieve the same effect.

```jsx
<Card fullWidth href="https://github.com">
  <Card.Image />
  <Card.Heading />
  <Card.Description />
</Card>
```
