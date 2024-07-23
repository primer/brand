---
'@primer/react-brand': patch
---

Added `tabAttributes` prop to `FAQGroup` component. This prop is used to set arbitrary attributes on the tabs rendered by the `FAQGroup` component.

For example, the below code will add `data-analytics="tab-0"` to the first tab and `data-analytics="tab-1"` to the second tab.

```tsx
<FAQGroup
  tabAttributes={(children, index) => ({
    'data-analytics': `tab-${index}`,
  })}
>
  <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
  <FAQ>
    <FAQ.Heading>Using GitHub Enterprise</FAQ.Heading>
    <FAQ.Item>...</FAQ.Item>
    <FAQ.Item>...</FAQ.Item>
    <FAQ.Item>...</FAQ.Item>
  </FAQ>

  <FAQ>
    <FAQ.Heading>About GitHub Enterprise</FAQ.Heading>
    <FAQ.Item>...</FAQ.Item>
    <FAQ.Item>...</FAQ.Item>
    <FAQ.Item>...</FAQ.Item>
  </FAQ>
</FAQGroup>
```
