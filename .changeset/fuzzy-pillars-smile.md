---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

- Visual changes to the `Pillar` component.

- `Pillar.Icon` now defaults to a green color with corresponding filled background. It now uses the `Icon` component internally for size parity with `Card.Icon`.
- Kept `Pillar.Icon` color options while replacing Pillar-specific color styles and tokens with the shared `Icon` color treatment. Native SVG icons fit the shared background by default, and `hasBackground={false}` renders custom artwork without the shared background treatment.
- ⚠️ Narrowed the `Pillar.Icon` `icon` prop type. It previously accepted arbitrary `ReactNode` values such as `string`, `number`, and `boolean`, but those values didn't render a usable icon. It now only accepts a valid icon component or icon element.

- Removed the Pillar-specific icon color tokens from the package output.

  Use the `Pillar.Icon` `color` prop to continue customizing colors, or pass a custom `className` for custom styling.

  ```diff
  - --brand-Pillar-icon-color-default
  - --brand-Pillar-icon-color-{blue,coral,green,gray,indigo,lemon,lime,orange,pink,purple,red,teal,yellow}
  ```

- Updated bordered Pillars to use a medium border radius.
