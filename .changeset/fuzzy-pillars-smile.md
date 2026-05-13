---
'@primer/react-brand': minor
'@primer/brand-primitives': minor
---

- Visual changes to the `Pillar` component.

- `Pillar.Icon` now defaults to a fixed green color with corresponding filled background. It now uses the `Icon` component internally for size parity with `Card.Icon`.
- ⚠️ Removed the `Pillar.Icon` `color` prop and `PillarIconColors` type export. Pillar icons using the shared background now always render green. Remove `color` from existing `Pillar.Icon` usage.
- ⚠️ Removed the `iconColor` field from `FlexTemplate` pillar items because it forwarded to the removed `Pillar.Icon` color prop.
- Native SVG icons fit the shared background by default, and `hasBackground={false}` renders custom artwork without the shared background treatment.
- ⚠️ Narrowed the `Pillar.Icon` `icon` prop type. It previously accepted arbitrary `ReactNode` values such as `string`, `number`, and `boolean`, but those values didn't render a usable icon. It now only accepts a valid icon component or icon element.

- Removed the Pillar-specific icon color tokens from the package output.

  ```diff
  - --brand-Pillar-icon-color-default
  - --brand-Pillar-icon-color-{blue,coral,green,gray,indigo,lemon,lime,orange,pink,purple,red,teal,yellow}
  ```

- Updated bordered Pillars to use a medium border radius.

- Increased default size of `Pillar.Heading` from `subhead-large` to `6`

- Increased `Pillar.Icon` default size from `24px` to `32px` and added extra space between it and the subsequent heading.
