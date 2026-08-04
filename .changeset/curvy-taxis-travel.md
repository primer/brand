---
'@primer/react-brand': patch
---

Added configurable `Card.Image` padding, which allows for full-bleed images to be displayed.

Example:

```jsx
<Card hasBorder>
  <Card.Image padding="none" {...rest} />
</Card>
```
