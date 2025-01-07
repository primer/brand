---
'@primer/react-brand': patch
---

Added `toggleColor` prop to `FAQ.Question` and `Accordion.Heading`

```jsx
<FAQ>
  <FAQ.Item>
    <FAQ.Question toggleColor="green-blue">...</FAQ.Question>
    <FAQ.Answer>...</FAQ.Answer>
  </FAQ.Item>
</FAQ>
```

```jsx
<Accordion>
  <Accordion.Heading toggleColor="green-blue">...</Accordion.Heading>
  <Accordion.Content>...</Accordion.Content>
</Accordion>
```

🔗 [See the documentation examples and available color options](https://primer.style/brand/components/FAQ/react#toggle-color-customization)
