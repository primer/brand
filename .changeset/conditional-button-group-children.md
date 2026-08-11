---
'@primer/react-brand': patch
---

Allow `ButtonGroup` to accept conditionally rendered children.

Example:

```jsx
<ButtonGroup>
  <Button>Primary action</Button>
  {showSecondaryAction ? <Button>Secondary action</Button> : null}
</ButtonGroup>
```
