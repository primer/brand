---
'@primer/react-brand': patch
---

Improved type defintion accuracy for `SubdomainNavBar.PrimaryAction` by forwarding all default props from `HTMLAnchorElement`. This will prevent compiler errors on attributes like `onClick`.
