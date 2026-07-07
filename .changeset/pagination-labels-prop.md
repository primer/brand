---
'@primer/react-brand': minor
---

Added a `labels` prop to the `Pagination` component for customizing the visible text of the previous and next controls.

```jsx
<Pagination pageCount={10} currentPage={2} labels={{prev: 'Précédent', next: 'Suivant'}} />
```
