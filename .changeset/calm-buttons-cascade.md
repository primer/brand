---
'@primer/react-brand': patch
---

Reduced the `Button` components hover and active selector specificity so that custom styles and components that depend on the `Button` can correctly override their values.
