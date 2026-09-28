---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Added the new `PricingComparisonTable` component for comparing two to four pricing plans with plan summaries,
actions, and grouped feature availability.

Example usage:

```js
import {PricingComparisonTable} from '@primer/react-brand'
```

```jsx
<PricingComparisonTable hasStickyHeaders rowHighlighting>
  <PricingComparisonTable.Heading>Compare plans</PricingComparisonTable.Heading>
  <PricingComparisonTable.Item>
    <PricingComparisonTable.Heading>Free</PricingComparisonTable.Heading>
    <PricingComparisonTable.Description>For individuals.</PricingComparisonTable.Description>
    <PricingComparisonTable.Price>$0</PricingComparisonTable.Price>
    <PricingComparisonTable.PrimaryAction as="a" href="/signup">
      Get started
    </PricingComparisonTable.PrimaryAction>
  </PricingComparisonTable.Item>
  <PricingComparisonTable.Item>
    <PricingComparisonTable.Label>Recommended</PricingComparisonTable.Label>
    <PricingComparisonTable.Heading>Team</PricingComparisonTable.Heading>
    <PricingComparisonTable.Description>For growing teams.</PricingComparisonTable.Description>
    <PricingComparisonTable.Price>$4 per user / month</PricingComparisonTable.Price>
    <PricingComparisonTable.PrimaryAction as="a" href="/signup/team">
      Choose Team
    </PricingComparisonTable.PrimaryAction>
  </PricingComparisonTable.Item>
  <PricingComparisonTable.Group expanded={{narrow: false, regular: true, wide: true}}>
    <PricingComparisonTable.GroupHeading>Collaboration</PricingComparisonTable.GroupHeading>
    <PricingComparisonTable.Row>
      <PricingComparisonTable.RowHeading>Private repositories</PricingComparisonTable.RowHeading>
      <PricingComparisonTable.Cell variant="included" />
      <PricingComparisonTable.Cell variant="included" />
    </PricingComparisonTable.Row>
    <PricingComparisonTable.Row>
      <PricingComparisonTable.RowHeading>Support</PricingComparisonTable.RowHeading>
      <PricingComparisonTable.Cell>Community</PricingComparisonTable.Cell>
      <PricingComparisonTable.Cell>Standard</PricingComparisonTable.Cell>
    </PricingComparisonTable.Row>
  </PricingComparisonTable.Group>
</PricingComparisonTable>
```

:link: [See `PricingComparisonTable` documentation for more usage examples](https://primer.style/brand/components/PricingComparisonTable)

Added light- and dark-mode color tokens in `@primer/brand-primitives` for the label accent, highlighted columns,
included indicators, and row highlighting:

- `--brand-PricingComparisonTable-label-accentColor`
- `--brand-PricingComparisonTable-highlightedColumn-bgColor`
- `--brand-PricingComparisonTable-includedIndicator-fgColor`
- `--brand-PricingComparisonTable-includedIndicator-bgColor`
- `--brand-PricingComparisonTable-rowHighlight-bgColor`
