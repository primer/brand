---
'@primer/react-brand': minor
---

Updated `CTABanner` with new features and better defaults.

- Added `CTABanner.Logo` for displaying custom logos.

  ```tsx
  <CTABanner>
    <CTABanner.Logo>
      <svg role="img" viewBox="0 0 45 16">
        <title>GitHub</title>
        <path d="..." />
      </svg>
    </CTABanner.Logo>
  </CTABanner>
  ```

- Added `CTABanner.Link` for rendering a secondary call-to-action as a text link.

  ```tsx
  <CTABanner>
    <CTABanner.Link href="#">Read the customer story</CTABanner.Link>
  </CTABanner>
  ```

- `CTABanner.Heading` now automatically renders at visual size `'6'` in the `minimal` variant when no `size` prop is provided.

- `CTABanner.Image` now accepts all native `<img>` HTML attributes.

🔗 [See the documentation for more usage examples](https://primer.style/brand/components/CTABanner)
