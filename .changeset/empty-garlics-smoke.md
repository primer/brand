---
'@primer/react-brand': minor
---

- Added a new `RiverAccordion` component.

  Usage example:

  ```tsx
  <RiverAccordion>
    <RiverAccordion.Item>
      <RiverAccordion.Heading>A Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>

    <RiverAccordion.Item>
      <RiverAccordion.Heading>Another Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>

    <RiverAccordion.Item>
      <RiverAccordion.Heading>One More Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>
  </RiverAccordion>
  ```

  🔗 [See the documentation for more usage examples](https://primer.style/brand/components/RiverAccordion)

- Fixed a bug in the `Heading` component where the component would be re-mounted each render, causing it to lose focus when used inside a focusable element.
