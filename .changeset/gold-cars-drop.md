---
'@primer/react-brand': minor
---

**breaking** InlineLink components no longer take a `size` prop, but will now inherit their size in all cases.
InlineLinks now work inside of `Header` components.

If you want the Inline Link to have a different size than its parent, wrap it in a new `<Text>` component.

```jsx
// Before
<Text size="200">
  This is a link with a <InlineLink size="400">different</InlineLink>Size
</Text>
```

```jsx
// After
<Text size="200">
  This is a link with a{' '}
  <Text as="span" size="400">
    <InlineLink>different</InlineLink>
  </Text>
  Size
</Text>
```
