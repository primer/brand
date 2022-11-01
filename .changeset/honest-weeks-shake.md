---
'@primer/react-brand': minor
---

New ComparisonTable component available

```jsx
<ComparisonTable featuredColumn={1} heading="GitHub vs Jenkins">
  <ComparisonTable.Row>
    <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
    <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
    <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
  </ComparisonTable.Row>
  <ComparisonTable.Row>
    <ComparisonTable.Cell>Automation & CI/CD</ComparisonTable.Cell>
    <ComparisonTable.Cell>
      <Text as="p" size="300">
        Comparable native core capabilities
      </Text>
      <Text as="p" size="300">
        <InlineLink href="#">Over 13,000 GitHub Actions are available</InlineLink>
        &nbsp;in the GitHub Marketplace to automate your development workflow.
      </Text>
    </ComparisonTable.Cell>
    <ComparisonTable.Cell>
      <Text as="p" size="300">
        Comparable native capabilities
      </Text>
      <Text as="p" size="300">
        1,800+ community contributed Jenkins plugins <InlineLink href="#">in Jenkins Plugin Marketplace.</InlineLink>
      </Text>
    </ComparisonTable.Cell>
  </ComparisonTable.Row>
  <ComparisonTable.Row>
    <ComparisonTable.Cell>Deployment models</ComparisonTable.Cell>
    <ComparisonTable.Cell>Cloud or self-hosted</ComparisonTable.Cell>
    <ComparisonTable.Cell>
      <Text as="p" size="300">
        Self-hosted only
      </Text>
      <Text as="p" size="300">
        CloudBees is the cloud alternative
      </Text>
    </ComparisonTable.Cell>
  </ComparisonTable.Row>
  <ComparisonTable.Footnote>{args.footnote}</ComparisonTable.Footnote>
</ComparisonTable>
```

:link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/ComparisonTable)
