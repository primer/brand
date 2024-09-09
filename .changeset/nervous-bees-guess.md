---
'@primer/react-brand': patch
---

Added support for `<b>` elements to `Bento`, `RiverBreakout`, `SectionIntro`, `Timeline`, and `Testimonial` components, as `<em>` is semantically interpreted by screen readers for emphasis, while `<b>` allows duo-tone text to function purely as a visual decoration.

Usage example:

```jsx
<SectionIntro>
  <SectionIntro.Heading>
    <b>Expressive headline</b> about an exclusive set of features.
  </SectionIntro.Heading>
</SectionIntro>
```

> **Warning**
> The updated components still support the use of `<em>` elements for backward compatibility, but moving forward, the only recommended element for emphasized text is `<b>`.
