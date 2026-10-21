---
'@primer/react-brand': patch
'@primer/brand-primitives': patch
---

Updated mobile `Tabs` with compact carousel controls, improved keyboard focus, and customizable accessible labels.

```jsx
<Tabs
  aria-label="Features"
  internalAccessibleLabels={{
    controlsPrev: 'Previous tab',
    controlsNext: 'Next tab',
    controlsNavigation: 'Tab navigation',
    controlsIndicator: 'Go to tab {current}',
  }}
>
  {/* Tabs.Item and Tabs.Panel children */}
</Tabs>
```
