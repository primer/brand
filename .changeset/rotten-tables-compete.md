---
'@primer/react-brand': patch
---

Added new `reveal-in-up` animation and `immediate` triggers to `AnimationProvider`

```jsx
<AnimationProvider animationTrigger="immediate">
  <Box animate="reveal-in-up">Wipe in up animation that runs immediately</Box>
</AnimationProvider>
```
