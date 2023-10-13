---
'@primer/react-brand': patch
---

Adds `borderBlockStartWidth`, `borderBlockEndWidth`, `borderInlineStartWidth`, and `borderInlineEndWidth` props to the `Box` component to support directional borders.

```jsx
<>
  <Box borderBlockStartWidth="thin" borderColor="default" borderStyle="solid" />
  <Box borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" />
  <Box borderInlineStartWidth="thin" borderColor="default" borderStyle="solid" />
  <Box borderInlineEndWidth="thin" borderColor="default" borderStyle="solid" />
</>
```
