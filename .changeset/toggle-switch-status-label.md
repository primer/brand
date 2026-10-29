---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
'@primer/brand-css': patch
---

ToggleSwitch now shows visible On/Off status text by default, so its state does not rely on color or thumb position alone. The text is hidden from assistive technology and reserves a stable width. Existing switches render wider by default; set `hasStatusLabel={false}` to keep the previous width.

Use the new `statusLabelPosition` (`'start'` or `'end'`), `statusLabelOn`, and `statusLabelOff` props to position, localize, or reword the text, or set `hasStatusLabel={false}` to hide it. Custom status text also becomes the switch's accessible description, so screen readers announce it after the on or off state.

```jsx
<ToggleSwitch aria-label="Notifications" statusLabelPosition="end" statusLabelOn="Activé" statusLabelOff="Désactivé" />
```
