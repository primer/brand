---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

Updates to `River` component

#### New Features

- **New `River` prop**: `variant`. This prop controls the layout and appearance of the River component. Two variants are available: `default` and `gridline`.

  The `default` variant is the pre-existing `River` configuration and remains the default value.

  The `gridline` variant adds lateral padding and borders for use within bordered grid layouts.

  ```jsx
  <River variant="gridline" />
  ```

- **New `River.Visual` prop**: `imageBackgroundColor`. Set to `'subtle'` to create a full-bleed container with a background color and the image/video centered inside with padding.

  ```jsx
  <River variant="gridline">
    <River.Visual imageBackgroundColor="subtle">
      <img src="..." alt="..." />
    </River.Visual>
    <River.Content>...</River.Content>
  </River>
  ```

- **New `River.Content` prop**: `align`. Controls vertical alignment of content within its container. Values: `'center'` (default), `'block-end'`.

- **`EyebrowText` support**: `River.Content` now accepts `EyebrowText` as a child for adding small, uppercase labels above the heading.

  ```jsx
  <River.Content>
    <EyebrowText>Feature</EyebrowText>
    <Heading>Title</Heading>
    <Text>Description</Text>
  </River.Content>
  ```

- **New `RiverBreakout` prop**: `variant`. This prop controls the layout and appearance of the RiverBreakout component. Two variants are available: `default` and `gridline`.

  The `gridline` variant adds horizontal border lines, lateral spacing, and supports vertical dividers for the trailing component on tablet+ viewports.

  ```jsx
  <RiverBreakout variant="gridline">
    <RiverBreakout.A11yHeading>Title</RiverBreakout.A11yHeading>
    <RiverBreakout.Visual>
      <img src="..." alt="..." />
    </RiverBreakout.Visual>
    <RiverBreakout.Content trailingComponent={Timeline} trailingComponentDivider>
      <Text>Description</Text>
    </RiverBreakout.Content>
  </RiverBreakout>
  ```

- **`RiverBreakout` padded background support**: `RiverBreakout.Visual` now supports `imageBackgroundColor="subtle"` to display the visual with a padded background container that bleeds to the gridline borders.
