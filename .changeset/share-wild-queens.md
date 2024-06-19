---
'@primer/react-brand': patch
---

Added `pageAttributesBuilder` prop to `Pagination` component to enable forwarding of custom data attributes to paged items.

```jsx live
<Pagination
  pageCount={3}
  currentPage={1}
  pageAttributesBuilder={n => {
    return {
      'data-custom-attribute': `custom-attribute-${n}`,
    }
  }}
/>
```

:link: [See documentation for more details](https://primer.style/brand/components/Pagination#custom-data-attributes)
