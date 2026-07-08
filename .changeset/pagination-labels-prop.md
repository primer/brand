---
'@primer/react-brand': patch
---

Added a `labels` prop to the `Pagination` component for customizing the user-facing labels of the previous and next controls.

```jsx
<Pagination
  pageCount={10}
  currentPage={2}
  labels={{prev: 'Précédent', next: 'Suivant', prevAriaLabel: 'Page précédente', nextAriaLabel: 'Page suivante'}}
/>
```
