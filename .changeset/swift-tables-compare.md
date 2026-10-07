---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Added the new `FeatureComparisonTable` component for comparing two to four pricing plans with plan summaries,
actions, and grouped feature availability.

```js
import {FeatureComparisonTable} from '@primer/react-brand'
```

```jsx
<FeatureComparisonTable>
  <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.Heading>Free</FeatureComparisonTable.Heading>
  </FeatureComparisonTable.Item>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.Heading>Team</FeatureComparisonTable.Heading>
  </FeatureComparisonTable.Item>
  <FeatureComparisonTable.Group>
    <FeatureComparisonTable.GroupHeading>Collaboration</FeatureComparisonTable.GroupHeading>
    <FeatureComparisonTable.Row>
      <FeatureComparisonTable.RowHeading>Private repositories</FeatureComparisonTable.RowHeading>
      <FeatureComparisonTable.Cell variant="included" />
      <FeatureComparisonTable.Cell variant="included" />
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
