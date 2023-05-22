---
'@primer/brand-e2e': minor
'@primer/react-brand': minor
---

Provides the `Hero` component with a composable API.

Before:

```jsx
<Hero
  heading="This is my super sweet hero heading"
  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  primaryAction={{
    text: 'Primary action',
    href: '#'
  }}
  align="center"
/>
```

After:

```jsx
<Hero>
  <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
  <Hero.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Hero.Description>
  <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
</Hero>
```
