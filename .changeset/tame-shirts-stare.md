---
'@primer/react-brand': patch
---

`ActionMenu` bugfixes:

- Fixed a bug in `ActionMenu.Item` where provided `onClick` and `onKeyDown` handlers wouldn't be called.
- Fixed a bug which allowed <kbd>Tab</kbd> to cycle through the list of `ActionMenu.Item` elements which resulted in unpredictable focus behaviour. The intended way to navigate through the list is by using the arrow keys.
