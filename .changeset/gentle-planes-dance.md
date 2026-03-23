---
'@primer/react-brand': minor
---

Add `layout` prop to `Testimonial` which provides a new `wide` two column variant.

```jsx
<Testimonial layout="wide">
  <Testimonial.Quote>
    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line
    of code we're writing.
  </Testimonial.Quote>
  <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
  <Testimonial.Logo>
    <img alt="GitHub Logo" src="/logos/github.png" width={60} />
  </Testimonial.Logo>
</Testimonial>
```
