---
'@primer/react-brand': patch
---

Type widening for `FormControl` children.

`FormControl` now uses `PropsWithChildren` to include support for `null` and `false` values. This allows for more flexibility when using `FormControl.*` with conditional rendering.

```jsx
<FormControl>
  {/* `maybeValue can be truthy, but also null or false` */}
  {maybeValue && <FormControl.Validation>Message</FormControl.Validation>}
</FormControl>
```
