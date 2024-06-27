---
'@primer/react-brand': minor
---

Refactored Image component and simplified its API.

- Removed the (mostly non-functional) `aspectRatio` prop. Use the standard `aspect-ratio` CSS property going forward, or the `--brand-image-aspectRatio` CSS custom property.
- Removed the `as`, `media`, and `sources` props, as well code paths which render a `<picture>` element. To use a `<picture>` element with the updated `Image` component, simply wrap the `Image` with a `picture` element, for example:

```jsx
<picture>
  <source srcSet="..." media="..." />
  <Image src="..." alt="..." />
</picture>
```

- Fixed the aspect ratio of images on the category page. They now respect the 16/9 aspect ratio that is set on the card.
- Fixed an edge case with the border radius of the `Card.Image` component. It was previously possible for the div that wraps the image and the image itself to have different border radii.
