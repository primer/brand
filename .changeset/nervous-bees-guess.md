---
'@primer/react-brand': patch
---

Added support for emphasized text using `<b>` elements to Bento, RiverBreakout, SectionIntro, Timeline, and Testimonial components.

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
