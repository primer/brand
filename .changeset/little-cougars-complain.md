---
"@primer/react-brand": patch
---

`Grid.Column` now spans full width by default when using responsive API

```jsx
<Grid>
  <Grid.Column
    span={{
      large: 6
    }}
  ></Grid.Column>
  <Grid.Column
    span={{
      xsmall: 3,
      large: 6
    }}
  ></Grid.Column>
</Grid>
```
