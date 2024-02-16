---
'@primer/react-brand': patch
---

Added `x` variant to `UnorderedList`, and `leadingVisual`, `variant`, `leadingVisualAriaLabel` and `leadingVisualFill` props to list items.

Example:

```jsx
<UnorderedList variant="x">
  <UnorderedList.Item leadingVisual={CheckIcon} leadingVisualFill="green">
    Check icon override in green
  </UnorderedList.Item>
  <UnorderedList.Item leadingVisualFill="orange">X icon in orange</UnorderedList.Item>
  <UnorderedList.Item leadingVisualFill="red">X icon in red</UnorderedList.Item>
  <UnorderedList.Item leadingVisualFill="blue">X icon in blue</UnorderedList.Item>
  <UnorderedList.Item leadingVisualFill="purple">X icon in purple</UnorderedList.Item>{' '}
  <UnorderedList.Item variant="muted">Muted text color</UnorderedList.Item>
</UnorderedList>
```
