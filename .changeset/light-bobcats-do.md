---
'@primer/react-brand': patch
---

Updates to `useTabs` hook:

- Added an optional `externalRef` parameter to `getTabProps` function for improved forwardRef support.
- Fixed `onTabActivate` callback to only trigger when switching between tabs (not on initial mount)
- Optimized focus state management by preventing unnecessary state updates when focus doesn't change.
- Removed redundant state updates in `focusTab` and `onTabFocus` functions

This affects the following components, which use this hook:

- `Tabs` component
- `IDE` component
