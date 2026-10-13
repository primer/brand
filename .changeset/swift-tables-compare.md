---
'@primer/react-brand': minor
'@primer/brand-primitives': patch
---

Added the new `FeatureComparisonTable` component for comparing two to four pricing plans with plan summaries, actions, and grouped feature availability.

```js
import {FeatureComparisonTable} from '@primer/react-brand'
```

```jsx
<FeatureComparisonTable>
  <FeatureComparisonTable.Heading>Compare plans</FeatureComparisonTable.Heading>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.ItemHeading>Free</FeatureComparisonTable.ItemHeading>
  </FeatureComparisonTable.Item>
  <FeatureComparisonTable.Item>
    <FeatureComparisonTable.ItemHeading>Team</FeatureComparisonTable.ItemHeading>
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

Added the new `FeatureComparisonTable` component design tokens.

- `--brand-FeatureComparisonTable-default-featureColumnWidth`
- `--brand-FeatureComparisonTable-fourItems-featureColumnWidth`
- `--brand-FeatureComparisonTable-label-accentColor`
- `--brand-FeatureComparisonTable-highlightedColumn-bgColor`
- `--brand-FeatureComparisonTable-includedIndicator-fgColor`
- `--brand-FeatureComparisonTable-includedIndicator-bgColor`
- `--brand-FeatureComparisonTable-unlimitedIndicator-fgColor`
- `--brand-FeatureComparisonTable-unlimitedIndicator-bgColor`
- `--brand-FeatureComparisonTable-refreshIndicator-fgColor`
- `--brand-FeatureComparisonTable-refreshIndicator-bgColor`
- `--brand-FeatureComparisonTable-rowHighlight-bgColor`
