# @primer/brand-css

## 0.70.0

## 0.69.0

### Patch Changes

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Added the `--base-size-60` and `--base-size-88` base size tokens.

  Also exposed `60` and `88` through React components that use the base size scale, such as `Box` and `Stack`.

  ```tsx
  <Box padding={60} />
  <Box padding={88} />
  <Stack gap={60} />
  <Stack gap={88} />
  ```

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - - Updated the `Accordion` toggle indicator to use the `TriangleDownIcon` octicon, which rotates anti-clockwise between its open and closed states.

  - Improved `Accordion` content open and close animation so items transition using measured content height.

  - Added a `disableAnimation` prop to `Accordion` now that it includes a default animation, which may not be applicable in all use-cases.

  - Updated `Accordion` to close immediately when reduced motion is preferred.

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Adjusted the `Card.Heading` bottom spacing from `20px` to `12px`.

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Adjusted the `Hero` action group top spacing from `32px` to `28px` and the expressive trailing content top spacing from `32px` to `20px` on wider viewports.

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Updated the `LogoSuite` control hover color in light mode from `gray-2` to `gray-1`.

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Updated `Tabs` item typography from text size `100` to `200`.

- [#1363](https://github.com/primer/brand/pull/1363) [`f3a70ed`](https://github.com/primer/brand/commit/f3a70ed8e2a160ccb4129e4ef21ecaf34ed113e8) Thanks [@rezrah](https://github.com/rezrah)! - Added `TextCursorAnimation` cursor color tokens. The light mode cursor color now uses `--base-color-scale-green-6`, while dark mode preserves the existing accent color.

## 0.68.0

### Minor Changes

- [#1344](https://github.com/primer/brand/pull/1344) [`e54a442`](https://github.com/primer/brand/commit/e54a44216f7c67b198dfc2c7d445bc48dbfbd076) Thanks [@rezrah](https://github.com/rezrah)! - Updated Button appearance and API ergonomics:

  - ⚠️ Breaking change: Removed the `accent` Button variant. Use `primary` instead, which now applies the previous `accent` appearance.
  - Updated `secondary`, and `subtle` variant colors and state styles.
  - Updated Button hover background colors to use transitionable color values and standardized hover transitions with a 0.2s background color transition. Previously, they would not animate at all.
  - Updated Button border radius, medium Button sizing, and medium ActionMenu item height to better match the new Figma treatment.
  - Updated the shared medium control size token from `48px` to `43px`, so medium Button, ActionMenu, TextInput, and Select controls stay aligned.
  - Updated medium Button label typography to better match the new Figma treatment.
  - Fixed vertical alignment issues in the `Button` component so labels are centered consistently in browsers like Firefox.
  - Deprecated the `hasArrow` prop and hid Button arrows by default.
    - Note: `hasArrow` will be removed entirely in a future release.

### Patch Changes

- [#1359](https://github.com/primer/brand/pull/1359) [`9c900e9`](https://github.com/primer/brand/commit/9c900e902b5cd9800ef083457d206490aefdb24a) Thanks [@rezrah](https://github.com/rezrah)! - Adjusted the `Hero.Label` bottom spacing from `16px` to `14px`.

- [#1359](https://github.com/primer/brand/pull/1359) [`9c900e9`](https://github.com/primer/brand/commit/9c900e902b5cd9800ef083457d206490aefdb24a) Thanks [@rezrah](https://github.com/rezrah)! - Updated `Icon` with `hasBackground` to use a 12px border radius.

- [#1359](https://github.com/primer/brand/pull/1359) [`9c900e9`](https://github.com/primer/brand/commit/9c900e902b5cd9800ef083457d206490aefdb24a) Thanks [@rezrah](https://github.com/rezrah)! - Updated `Checkbox` and `Radio` checked, indeterminate, disabled, and hover state styling to match the latest design treatment.

  Form controls now use a dedicated focus color token, with blue-6 in light mode and blue-2 in dark mode.

  Updated form validation icon alignment and success color treatment.

  The checkmark animation now uses the checked foreground color from the start instead of flashing the focus color first.

- [#1359](https://github.com/primer/brand/pull/1359) [`9c900e9`](https://github.com/primer/brand/commit/9c900e902b5cd9800ef083457d206490aefdb24a) Thanks [@rezrah](https://github.com/rezrah)! - Updated the `LogoSuite` gridline expressive layout to use slightly larger tablet logobar spacing, improving alignment with the overview template design.

  Set `LogoSuite` mobile logo sizing to 32px, matching the tablet presentation and improving consistency across smaller viewports.

  Updated the `LogoSuite` expressive gridline variant on tablet layouts to use fixed 91px inline edge spacing instead of a max-width cap.

## 0.67.0

## 0.66.0

### Patch Changes

- [#1299](https://github.com/primer/brand/pull/1299) [`ea8a60f`](https://github.com/primer/brand/commit/ea8a60f5f26b52532e13d4443ebc2cb04372674f) Thanks [@rezrah](https://github.com/rezrah)! - Upgraded dependencies to latest minor, patch, and select major versions.

  `@primer/react-brand`:

  - `autoprefixer`: 10.4.20 → 10.4.27
  - `css-loader`: 7.1.2 → 7.1.4
  - `mini-css-extract-plugin`: 2.9.2 → 2.10.2
  - `postcss`: 8.5.1 → 8.5.8
  - `postcss-loader`: 8.1.1 → 8.2.1
  - `postcss-preset-env`: 10.1.3 → 11.2.0
  - `webpack`: 5.101.3 → 5.105.4
  - `webpack-cli`: 6.0.1 → 7.0.2

  `@primer/brand-primitives`:

  - `@primer/primitives`: 9.1.1 → 9.1.2

  `@primer/brand-css`:

  - `autoprefixer`: 10.4.20 → 10.4.27
  - `postcss`: 8.5.1 → 8.5.8

## 0.65.1

## 0.65.0

## 0.64.0

## 0.63.0

## 0.62.0

### Minor Changes

- [#1225](https://github.com/primer/brand/pull/1225) [`a1caad6`](https://github.com/primer/brand/commit/a1caad612df348cfa657b844b94e33ab8f869791) Thanks [@rezrah](https://github.com/rezrah)! - **Breaking change:** Minimum Node.js version is now v24 (LTS)

  If you're using an older version, please upgrade to Node.js 24 LTS before updating to this release.

## 0.61.1

## 0.61.0

## 0.60.1

## 0.60.0

## 0.59.2

## 0.59.1

## 0.59.0

## 0.58.2

## 0.58.1

## 0.58.0

## 0.57.2

## 0.57.1

## 0.57.0

## 0.56.3

## 0.56.2

## 0.56.1

## 0.56.0

### Minor Changes

- [#924](https://github.com/primer/brand/pull/924) [`9e860a1`](https://github.com/primer/brand/commit/9e860a17ed2d6aa9e4cc5c9ba9bc04da72730852) Thanks [@rezrah](https://github.com/rezrah)! - New CSS-only package available for Primer Brand components
