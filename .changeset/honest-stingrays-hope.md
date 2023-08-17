---
'@primer/brand-primitives': minor
'@primer/react-brand': minor
---

Adds RiverBreakout component and its supporting design tokens.

Usage example:

```jsx
<RiverBreakout>
  <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
  <RiverBreakout.Visual>
    <PlaceholderImage />
  </RiverBreakout.Visual>
  <RiverBreakout.Content trailingComponent={() => {<div>Trailing component</div>}}>
    <Text>
      Accelerate your workflows and scale your business fast with access to millions of open source projects on
      GitHub, the largest source code host.
    </Text>
    <Link href="#">Call to action</Link>
  </RiverBreakout.Content>
</RiverBreakout>
```

See the [Storybook](https://primer.style/brand/storybook/?path=/story/components-river-features--with-breakout)
