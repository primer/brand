---
'@primer/react-brand': patch
---

Removed the `Checkbox` and `Radio` components' built-in `<label>` as it was only used for styling and would result in inputs having two associated labels when used inside a `FormControl`.
