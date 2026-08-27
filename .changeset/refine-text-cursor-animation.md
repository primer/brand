---
'@primer/brand-primitives': patch
'@primer/react-brand': minor
---

Updated `TextCursorAnimation` to use the new typing animation and phased cursor colors.

Animated text types once by default. Pass `initialText` to transition between two messages with a type, delete, and retype sequence:

```jsx
<TextCursorAnimation animate initialText="Your AI assistant">
  Your AI accelerator
</TextCursorAnimation>
```

⚠️ `--brand-TextCursorAnimation-reveal-progress` and `--brand-TextCursorAnimation-cursor-progress` design tokens are no longer used.

New tokens:

- `--brand-TextCursorAnimation-cursor-animationDuration`
- `--brand-TextCursorAnimation-cursor-deleteColor`
- `--brand-TextCursorAnimation-cursor-finalColor`
- `--brand-TextCursorAnimation-cursor-color`
