---
'@primer/react-brand': patch
'@primer/brand-css': patch
---

ToggleSwitch supports optional visible On/Off status text. Set `hasStatusLabel` to make the current state explicit. The text reserves a stable width and does not change the switch's accessible name. Custom state wording is exposed as the current accessible description and announced politely when the state changes.

Use `statusLabelPosition` (`'start'` or `'end'`), `statusLabelOn`, and `statusLabelOff` to position, localize, or reword the text. Custom status text also becomes the switch's accessible description.

```jsx
<ToggleSwitch
  aria-label="Notifications"
  hasStatusLabel
  statusLabelPosition="end"
  statusLabelOn="Activé"
  statusLabelOff="Désactivé"
/>
```
