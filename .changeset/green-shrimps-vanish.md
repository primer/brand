---
'@primer/react-brand': patch
---

Added `hideUntilSticky` option to AnchorNav component. This will visibly hide the `AnchorNav` until it becomes sticky.

```jsx
<AnchorNav hideUntilSticky>
  <AnchorNav.Link href="#section">...</AnchorNav.Link>
</AnchorNav>
```

For any additional client-side customization, a `data-sticky` attribute is available and will be set to `true` when the `AnchorNav` is sticky.
