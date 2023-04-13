---
'@primer/react-brand': minor
---

Added new Label component

Use `Label` to indicate the status of the content or add metadata to the `Card` component.

```jsx
<Label color="green" size="large">
  New feature
</Label>
```

:link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Label)

Update Card component to use Label component and its color variants

```jsx
<Card href="https://github.com">
  <Card.Label color="green">New feature</Card.Label>
  <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
  <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
</Card>
```
