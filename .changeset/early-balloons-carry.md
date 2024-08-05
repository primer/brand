---
'@primer/react-brand': minor
---

Refactored Image component and simplified its API.

- Removed the `as`, `media`, and `sources` props, as well code paths which render a `<picture>` element. To use a `<picture>` element with the updated `Image` component, wrap the `Image` with a `picture` element, for example:

```jsx
<picture>
  <source srcSet="..." media="..." />
  <Image src="..." alt="..." />
</picture>
```

- Fixed an edge case with the border radius of the `Card.Image` component. It was previously possible for the div that wraps the image and the image itself to have different border radii.
