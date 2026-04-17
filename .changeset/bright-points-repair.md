---
'@primer/react-brand': patch
---

Fixed `SubNav` accessibility issue where dropdown submenus on large viewports could contain focusable links while marked `aria-hidden`. The collapsed submenu is now made `inert`, removing it from tab order and the accessibility tree without affecting layout or the open/close transition.
