---
'@primer/react-brand': patch
---

Added support for `Image` in the `Card` component. The new `Card.Image` child is optional, and can be used alongside a `Card.Label`. Image aspect ratio can be controlled using the `aspectRatio` prop.

```jsx
<Card href="https://github.com">
  <Card.Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" aspectRatio="16:9" alt=" "/>
  <Card.Heading>Code search & code view</Card.Heading>
  <Card.Description>
    Enables you to rapidly search, navigate, and understand code, right from
    GitHub.com.
  </Card.Description>
```
