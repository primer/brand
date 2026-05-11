# @primer/brand-css

## 0.68.0

### Minor Changes

- [#1344](https://github.com/primer/brand/pull/1344) [`e54a442`](https://github.com/primer/brand/commit/e54a44216f7c67b198dfc2c7d445bc48dbfbd076) Thanks [@rezrah](https://github.com/rezrah)! - Updated Button appearance and API ergonomics:

  - ⚠️ Breaking change: Removed the `accent` Button variant. Use `primary` instead, which now applies the previous `accent` appearance.
  - Updated `secondary`, and `subtle` variant colors and state styles.
  - Updated medium Button label typography to better match the new Figma treatment.
  - Deprecated the `hasArrow` prop and hid Button arrows by default.
    - Note: `hasArrow` will be removed entirely in a future release.

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
