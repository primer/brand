---
'@primer/react-brand': patch
---

Added `hideUntilSticky` option to AnchorNav component. This will hide the `AnchorNav` until it becomes sticky.

```jsx
<AnchorNav hideUntilSticky>
  <AnchorNav.Link href="#section">...</AnchorNav.Link>
</AnchorNav>
```

The component also now uses `position: sticky` instead of `position: fixed` to avoid issues with the `AnchorNav` overlapping the footer and requiring manual offsetting.

For any additional client-side customization, a `data-sticky` attribute is available and will be set to `true` when the `AnchorNav` is sticky.
