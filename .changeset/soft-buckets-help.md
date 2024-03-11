---
'@primer/react-brand': minor
---

New pricing options component now generally available

```jsx
<PricingOptions>
  <PricingOptions.Item>
    <PricingOptions.Label>Recommended</PricingOptions.Label>
    <PricingOptions.Heading>Copilot</PricingOptions.Heading>
    <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
    <PricingOptions.Price currencySymbol="$" trailingText="per month / $100 per year">
      10
    </PricingOptions.Price>
    <PricingOptions.FeatureList>
      <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
    </PricingOptions.FeatureList>
    <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
    <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
  </PricingOptions.Item>
  <PricingOptions.Item>
    <PricingOptions.Label>Recommended</PricingOptions.Label>
    <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
    <PricingOptions.Description>
      Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
      Enterprise Cloud.
    </PricingOptions.Description>
    <PricingOptions.Price currencySymbol="$" trailingText="per user / month">
      39
    </PricingOptions.Price>
    <PricingOptions.FeatureList>
      <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
    </PricingOptions.FeatureList>
    <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
  </PricingOptions.Item>
</PricingOptions>
```

:link: [Read the documentation for more examples](https://primer.style/brand/components/PricingOptions)
