---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Added the new `FeatureComparisonTable` component for comparing two to four pricing plans with plan summaries,
actions, and grouped feature availability.

Example usage:

```js
import {FeatureComparisonTable} from '@primer/react-brand'
```

```jsx
<FeatureComparisonTable hasStickyHeaders rowHighlighting>
  <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
    <FeatureComparisonTable.Description>For individuals.</FeatureComparisonTable.Description>
    <FeatureComparisonTable.Price>$0</FeatureComparisonTable.Price>
    <FeatureComparisonTable.PrimaryAction as="a" href="/signup">
      Get started
    </FeatureComparisonTable.PrimaryAction>
  </FeatureComparisonTable.Item>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.Label>Recommended</FeatureComparisonTable.Label>
    <FeatureComparisonTable.Heading>Team</FeatureComparisonTable.Heading>
    <FeatureComparisonTable.Description>For growing teams.</FeatureComparisonTable.Description>
    <FeatureComparisonTable.Price>$4 per user / month</FeatureComparisonTable.Price>
    <FeatureComparisonTable.PrimaryAction as="a" href="/signup/team">
      Choose Team
    </FeatureComparisonTable.PrimaryAction>
  </FeatureComparisonTable.Item>
  <FeatureComparisonTable.Group expanded={{narrow: false, regular: true, wide: true}}>
    <FeatureComparisonTable.GroupHeading>Collaboration</FeatureComparisonTable.GroupHeading>
    <FeatureComparisonTable.Row>
      <FeatureComparisonTable.RowHeading>Private repositories</FeatureComparisonTable.RowHeading>
      <FeatureComparisonTable.Cell variant="included" />
      <FeatureComparisonTable.Cell variant="included" />
    </FeatureComparisonTable.Row>
    <FeatureComparisonTable.Row>
      <FeatureComparisonTable.RowHeading>Support</FeatureComparisonTable.RowHeading>
      <FeatureComparisonTable.Cell>Community</FeatureComparisonTable.Cell>
      <FeatureComparisonTable.Cell>Standard</FeatureComparisonTable.Cell>
    </FeatureComparisonTable.Row>
  </FeatureComparisonTable.Group>
</FeatureComparisonTable>
```

:link: [See `FeatureComparisonTable` documentation for more usage examples](https://primer.style/brand/components/FeatureComparisonTable)

Added light- and dark-mode color tokens in `@primer/brand-primitives` for the label accent, highlighted columns,
included indicators, and row highlighting:

- `--brand-FeatureComparisonTable-label-accentColor`
- `--brand-FeatureComparisonTable-highlightedColumn-bgColor`
- `--brand-FeatureComparisonTable-includedIndicator-fgColor`
- `--brand-FeatureComparisonTable-includedIndicator-bgColor`
- `--brand-FeatureComparisonTable-rowHighlight-bgColor`
