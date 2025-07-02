---
'@primer/react-brand': patch
---

Fixed an issue where passing a functional ref to `Checkbox` or `Radio` components would prevent clicks from toggling the checked state. These components now correctly support both `RefObject` and callback refs.
