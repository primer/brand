---
'@primer/react-brand': patch
---

Fixed `Hero.Image` and `Image` layout when `as="picture"` is used. The `className` prop is now applied to the `<picture>` element instead of the inner `<img>`, allowing Hero layout and sizing styles to take effect correctly.

```jsx
<Hero.Image
  as="picture"
  src="image.png"
  sources={[{srcset: 'image-2x.png', media: '(min-width: 600px)'}]}
  alt="Hero image"
/>
```
