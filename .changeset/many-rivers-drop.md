---
'@primer/react-brand': minor
---

- Fixed a bug where the `Bento` `leadingVisual` prop wouldn't honour the provided `size`.
- Replaced the `Card.Icon` implementation with the new (internal) `Icon` component.

  ⚠️ Breaking change: The `Card.Icon` component no longer accepts instantiated components for the `icon` prop. Instead, you should pass a reference to the icon you'd like to render. For example:

  ```tsx
  // Supported
  <Card.Icon icon={CopilotIcon} />

  // Not supported
  <Card.Icon icon={<CopilotIcon />} />
  ```
