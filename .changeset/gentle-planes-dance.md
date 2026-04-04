---
'@primer/react-brand': minor
---

Add `expressive` variant to `Testimonial` which provides a two-column layout, a new `Testimonial.Link` subcomponent, and updated typographic styles.

```jsx
<Testimonial variant="expressive">
  <Testimonial.Quote>
    GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line
    of code we're writing.
  </Testimonial.Quote>
  <Testimonial.Link href="/case-study">Read the full story</Testimonial.Link>
  <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
  <Testimonial.Avatar src="/avatars/david-ross.png" alt="David Ross avatar" />
</Testimonial>
```
