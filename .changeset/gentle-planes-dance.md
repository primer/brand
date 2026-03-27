---
'@primer/react-brand': minor
---

Add `layout` prop to `Testimonial` which provides a new `wide` two-column variant, a new `Testimonial.Link` subcomponent, and update typographic styles.

```jsx
<Testimonial layout="wide">
  <Testimonial.Quote>
    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line
    of code we're writing.
  </Testimonial.Quote>
  <Testimonial.Link href="/case-study">Read the full story</Testimonial.Link>
  <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
  <Testimonial.Avatar src="/avatars/david-ross.png" alt="David Ross avatar" />
</Testimonial>
```
