---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Updates to `Testimonial` component:

- Adds `Testimonial.testIds`
- Refines TypeScript ref types for the root, quote, and name.
- Forwards avatar refs to the image and link refs to the anchor.
- Forwards HTML attributes, styles, and event handlers from `Testimonial.Quote` and `Testimonial.Name`.
- Supports SVG logo children alongside image logos.
- `Testimonial.Link` refs now use `HTMLAnchorElement` instead of `HTMLElement`
- Localizes Storybook example text and accessible labels while preserving custom Playground text.
- Adds responsive tokens for custom expressive typography and layout values without changing the design.
