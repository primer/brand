---
'@primer/react-brand': minor
---

Remove `small` size variant to `Label` component. The default `medium` size should be used instead.

⚠️ This is a breaking change

To restore the visual appearance, use the following:

```diff
- <Label size="small">
+ <Label> or
```
