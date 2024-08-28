---
'@primer/react-brand': minor
---

Improved a11y labelling in various components.

Please note these changes could affect any behavioral tests, which rely on accessible matchers such as `getByRole`.

- `SubdomainNavBar` search button `aria-label` changed from 'search' to 'Toggle search bar'
- `SubdomainNavBar` removal of unnecessary `aria-label` 'global breadcrumb'
- `Checkbox` addition of new label for `checked` state icon as 'Checkmark'
- `Checkbox` addition of new label for `indeterminate` state icon as 'Dash icon'
