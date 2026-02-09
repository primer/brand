---
'@primer/react-brand': minor
---

Added presentational updates to the `LogoSuite` component.

#### New features

- **New `gridline-expressive` variant**

  ```jsx
  <LogoSuite variant="gridline-expressive">
    <LogoSuite.Heading>New GridLine variant</LogoSuite.Heading>
    <LogoSuite.Logobar>{/* logos */}</LogoSuite.Logobar>
  </LogoSuite>
  ```

  :link: [Storybook example](https://primer.style/brand/storybook?path=/story/components-logosuite-features--grid-line-expressive)

- **New `takeoverButton` prop on `LogoSuite.Logobar`**

  ```jsx
  <LogoSuite.Logobar takeoverButton={{label: 'Learn more', href: '/customers'}}>{/* logos */}</LogoSuite.Logobar>
  ```

  :link: [Storybook example](https://primer.style/brand/storybook?path=/story/components-logosuite-features--takeover-button)

#### Accessibility improvements

- `marquee` feature starts paused when `prefers-reduced-motion: reduce` is enabled
- `marquee` feature pauses on focus and scrolls focused element into view
- `marquee` logos that are duplicated internally are now marked as `inert`
