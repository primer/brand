---
'@primer/react-brand': minor
---

Added default rounded corners to River.Visual and removed shadows

⚠️ This is a visual breaking change

To restore the previous visual appearance, use the following

```diff
- <River.Visual>
+ <River.Visual rounded={false} hasShadow>
```
