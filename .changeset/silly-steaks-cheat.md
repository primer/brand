---
'@primer/react-brand': minor
---

Updates to `CTABanner` component:

- Default heading size changed from `'1'` to `'3'`.
- `align` default changed from `'start'` to `'center'`.

- A new `variant` prop controls overall layout of the banner. Three variants are available: `default`, `balanced`, and `minimal`.

  ```jsx
  <CTABanner variant="balanced">
    <CTABanner.Heading>Heading</CTABanner.Heading>
    <CTABanner.Description>Description</CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Action</Button>
    </CTABanner.ButtonGroup>
    <CTABanner.Image src="/image.png" alt="description" />
  </CTABanner>
  ```

- **New `CTABanner.Image` sub-component**: Renders an image within the banner. Used in the `balanced` variant for the two-column layout.

- **New `hasGridLines` prop**: Enables `GridLine` borders around the banner, complementary to `hasBorder`.

- **New `leadingComponent` prop**: Escape-hatch for inserting a custom React component above the heading content. Similar to `trailingComponent`

⚠️ Visual breaking change to `CTABanner`:

- `hasShadow` has been marked as `deprecated` and the previous default styles have been removed in this release for better out-of-the-box defaults. In a future release we will remove the prop entirely.
