---
'@primer/react-brand': minor
---

Added `SubdomainNavBar` component.

Usage example:

```jsx
<SubdomainNavBar title="Subdomain">
  <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
  <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
  <SubdomainNavBar.Search
    ref={inputRef}
    onSubmit={handleSubmit}
  />
  <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
  <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
</SubdomainNavBar>
```

See the [documentation](https://primer.style/brand/components/SubdomainNavBar) and [Storybook](https://primer.style/brand/storybook/?path=/story/components-subdomainnavbar--playground) for more usage examples.
