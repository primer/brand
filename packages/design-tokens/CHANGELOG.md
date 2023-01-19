# @primer/brand-primitives

## 0.10.0

## 0.9.1

## 0.9.0

### Minor Changes

- [#143](https://github.com/primer/brand/pull/143) [`3affeda`](https://github.com/primer/brand/commit/3affedaea4c162664f7330a7898c47ced7d1a602) Thanks [@rezrah](https://github.com/rezrah)! - - Updating names and values for `accent`, `accordion` and `button` design tokens.

  ```diff
  - --brand-color-accent-fg
  + --brand-color-accent-primary
  ```

  ```diff
  - --brand-color-accent-emphasis
  + --brand-color-accent-secondary
  ```

  ```diff
  - --brand-color-accent-fg
  + --brand-color-accent-primary
  ```

  ```diff
  - --brand-color-accent-emphasis
  + --brand-color-accent-secondary
  ```

  ```diff
  - --brand-color-accent-subtle
  + --brand-color-accent-secondary
  ```

  ```diff
  - --brand-color-accent-muted
  + --brand-color-accent-primary
  ```

  ```diff
  - --brand-Accordion-toggle-color-start
  + --brand-Accordion-toggle-color-start
  ```

  ```diff
  - --brand-Accordion-toggle-color-end
  + --brand-Accordion-toggle-color-end
  ```

  ```diff
  - --brand-Accordion-toggle-color-start
  + --brand-Accordion-toggle-color-start
  ```

  ```diff
  - --brand-Accordion-toggle-color-end
  + --brand-Accordion-toggle-color-end
  ```

  ```diff
  - --brand-Button-background-base
  + --brand-Button-background-base
  ```

  ```diff
  - --brand-Button-shadow-default
  + --brand-Button-shadow-primary-default
  ```

  ```diff
  - --brand-Button-shadow-hover
  + --brand-Button-shadow-primary-hover
  ```

  ```diff
  - --brand-Button-background-base
  + --brand-Button-background-base
  ```

  ```diff
  - --brand-Button-shadow-default
  + --brand-Button-shadow-primary-default
  ```

  ```diff
  - --brand-Button-shadow-hover
  + --brand-Button-shadow-primary-hover
  ```

  - Button heights have been updated to match specifications in Figma.

## 0.8.0

### Minor Changes

- [#133](https://github.com/primer/brand/pull/133) [`0b43c0e`](https://github.com/primer/brand/commit/0b43c0e44f54738d7d54a2ee1d702927a9b40931) Thanks [@rezrah](https://github.com/rezrah)! - New `AnchorNav` component available

  Use `AnchorNav` to provide a sticky navigation bar for quick scrolling to and highlighting of different sections of the document.

  ```jsx
  <AnchorNav>
    <AnchorNav.Link href="#section-1">Section 1</AnchorNav.Link>
    <AnchorNav.Link href="#section-2">Section 2</AnchorNav.Link>
    <AnchorNav.Link href="#section-3">Section 3</AnchorNav.Link>
    <AnchorNav.Action href="/">Call to action</AnchorNav.Action>
  </AnchorNav>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/AnchorNav)

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
