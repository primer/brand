---
'@primer/react-brand': patch
---

Fixed page layout shift caused by the `AnchorNav` component in a sticky state.

Previously the `AnchorNav` would remove its computed height from the underlying page in sticky state. Now that lost space is compensated for to create a smoother scrolling experience.
