---
'@primer/brand-primitives': patch
'@primer/react-brand': patch
'@primer/brand-css': patch
---

Added the `--base-size-60` and `--base-size-88` base size tokens.

Also exposed `60` and `88` through React components that use the base size scale, such as `Box` and `Stack`.

```tsx
<Box padding={60} />
<Box padding={88} />
<Stack gap={60} />
<Stack gap={88} />
```
