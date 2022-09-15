---
"@primer/react-brand": minor
---

Added a new `size` prop to `Button` and a `medium` sized variant, making the previous `large` size optional.

⚠️ This update should be considered a breaking change, despite being issued in a `minor` release. 

Selectable values: `medium` (default) and `large`.

**Upgrade steps:**

```diff
- <Button>before</Button>
+ <Button size="large">after</Button>
```
