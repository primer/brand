---
'@primer/react-brand': patch
---

- Remove 100vw width from `SubdomainNavBar.Search` component, as it was causing visual overflow on narrow viewports.

- Applies `position: relative` to non-fixed `SubdomainNavBar` container to properly contain `absolute` children.
