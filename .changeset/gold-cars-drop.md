---
'@primer/react-brand': minor
---

**breaking** InlineLink components no longer take a `size` prop, but will now inherit their size in all cases.

```jsx
// Before
<Text size="200">
  This is a link with the <InlineLink size="200">same</InlineLink> size
</Text>
```

```jsx
// After
<Text size="200">
  This is a link with the <InlineLink>same</InlineLink> size
</Text>
```

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

InlineLinks now work inside of `Header` components.

```jsx
<Header size="3">
  This is a <InlineLink>Header</InlineLink> link!
</Header>
```
