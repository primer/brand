---
'@primer/react-brand': minor
---

Updates to `Hero` component

⚠️ **Important: Breaking changes are included in this update.**

#### Breaking Changes

- **`Hero.Label`**: No longer extends `Label` component. It now renders as plan text with monospace font and in uppercase. Props like `size` and `color` are no longer supported.

  Update usage as follows:

  ```diff
  - <Hero.Label color="red">Red labels</Hero.Label>
  + <Hero.Label>Default label</Hero.Label>
  ```

- **`Hero.Description`**: Default `size` changed from `'350'` to `'200'`. The default `variant` changed from `'default'` to `'muted'`.

- **`Hero.PrimaryAction`**: Default button variant changed from `'primary'` to `'accent'`.

  Revert to previous style:

  ```diff
  - <Hero.PrimaryAction>Button</Hero.PrimaryAction> <-- now accent (green) variant
  + <Hero.PrimaryAction variant="primary">Button</Hero.PrimaryAction> <--revert to primary variant
  ```

#### New Features

- **New `Hero` prop**: `variant`. This prop controls overall layout, appearance and motion in the `Hero`. Two variants are available: `default` and `bordered-grid`.

  The `default` variant is the pre-existing `Hero` configuration, and remains the default value to minimize breaking changes.

  The `bordered-grid` layout is a new layout that can be opted-into. This is an experimental layout and configuration.

  ```jsx
  <Hero variant="bordered-grid" />
  ```

- **New `Hero.Label` animations**: New `animate` and `animationDelay` props for text cursor animation effect.

- **New image positions**: `Hero.Image` and `Hero.Video` now support `'inline-start'`, `'inline-end-padded'`, and `'inline-start-padded'` positions.

- **New `Hero.Video` poster props**: `poster`, `posterAltText`, and `posterTitle` for displaying a custom poster image with a play button overlay before the video loads. Video content is hidden until the user clicks the poster to play.

- **`imageBackgroundColor` prop**: Set to `'subtle'` for a subtle background on the image container.

- **`imageContainerRef` prop**: Ref access to the image container element.

- **Built-in animations**: When using `variant="bordered-grid"`, heading, description, image, and actions animate automatically on load.

### Other

- `Hero.Image` border radius has been reduced from `large` to `medium`.
- `Hero` internal grids have been optimized on medium (tablet) breakpoints to appear in the stacked layout (mobile). This is a layout improvement that prevents cramped image layouts.
