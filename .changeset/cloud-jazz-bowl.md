---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

Updates to `RiverAccordion` component

#### New Features

- **New `RiverAccordion` prop**: `variant`. This prop controls the layout and appearance of the RiverAccordion component. Two variants are available: `default` and `gridline`.

  The `default` variant is the pre-existing `RiverAccordion` configuration and remains the default value.

  The `gridline` variant adds lateral padding and borders for use within bordered grid layouts, using a 50/50 column split.

  ```jsx
  <RiverAccordion variant="gridline" />
  ```

#### Changes

- **Updated accordion icons**: Replaced `PlusIcon` with `ChevronDownIcon`/`ChevronUpIcon` for better visual clarity of expand/collapse state.
- **Updated default text size**: Text size in `RiverAccordion.Content` now defaults to `300` (previously `200`) for improved readability.
