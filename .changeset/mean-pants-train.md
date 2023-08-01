---
'@primer/react-brand': patch
---

Add optional foreground image support to Hero

Use `imagePosition` to alternate between various layouts.

```jsx
<>
  <Hero>
    <Hero.Heading>Automate your workflow from idea to production</Hero.Heading>
    <Hero.Image
      src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
      alt="placeholder, blank area with an off-white background color"
    />
  </Hero>
  <br />
  <Hero>
    <Hero.Heading>Automate your workflow from idea to production</Hero.Heading>
    <Hero.Image
      imagePosition="inline-end"
      src="https://via.placeholder.com/300x450/d3d9df/d3d9df.png"
      alt="placeholder, blank area with an off-white background color"
    />
  </Hero>
</>
```
