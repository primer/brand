# @primer/brand-primitives

## 0.34.3

### Patch Changes

- [#632](https://github.com/primer/brand/pull/632) [`77b98a4c`](https://github.com/primer/brand/commit/77b98a4c5e399d4e33722ad92e6f54fd730f69d3) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Partial revert of changes to the `LogoSuite` logobar elements.

  To allow optimal treatment of logos based on their respective file formats, `<img>` tag will continue be styled with a CSS filter, whereas inline `<svg>` elements will be styled with CSS fill.

## 0.34.2

## 0.34.1

## 0.34.0

### Minor Changes

- [#547](https://github.com/primer/brand/pull/547) [`9cef031`](https://github.com/primer/brand/commit/9cef031eded3e4345b00c0e95ba6e397f1e31969) Thanks [@mperrotti](https://github.com/mperrotti)! - Adds a Tooltip component.

  Example:

  ```jsx
  <Tooltip text="Hello, Tooltip!">
    <Button>Hover me</Button>
  </Tooltip>
  ```

## 0.33.0

### Patch Changes

- [#566](https://github.com/primer/brand/pull/566) [`eaeb50e`](https://github.com/primer/brand/commit/eaeb50e31e87748c7d1aadcdfa9518c28ee31765) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Adjusted block padding of small button controls from `12px` to `8px`.

  This change affects all small size `Button` and `ActionMenu` instances.

## 0.32.0

## 0.31.0

## 0.30.3

## 0.30.2

## 0.30.1

## 0.30.0

### Minor Changes

- [#507](https://github.com/primer/brand/pull/507) [`2309d7d`](https://github.com/primer/brand/commit/2309d7d5d96c3f390661117d56e77fe828ff0154) Thanks [@langermank](https://github.com/langermank)! - Renames --brand-Image-ratio-custom to --brand-image-aspectRatio

### Patch Changes

- [#506](https://github.com/primer/brand/pull/506) [`3b6eb7b`](https://github.com/primer/brand/commit/3b6eb7b84bca8dab2f1e4957b8605ade4764a9de) Thanks [@langermank](https://github.com/langermank)! - Remove unused ActionMenu color tokens

  Tokens removed:
  --brand-ActionMenu-color-border-rest
  --brand-ActionMenu-color-border-hover
  --brand-ActionMenu-color-border-active

## 0.29.1

## 0.29.0

### Minor Changes

- [#442](https://github.com/primer/brand/pull/442) [`d2408f2`](https://github.com/primer/brand/commit/d2408f23460562e8cabfa5d059444a352fd61cdc) Thanks [@langermank](https://github.com/langermank)! - - Change base color scales to hex instead of hsl

  - Adds new tokens for `VideoPlayer`

- [#487](https://github.com/primer/brand/pull/487) [`6cdeba7`](https://github.com/primer/brand/commit/6cdeba7bbf3bc2a1ba2eb4483cb15a63744f8525) Thanks [@rezrah](https://github.com/rezrah)! - New tokens available for the new eyebrow banner component:

  ```css
  --brand-Eyebrowbanner-bgColor-rest
  --brand-Eyebrowbanner-borderColor-rest
  --brand-Eyebrowbanner-heading-fgColor
  --brand-Eyebrowbanner-subHeading-fgColor
  --brand-Eyebrowbanner-icon-background-default
  --brand-Eyebrowbanner-icon-background-blue
  --brand-Eyebrowbanner-icon-background-coral
  --brand-Eyebrowbanner-icon-background-green
  --brand-Eyebrowbanner-icon-background-gray
  --brand-Eyebrowbanner-icon-background-indigo
  --brand-Eyebrowbanner-icon-background-lemon
  --brand-Eyebrowbanner-icon-background-lime
  --brand-Eyebrowbanner-icon-background-orange
  --brand-Eyebrowbanner-icon-background-pink
  --brand-Eyebrowbanner-icon-background-purple
  --brand-Eyebrowbanner-icon-background-red
  --brand-Eyebrowbanner-icon-background-teal
  --brand-Eyebrowbanner-icon-background-yellow
  --brand-Eyebrowbanner-fgColor-default-start
  --brand-Eyebrowbanner-fgColor-default-middle
  --brand-Eyebrowbanner-fgColor-default-end
  --brand-Eyebrowbanner-fgColor-blue
  --brand-Eyebrowbanner-fgColor-blue-purple-start
  --brand-Eyebrowbanner-fgColor-blue-purple-end
  --brand-Eyebrowbanner-fgColor-coral
  --brand-Eyebrowbanner-fgColor-green
  --brand-Eyebrowbanner-fgColor-green-blue-start
  --brand-Eyebrowbanner-fgColor-green-blue-end
  --brand-Eyebrowbanner-fgColor-gray
  --brand-Eyebrowbanner-fgColor-indigo
  --brand-Eyebrowbanner-fgColor-lemon
  --brand-Eyebrowbanner-fgColor-lime
  --brand-Eyebrowbanner-fgColor-orange
  --brand-Eyebrowbanner-fgColor-pink
  --brand-Eyebrowbanner-fgColor-pink-blue-start
  --brand-Eyebrowbanner-fgColor-pink-blue-end
  --brand-Eyebrowbanner-fgColor-purple
  --brand-Eyebrowbanner-fgColor-purple-red-start
  --brand-Eyebrowbanner-fgColor-purple-red-end
  --brand-Eyebrowbanner-fgColor-red
  --brand-Eyebrowbanner-fgColor-red-orange-start
  --brand-Eyebrowbanner-fgColor-red-orange-end
  --brand-Eyebrowbanner-fgColor-teal
  --brand-Eyebrowbanner-fgColor-yellow
  ```

  :link: [Read the documentation for examples of this component](https://primer.style/brand/components/EyebrowBanner)

## 0.28.1

## 0.28.0

### Patch Changes

- [#457](https://github.com/primer/brand/pull/457) [`9ea0803`](https://github.com/primer/brand/commit/9ea08039caee4679b22d283013f4fb3beb48436c) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Fixed issue with prose un-ordered lists in dark mode

- [#479](https://github.com/primer/brand/pull/479) [`1896326`](https://github.com/primer/brand/commit/1896326cd84137409b87c402addad9bc8ace9772) Thanks [@rezrah](https://github.com/rezrah)! - Increase tracking of 100 typographic position to improve readability

## 0.27.2

## 0.27.1

## 0.27.0

### Minor Changes

- [#428](https://github.com/primer/brand/pull/428) [`6141bff`](https://github.com/primer/brand/commit/6141bff7ea7354afc78b3d5f29c842e7f569bfe0) Thanks [@josepmartins](https://github.com/josepmartins)! - Removes old control border radius tokens

  ```diff
  -  --brand-control-border-radius
  -  --brand-control-large-borderRadius
  -  --brand-control-medium-borderRadius
  ```

  Modifies border radius scale values and adds new `xlarge` border radius option to the scale

  ```diff
  + --brand-borderRadius-small: 4px
  + --brand-borderRadius-medium: 8px
  + --brand-borderRadius-large: 16px
  + --brand-borderRadius-xlarge: 24px
  ```

- [#431](https://github.com/primer/brand/pull/431) [`2243ae4`](https://github.com/primer/brand/commit/2243ae4f651189e882ab5d7806f3132ca27c4de7) Thanks [@rezrah](https://github.com/rezrah)! - Fix erroneous `InlineLink` appearance on multiline.

  Removed the following design tokens:

  ```diff
  - --brand-InlineLink-transition-scale-start
  - --brand-InlineLink-transition-scale-end
  ```

## 0.26.0

### Patch Changes

- [#423](https://github.com/primer/brand/pull/423) [`9299f25`](https://github.com/primer/brand/commit/9299f25b722bb4f29f2f31e0614046bc387cc1c6) Thanks [@josepmartins](https://github.com/josepmartins)! - Add inner spacing values for RiverBreakout. Uses 64px in desktop, 48px in tablet and 40px in mobile.

  `--brand-RiverBreakout-spacing-inner`

## 0.25.0

### Minor Changes

- [#392](https://github.com/primer/brand/pull/392) [`6003ba5`](https://github.com/primer/brand/commit/6003ba572bbda10095d7998079483f8776cce4a5) Thanks [@langermank](https://github.com/langermank)! - - Update Button, TextInput, and Select size options

  - Update Button color variant designs for site refactor
  - Update `control` token sizing
  - Remove `Button` design tokens and replace with new options

  Tokens removed:

  - --brand-Button-background-base
  - --brand-Button-background-overlay
  - --brand-Button-background-disabled
  - --brand-Button-fg-primary-disabled
  - --brand-Button-fg-secondary-disabled
  - --brand-Button-shadow-primary-default
  - --brand-Button-shadow-primary-hover
  - --brand-Button-shadow-secondary-default
  - --brand-Button-shadow-secondary-hover
  - --brand-Button-shadow-subtle-hover
  - --brand-Button-shadow-focus
  - --brand-Button-background-base
  - --brand-Button-background-overlay
  - --brand-Button-background-disabled
  - --brand-Button-fg-primary-disabled
  - --brand-Button-fg-secondary-disabled
  - --brand-Button-shadow-primary-default
  - --brand-Button-shadow-primary-hover
  - --brand-Button-shadow-secondary-default
  - --brand-Button-shadow-secondary-hover
  - --brand-Button-shadow-subtle-hover
  - --brand-Button-shadow-focus

- [#410](https://github.com/primer/brand/pull/410) [`8933e19`](https://github.com/primer/brand/commit/8933e19c19b2bd244f446c6dbd8713f0be709b4e) Thanks [@rezrah](https://github.com/rezrah)! - Updated tokens for FAQ

  ```diff
  - --brand-FAQ-maxWidth;
  + --brand-FAQ-maxWidth-list
  ```

  New tokens:

  ```css
  --brand-FAQ-color-tabBg-selected
  ```

### Patch Changes

- [#416](https://github.com/primer/brand/pull/416) [`d36709d`](https://github.com/primer/brand/commit/d36709d170f3ffe0f81cf74f318b423aaaef1bcf) Thanks [@rezrah](https://github.com/rezrah)! - Added new design tokens for Accordion

  ```css
  --brand-Accordion-border-color-default
  --brand-Accordion-border-color-emphasis
  ```

## 0.24.0

### Minor Changes

- [#394](https://github.com/primer/brand/pull/394) [`c9029d4`](https://github.com/primer/brand/commit/c9029d4a69f7f0311c008a2af4b6124642145369) Thanks [@mperrotti](https://github.com/mperrotti)! - Adds RiverBreakout component and its supporting design tokens.

  Usage example:

  ```jsx
  <RiverBreakout>
    <RiverBreakout.A11yHeading>Accelerate workflows</RiverBreakout.A11yHeading>
    <RiverBreakout.Visual>
      <PlaceholderImage />
    </RiverBreakout.Visual>
    <RiverBreakout.Content
      trailingComponent={() => {
        ;<div>Trailing component</div>
      }}
    >
      <Text>
        Accelerate your workflows and scale your business fast with access to millions of open source projects on
        GitHub, the largest source code host.
      </Text>
      <Link href="#">Call to action</Link>
    </RiverBreakout.Content>
  </RiverBreakout>
  ```

  See the [Storybook](https://primer.style/brand/storybook/?path=/story/components-river-features--with-breakout)

## 0.23.0

## 0.22.0

### Minor Changes

- [#362](https://github.com/primer/brand/pull/362) [`db9e54d`](https://github.com/primer/brand/commit/db9e54da130fd33f6908847113d9a2b2a82ff41e) Thanks [@rezrah](https://github.com/rezrah)! - Added design tokens for the logo suite component

  ```css
  --brand-LogoSuite-color-logo-muted
  --brand-LogoSuite-color-logo-emphasis
  --brand-LogoSuite-logobar-marquee-gap
  --brand-LogoSuite-logobar-marquee-slow
  --brand-LogoSuite-logobar-marquee-default
  --brand-LogoSuite-logobar-rowGap
  --brand-LogoSuite-logobar-columnGap
  ```

### Patch Changes

- [#374](https://github.com/primer/brand/pull/374) [`52abf2f`](https://github.com/primer/brand/commit/52abf2fe33bb7b4a96f5f9340177e20b600c004b) Thanks [@josepmartins](https://github.com/josepmartins)! - Adjust dark mode color shade in icons (used in `Card` and `Pillar` components) and `Label` component.

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
