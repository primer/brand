---
'@primer/react-brand': patch
---

Added `onNarrowMenuToggle` prop to `SubdomainNavBar`. When the mobile menu is opened or closed, the provided `onNarrowMenuToggle` callback is called with the new open state.

This prop can be used to ensure the main content area is hidden from assistive technologies when the mobile menu is open.
