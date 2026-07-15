---
'@primer/react-brand': minor
---

Multiple `ActionMenu` component updates:

- Calls consumer-provided `onClick` handlers in default and split-button modes.
- ⚠️ Breaking change to `ActionMenu.Button` in split-button mode. Custom HTML attributes are now correctly forwarded to the primary action instead of the menu toggle. This was the originally intended behavior.
- Forwards the `variant` prop in `default` mode correctly. `ActionMenu` can now render in all available `Button` variants.
- Forwards the `leadingVisual` prop in `default` mode.
