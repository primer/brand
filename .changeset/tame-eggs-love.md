---
'@primer/react-brand': patch
---

Added `position` prop to `Card.Image`

- New `block-end` position option to place the image below content

  ```jsx
  <Card>
    <Card.Image src="/image.png" position="block-end" /> // Allows image to appear at the bottom of the card.
    <Card.Heading>Title</Card.Heading>
  </Card>
  ```

- Fixed layout issue when combining `align="center"` with `position="block-end"`
