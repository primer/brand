---
'@primer/react-brand': patch
---

Fixed `SubdomainNavBar` to preserve the original ordering of actions in JSX, allowing more flexibility in CTA placement.

```jsx
<SubdomainNavBar title="Subdomain">
  <SubdomainNavBar.Link />
  <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
  {/* Primary actions can now render at the end */}
  <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
</SubdomainNavBar>
```
