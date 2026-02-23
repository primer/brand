---
'@primer/react-brand': patch
---

Add duo tone visual style to `Hero.Heading`. Emphasized text now defaults to using the `--brand-color-accent-primary` color and normalizes the browsers default typography styles.

```jsx
<Hero>
  <Hero.Heading>
    Project planning <em>for developers</em>
  </Hero.Heading>
</Hero>
```
