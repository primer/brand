---
'@primer/react-brand': minor
---

Added `RiverBreakoutTabs` component, which is designed to aid storytelling sections where multiple related messages need to live in one high-impact module, without requiring users to scroll through several full-width sections.

Usage example:

```tsx
<RiverBreakoutTabs>
  <RiverBreakoutTabs.A11yHeading>Plan, review, and ship with Copilot</RiverBreakoutTabs.A11yHeading>

  <RiverBreakoutTabs.Item>
    <RiverBreakoutTabs.Heading>Plan from your backlog</RiverBreakoutTabs.Heading>
    <RiverBreakoutTabs.Content>
      <Text>Break large issues into practical implementation steps.</Text>
      <Link href="#">Learn more</Link>
    </RiverBreakoutTabs.Content>
    <RiverBreakoutTabs.Visual imageBackgroundColor="subtle">
      <img src="/images/placeholder-1.png" alt="Planning workflow in editor" />
    </RiverBreakoutTabs.Visual>
  </RiverBreakoutTabs.Item>
</RiverBreakoutTabs>
```

🔗 [See the documentation for more usage examples](https://primer.style/brand/components/RiverBreakoutTabs)
