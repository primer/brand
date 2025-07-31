---
'@primer/react-brand': patch
---

Fixed layout shift caused by the `AnchorNav` component in a sticky state. Previously the `AnchorNav` would remove its computed height from the underlying page, whereas that lost space is now compensated for to create a smoother scrolling experience.
