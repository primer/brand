---
'@primer/react-brand': patch
---

Added secondary action support to anchor nav.

When two actions are present, the first action becomes a primary button variant.

```jsx
<AnchorNav>
  {/* ... */}
  <AnchorNav.Action href="#">Get started</AnchorNav.Action>
  <AnchorNav.SecondaryAction href="#">Compare plans</AnchorNav.SecondaryAction>
</AnchorNav>
```
