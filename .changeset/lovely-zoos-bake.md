---
'@primer/react-brand': patch
---

Fixed grid column appearance at medium breakpoints for columns that span beyond `9`. Required styles, which were previously missing have been backfilled.

```jsx
<Grid>
  <Grid.Column
    span={{
      medium: 9,
    }}
  ></Grid.Column>
  <Grid.Column
    span={{
      medium: 3,
    }}
  ></Grid.Column>
</Grid>
```
