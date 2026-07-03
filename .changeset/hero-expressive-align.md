---
'@primer/react-brand': patch
---

Adds a dev-only warning to prevent `center` aligned `Hero` content when `variant="gridline-expressive"`. This should always remain start aligned. We not silently prevent this from happening in the `Hero` component.

The `primer_brand_review` MCP tool also gains an extendable `invalid-prop-combination` rule that flags unsupported pairings like this.
