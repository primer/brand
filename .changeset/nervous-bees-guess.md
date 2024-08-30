---
'@primer/react-brand': patch
---

Added support for emphasized text using `<span>` elements to Bento, RiverBreakout, SectionIntro, Timeline, and Testimonial components.

Usage example:

```jsx
<SectionIntro>
  <SectionIntro.Heading>
    <span>Expressive headline</span> about an exclusive set of features.
  </SectionIntro.Heading>
</SectionIntro>
```

> **Warning**
> The updated components still support the use of `<em>` elements for backward compatibility, but moving forward, the only recommended element for emphasizing text is `<span>`.
