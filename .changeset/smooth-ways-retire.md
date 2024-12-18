---
'@primer/react-brand': minor
---

Added a new `FrostedGlassVFX` component for applying a frosted glass-effect texture to nested components.

⚠️ This is an experimental component, and not tested for compatibility with other Primer Brand components.

When using this component, ensure there is sufficient contrast between the foreground text and the background imagery, as the frosted glass effect can significantly reduce legibility.

Usage example:

```jsx
<FrostedGlassVFX>
  <Testimonial variant="default">
    <Testimonial.Quote>
      GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line
      of code we&apos;re writing.
    </Testimonial.Quote>
    <Testimonial.Name />
    <Testimonial.Avatar />
  </Testimonial>
</FrostedGlassVFX>
```

🔗 (See Storybook for an example)[https://primer.style/brand/storybook/?path=/story/components-testimonial-examples--with-frosted-glass]
