---
'@primer/brand-primitives': minor
---

Token updates for SubdomainNavBar and ComparisonTable

- Fixed incorrect token name in SubdomainNavBar

  ```diff
  - --brand-SubdomainNavBar-fg-overflow-default: var(--brand-color-fg-default);
  + --brand-SubdomainNavBar-fg-overflow-default: var(--brand-color-text-default);
  ```

- Added new token for customizing the featured gradiend in ComparisonTable

  ```diff
  + --brand-ComparisonTable-featured-color-start;
  + --brand-ComparisonTable-featured-color-end;
  ```
