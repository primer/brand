---
'@primer/react-brand': patch
---

Adds spacing scale support in Stack's gap and padding props

```jsx
<>
  <Stack gap={96} padding={96}>
    ...
  </Stack>
  <Stack
    gap={{
      narrow: 96
    }}
    padding={{
      narrow: 96
    }}
  >
    ...
  </Stack>
</>
```
