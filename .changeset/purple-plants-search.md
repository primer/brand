---
'@primer/react-brand': patch
---

Improved heading level structure in the `FAQ` component.

- Updated default `FAQ.Subheading` heading level from `h3` to `h4`.
- `FAQ.Question` now renders as a `h5` if there is a `FAQ.Subheading` present, or if rendered inside a `FAQGroup`.
- `FAQGroup` now respects all provided `FAQ.Heading` props, not just children.
