---
'@primer/react-brand': minor
---

New pricing cards component now generally available

```jsx
<PricingCards>
  <PricingCards.Item>
    <PricingCards.Label>Recommended</PricingCards.Label>
    <PricingCards.Heading>Copilot</PricingCards.Heading>
    <PricingCards.Description>Copilot in the coding environment.</PricingCards.Description>
    <PricingCards.Price currencySymbol="$" trailingText="per month / $100 per year">
      10
    </PricingCards.Price>
    <PricingCards.FeatureList>
      <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
    </PricingCards.FeatureList>
    <PricingCards.PrimaryAction href="/buy">Buy now</PricingCards.PrimaryAction>
    <PricingCards.SecondaryAction href="/contact">Contact sales</PricingCards.SecondaryAction>
  </PricingCards.Item>
  <PricingCards.Item>
    <PricingCards.Label>Recommended</PricingCards.Label>
    <PricingCards.Heading>Copilot Business</PricingCards.Heading>
    <PricingCards.Description>
      Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
      Enterprise Cloud.
    </PricingCards.Description>
    <PricingCards.Price currencySymbol="$" trailingText="per user / month">
      39
    </PricingCards.Price>
    <PricingCards.FeatureList>
      <PricingCards.FeatureListItem>Everything in Copilot Business plus:</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>Chat in IDE and Mobile</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>CLI assistance</PricingCards.FeatureListItem>
      <PricingCards.FeatureListItem>Code completions</PricingCards.FeatureListItem>
    </PricingCards.FeatureList>
    <PricingCards.PrimaryAction href="/waitlist">Join waitlist</PricingCards.PrimaryAction>
  </PricingCards.Item>
</PricingCards>
```

:link: [Read the documentation for more examples](https://primer.style/brand/components/PricingCards)
