---
'@primer/react-brand': patch
---

Add default spacing and optional divider to `trailingComponent` styles to `River.Content`

```jsx
<River.Content
  trailingComponent={() => (
    <Stack direction="vertical" padding="none" alignItems="flex-start">
      <Heading as="h3" size="3">
        +50%
      </Heading>
      <Text variant="muted" as="p" size="300">
        Developer efficiency
      </Text>
    </Stack>
  )}
  trailingComponentDivider
>
  <Heading>Heading</Heading>
  <Text>Use trailing components to provide additional, custom content immediately after the main content.</Text>
</River.Content>
```
