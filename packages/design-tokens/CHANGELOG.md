# @primer/brand-primitives

## 0.21.0

### Patch Changes

- [#360](https://github.com/primer/brand/pull/360) [`d1ee031`](https://github.com/primer/brand/commit/d1ee0316662b92ca18ee32feba56233cdf4b42e0) Thanks [@rezrah](https://github.com/rezrah)! - Updated custom animation times and easing values across all components to leverage globally available values.

  Three new variables have been added to `@primer/brand-primitives`:

  - `--brand-animation-duration-fast`
  - `--brand-animation-duration-faster`
  - `--brand-animation-easing-glide`

  Example:

  ```diff
  - 0.3s cubic-bezier(0.16, 1, 0.3, 1)
  + var(--brand-animation-duration-fast) var(--brand-animation-easing-default)
  ```

- [#347](https://github.com/primer/brand/pull/347) [`6f8cd9d`](https://github.com/primer/brand/commit/6f8cd9d82abbe447871a78f175e52fad8b502aa4) Thanks [@rezrah](https://github.com/rezrah)! - Added new primitives for the box component

  ```css
  --brand-box-spacing-condensed
  --brand-box-spacing-normal
  --brand-box-spacing-spacious
  ```

## 0.20.1

### Patch Changes

- [#291](https://github.com/primer/brand/pull/291) [`6761ce7`](https://github.com/primer/brand/commit/6761ce70ade87e13691e74b0c5c19ed403732b66) Thanks [@rezrah](https://github.com/rezrah)! - Various security and stability updates.

  No changes to component API's or functionality.

- [#316](https://github.com/primer/brand/pull/316) [`ce31a43`](https://github.com/primer/brand/commit/ce31a4375400fdd7920685f6048de5b622e245d9) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added `Prose` component

  ```jsx
  <Prose
    html={`
      <h2>Prose Component</h2>
      <p>
        The Prose component renders native HTML elements with Primer Brand styling. Prose doesn't sanitize the input data. We recommend sanitizing the data before passing it into Prose. <a href="https://primer.style/brand/components/Prose">Learn more here.</a>
      </p>
  `}
  />
  ```

## 0.20.0

### Minor Changes

- [#276](https://github.com/primer/brand/pull/276) [`9e202d5`](https://github.com/primer/brand/commit/9e202d5eb92ffb1cbf591524c339bf4eae028ed5) Thanks [@rezrah](https://github.com/rezrah)! - Added design tokens for `animation`.

  ```css
  --brand-animation-variant-scaleInLeft-end
  --brand-animation-variant-scaleInLeft-start
  --brand-animation-variant-scaleInLeft-distance
  --brand-animation-variant-scaleInRight-end
  --brand-animation-variant-scaleInRight-start
  --brand-animation-variant-scaleInRight-distance
  --brand-animation-variant-scaleInTop-distance
  --brand-animation-variant-scaleIn-end
  --brand-animation-variant-scaleIn-start
  --brand-animation-variant-scaleInDown-end
  --brand-animation-variant-scaleInDown-start
  --brand-animation-variant-scaleInDown-distance
  --brand-animation-variant-scaleInUp-end
  --brand-animation-variant-scaleInUp-start
  --brand-animation-variant-scaleInUp-distance
  --brand-animation-variant-slideInRight-distance
  --brand-animation-variant-slideInLeft-distance
  --brand-animation-variant-slideInDown-distance
  --brand-animation-variant-slideInUp-distance
  --brand-animation-transition-default
  --brand-animation-easing-default
  --brand-animation-duration-extended
  --brand-animation-duration-default
  ```

## 0.19.0

### Patch Changes

- [#285](https://github.com/primer/brand/pull/285) [`02b1d46`](https://github.com/primer/brand/commit/02b1d46518f2de2dd05a8e5ebc548364ca7a8694) Thanks [@josepmartins](https://github.com/josepmartins)! - Update secondary Button border color in dark themes.

## 0.18.0

### Patch Changes

- [#273](https://github.com/primer/brand/pull/273) [`a226dc6`](https://github.com/primer/brand/commit/a226dc60c76ca0aa0c5d99a4c946fe2bd464c81d) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Changes `Green-blue` and `Red-orange` variants in `Label` colors for improved color contrast:

  ```diff
  - --base-color-scale-green-4
  - --base-color-scale-red-4
  + --base-color-scale-green-5
  + --base-color-scale-red-5
  ```

  Adds high contrast mode support for `Label`

* [#236](https://github.com/primer/brand/pull/236) [`7502285`](https://github.com/primer/brand/commit/75022854417650ef54d166cf476e405910197adf) Thanks [@josepmartins](https://github.com/josepmartins)! - New and updated `River` spacing tokens aiming for a responsive logic in both `gap` and `padding` values of the main container.

  ```diff
  # Updated medium/large gap and margin on pro of a responsive logic (Small/Medium/Large sizes) and inner/outer spacing
  -  --brand-River-gap-column-medium: var(--base-size-32);
  -  --brand-River-gap-column-large: var(--base-size-48);
  +  --brand-River-spacing-inner: var(--base-size-24)/var(--base-size-36)/var(--base-size-48);
  -  --brand-River-layout-margin-vertical: var(--base-size-24);
  +  --brand-River-spacing-outer: var(--base-size-28)/var(--base-size-36)/var(--base-size-48);
  # Updated heading margin
  -  --brand-River-gap-heading-bottom: var(--base-size-8);
  +  --brand-River-heading-margin: var(--base-size-8);
  ```

## 0.17.1

### Patch Changes

- [#258](https://github.com/primer/brand/pull/258) [`d8ab2c9`](https://github.com/primer/brand/commit/d8ab2c9ba74579a98813e568927d792090f13a66) Thanks [@rezrah](https://github.com/rezrah)! - Add `brand` prefix to Grid component design tokens.

  ```diff
  - --grid-spacing-margin
  + --brand-Grid-spacing-margin
  ```

## 0.17.0

### Minor Changes

- [#237](https://github.com/primer/brand/pull/237) [`51e383d`](https://github.com/primer/brand/commit/51e383dd2ccd74bf9c79c3beaf64e99e0a01a0a5) Thanks [@rezrah](https://github.com/rezrah)! - Added `Grid`-specific design tokens.

  ```css
  --grid-spacing-margin
  --grid-spacing-row
  --grid-spacing-column-gap
  ```

## 0.16.1

## 0.16.0

### Minor Changes

- [#220](https://github.com/primer/brand/pull/220) [`d583547`](https://github.com/primer/brand/commit/d58354741fe1e678f030e086b9ba247a66767ba2) Thanks [@josepmartins](https://github.com/josepmartins)! - New `Label` component-specific tokens have been added to the `@primer/brand-primitives` package.

  ```css
      --brand-Label-color-default
      --brand-Label-color-blue
      --brand-Label-color-blue-purple-start
      --brand-Label-color-blue-purple-end
      --brand-Label-color-coral
      --brand-Label-color-green
      --brand-Label-color-green-blue-start
      --brand-Label-color-green-blue-end
      --brand-Label-color-gray
      --brand-Label-color-indigo
      --brand-Label-color-lemon
      --brand-Label-color-lime
      --brand-Label-color-orange
      --brand-Label-color-pink
      --brand-Label-color-pink-blue-start
      --brand-Label-color-pink-blue-end
      --brand-Label-color-purple
      --brand-Label-color-purple-red-start
      --brand-Label-color-purple-red-end
      --brand-Label-color-red
      --brand-Label-color-red-orange-start
      --brand-Label-color-red-orange-end
      --brand-Label-color-teal
      --brand-Label-color-yellow
  ```

## 0.15.1

## 0.15.0

### Minor Changes

- [#217](https://github.com/primer/brand/pull/217) [`cb892f8`](https://github.com/primer/brand/commit/cb892f8890ad22279ef1e25098e9df86f53a427d) Thanks [@rezrah](https://github.com/rezrah)! - New `ActionMenu` component-specific tokens have been added to the `@primer/brand-primitives` package.

  ```css
    --brand-ActionMenu-color-border-rest
    --brand-ActionMenu-color-border-hover
    --brand-ActionMenu-color-border-active
    --brand-ActionMenu-color-item-hover
    --brand-ActionMenu-color-scrollbar-thumb-bg
  ```

## 0.14.0

## 0.13.0

## 0.12.1

## 0.12.0

## 0.11.0

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
