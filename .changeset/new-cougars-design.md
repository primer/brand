---
'@primer/react-brand': minor
---

Updated dependency for @primer/octicons-react to `19.8.0`

Octicons should now be passed as JSX instead of Objects.

```diff
- icon={RocketIcon}
+ icon={<RocketIcon />}
```
