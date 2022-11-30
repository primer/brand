# @primer/brand-primitives

## 0.7.2

### Patch Changes

- [#127](https://github.com/primer/brand/pull/127) [`c16551f`](https://github.com/primer/brand/commit/c16551f65bd1f2ceb62f9979c0ae909e58aed348) Thanks [@rezrah](https://github.com/rezrah)! - Improvements to Button appearance

  - added an inactive / disabled visual appearance to the Button, which it previously didn't have

  - added new design tokens to replace functional tokens and enable app-side customisation

  - updated focus styles from previously bespoke grey to the global focus tokens

## 0.7.1

## 0.7.0

## 0.6.0

### Minor Changes

- [#108](https://github.com/primer/brand/pull/108) [`ba4f102`](https://github.com/primer/brand/commit/ba4f102435cd1bc5d6061de8402b961e9d17b223) Thanks [@rezrah](https://github.com/rezrah)! - Token updates for SubdomainNavBar and ComparisonTable

  - Fixed incorrect token name in SubdomainNavBar

    ```diff
    - --brand-SubdomainNavBar-fg-overflow-default: var(--brand-color-fg-default);
    + --brand-SubdomainNavBar-fg-overflow-default: var(--brand-color-text-default);
    ```

  - Added new token for customizing the featured gradiend in ComparisonTable

    ```diff
    + --brand-ComparisonTable-featured-color-start;
    + --brand-ComparisonTable-featured-color-end;
    ```

## 0.5.3

## 0.5.2

### Patch Changes

- [#92](https://github.com/primer/brand/pull/92) [`fcef134`](https://github.com/primer/brand/commit/fcef1344f7c1af85691f931851a4dd98a0004099) Thanks [@rezrah](https://github.com/rezrah)! - No updates in this release.

  New package versions published to verify the release process.
