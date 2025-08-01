# @primer/brand-primitives

## 0.57.1

## 0.57.0

### Patch Changes

- [#1113](https://github.com/primer/brand/pull/1113) [`30d9f1f`](https://github.com/primer/brand/commit/30d9f1fb154fb23fb78c6902b0f85bb0db8e0f70) Thanks [@danielguillan](https://github.com/danielguillan)! - Updated the layout of single item `PricingOptions`

## 0.56.3

## 0.56.2

## 0.56.1

## 0.56.0

## 0.55.0

### Minor Changes

- [#1035](https://github.com/primer/brand/pull/1035) [`4b854e6`](https://github.com/primer/brand/commit/4b854e69b5bd9d76a4e5500535716a72802f06f5) Thanks [@danielguillan](https://github.com/danielguillan)! - :warning: Breaking changes to the following design tokens:

  ```diff
  - --brand-LogoSuite-logobar-columnGap
  + --brand-LogoSuite-logobar-columnGap-default
  + --brand-LogoSuite-logobar-columnGap-condensed

  - --brand-LogoSuite-logobar-marquee-gap
  + --brand-LogoSuite-logobar-marquee-gap-default
  + --brand-LogoSuite-logobar-marquee-gap-condensed

  ```

## 0.54.2

### Patch Changes

- [#1034](https://github.com/primer/brand/pull/1034) [`0d3a198`](https://github.com/primer/brand/commit/0d3a1988a39ec97fa92c56815ccead7d22a41e78) Thanks [@rezrah](https://github.com/rezrah)! - Added new tokens for LogoSuite play/pause controls for improved visual contrast and granular customization

  ```diff
  + --brand-LogoSuite-color-control-rest
  + --brand-LogoSuite-color-control-hover
  ```

## 0.54.1

## 0.54.0

## 0.53.0

### Patch Changes

- [#976](https://github.com/primer/brand/pull/976) [`4cdb794`](https://github.com/primer/brand/commit/4cdb7943f5759c7a0bb5dd1499a5c71f7e9c9c6f) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a new `350` step to the typographic scale.

  E.g.

  ```css
  .Some-text {
    font-weight: var(--brand-text-weight-350);
    font-size: var(--brand-text-size-350);
    line-height: var(--brand-text-lineHeight-350);
    letter-spacing: var(--brand-text-letterSpacing-350);
  }
  ```

- [#1002](https://github.com/primer/brand/pull/1002) [`84d8e52`](https://github.com/primer/brand/commit/84d8e52f4b3f4c9a49cb9417f1f4a6c96649264e) Thanks [@danielguillan](https://github.com/danielguillan)! - - Updated styles and layout in `PricingOptions` for a more condensed design.

  - Added new `variant` options to support `gradient` styling in `PricingOptions`: `default-gradient` and `cards-gradient`.

  Usage example:

  ```jsx
  <PricingOptions variant="default-gradient">{/*...*/}</PricingOptions>
  ```

- [#1005](https://github.com/primer/brand/pull/1005) [`dcfdb2c`](https://github.com/primer/brand/commit/dcfdb2c75e76158efb8e9a06898ce652881a55e4) Thanks [@rezrah](https://github.com/rezrah)! - Updated dark mode color values for `canvas.default` and `black.0`

  ```diff
  - --base-color-scale-black-0: #0d1117
  + --base-color-scale-black-0: #000000
  ```

  ```diff
  - --brand-color-canvas-default: var(--base-color-scale-gray-9)
  + --brand-color-canvas-default: var(--base-color-scale-black-0)
  ```

## 0.52.0

### Patch Changes

- [#986](https://github.com/primer/brand/pull/986) [`c9f10ec`](https://github.com/primer/brand/commit/c9f10ec9d5b40a686bb9f5e88ccb22b47153a047) Thanks [@rezrah](https://github.com/rezrah)! - Visual updates to `Button` and `ActionMenu` components.

  - `secondary` button variants now feature lighter border colors.
  - `subtle` button variants now feature a semi-transparent background color in `rest` state.
  - `accent` button variants in dark mode now use a darker hue for parity with its GitHub product counterpart.

## 0.51.1

## 0.51.0

## 0.50.0

### Patch Changes

- [#958](https://github.com/primer/brand/pull/958) [`3b391a5`](https://github.com/primer/brand/commit/3b391a5d2577f5bdd108b78f04bc8ef444118c44) Thanks [@rezrah](https://github.com/rezrah)! - Added new design tokens for a fourth pricing option item

  ```css
  --brand-PricingOptions-items4-container-padding-inline
  --brand-PricingOptions-items4-gap
  ```

- [#955](https://github.com/primer/brand/pull/955) [`2daaff8`](https://github.com/primer/brand/commit/2daaff87503192af74cb54bf37f3eb696c699a23) Thanks [@rezrah](https://github.com/rezrah)! - Added tokens for `accent` and `subtle` button variants.

  ```css
    --brand-button-accent-bgColor-rest
    --brand-button-accent-bgColor-hover
    --brand-button-accent-bgColor-active
    --brand-button-accent-bgColor-disabled
    --brand-button-accent-fgColor-rest
    --brand-button-accent-fgColor-disabled
    --brand-button-subtle-bgColor-rest
    --brand-button-subtle-bgColor-hover
    --brand-button-subtle-bgColor-active
  ```

  Removed the following tokens for `subtle` variant as they are no longer needed:

  ```css
  --brand-button-subtle-borderColor-rest
  --brand-button-subtle-borderColor-hover
  --brand-button-subtle-borderColor-active
  ```

## 0.49.0

## 0.48.0

### Patch Changes

- [#942](https://github.com/primer/brand/pull/942) [`5f31936`](https://github.com/primer/brand/commit/5f319362d85ea79fabf6b5239848cc30503b1ccd) Thanks [@danielguillan](https://github.com/danielguillan)! - Update the default `primary` and `secondary` accent color tokens from `pink` and `purple` to `green` and `yellow`, respectively.

## 0.47.2

## 0.47.1

## 0.47.0

## 0.46.0

### Minor Changes

- [#893](https://github.com/primer/brand/pull/893) [`d3c1ee2a`](https://github.com/primer/brand/commit/d3c1ee2a5fb3d35b9d34d4d11a920cbd8ae7183e) Thanks [@rezrah](https://github.com/rezrah)! - Updated secondary `Button` variant borders from `subtle` to `default` color for improved contrast.

### Patch Changes

- [#883](https://github.com/primer/brand/pull/883) [`965a7865`](https://github.com/primer/brand/commit/965a7865f8f2aa4fd5c6a150ae58bf72c0a457c9) Thanks [@rezrah](https://github.com/rezrah)! - Added new token for river breakout vertical spacing:

  ```
  --brand-River-spacing-innerY
  ```

- [#879](https://github.com/primer/brand/pull/879) [`4f92311f`](https://github.com/primer/brand/commit/4f92311fbae6f6738b12113d0125608bc3d2faa8) Thanks [@rezrah](https://github.com/rezrah)! - Added new accordion toggle color variables

  ```
  --brand-Accordion-toggle-color-default;
  --brand-Accordion-toggle-color-blue;
  --brand-Accordion-toggle-color-blue-purple-start;
  --brand-Accordion-toggle-color-blue-purple-end;
  --brand-Accordion-toggle-color-coral;
  --brand-Accordion-toggle-color-green;
  --brand-Accordion-toggle-color-green-blue-start;
  --brand-Accordion-toggle-color-green-blue-end;
  --brand-Accordion-toggle-color-gray;
  --brand-Accordion-toggle-color-indigo;
  --brand-Accordion-toggle-color-lemon;
  --brand-Accordion-toggle-color-lime;
  --brand-Accordion-toggle-color-orange;
  --brand-Accordion-toggle-color-pink;
  --brand-Accordion-toggle-color-pink-blue-start;
  --brand-Accordion-toggle-color-pink-blue-end;
  --brand-Accordion-toggle-color-purple;
  --brand-Accordion-toggle-color-purple-red-start;
  --brand-Accordion-toggle-color-purple-red-end;
  --brand-Accordion-toggle-color-red;
  --brand-Accordion-toggle-color-red-orange-start;
  --brand-Accordion-toggle-color-red-orange-end;
  --brand-Accordion-toggle-color-teal;
  --brand-Accordion-toggle-color-yellow;
  ```

## 0.45.1

## 0.45.0

### Patch Changes

- [#863](https://github.com/primer/brand/pull/863) [`00ef0694`](https://github.com/primer/brand/commit/00ef06945e2f856335d7b6d613c69e376f28ee0c) Thanks [@rezrah](https://github.com/rezrah)! - Added new design tokens for `Testimonial` and `FrostedGlassVFX` components

  ```
  :root {
    --brand-Testimonial-borderMask-default
    --brand-Testimonial-borderMask-subtle
    --brand-FrostedGlassVFX-bgColor
    --brand-FrostedGlassVFX-boxShadow
    --brand-FrostedGlassVFX-borderMask
    --brand-FrostedGlassVFX-blurIntensity-high
    --brand-FrostedGlassVFX-blurIntensity-medium
    --brand-FrostedGlassVFX-blurIntensity-low
  }
  ```

## 0.44.1

## 0.44.0

## 0.43.0

## 0.42.1

## 0.42.0

### Minor Changes

- [#798](https://github.com/primer/brand/pull/798) [`af335d37`](https://github.com/primer/brand/commit/af335d376b25edfda0feddd7afd45dacf549eeac) Thanks [@joshfarrant](https://github.com/joshfarrant)! - ⚠️ Breaking change: Removed all Card-icon-background/color tokens (eg `--brand-Card-icon-background-blue`, `--brand-Card-icon-color-orange`)

## 0.41.0

### Minor Changes

- [#774](https://github.com/primer/brand/pull/774) [`a6baf41d`](https://github.com/primer/brand/commit/a6baf41dfbb3ac54b12c41ba196b256be3a9315d) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed issue where `Button` component would reflow and break over multiple lines when its text content exceeded the viewport width.

  :warning: Breaking changes to the following design tokens:

  ```diff
  - --brand-control-medium-paddingBlock
  + --brand-control-medium-paddingBlock-normal
  ```

  ```diff
  - --brand-control-large-paddingBlock
  + --brand-control-large-paddingBlock-normal
  ```

  Additional tokens added:

  ```diff
  + --brand-control-medium-paddingBlock-condensed
  + --brand-control-large-paddingBlock-condensed
  ```

### Patch Changes

- [#791](https://github.com/primer/brand/pull/791) [`8105b6a3`](https://github.com/primer/brand/commit/8105b6a31ad61f90a07ca67417552795cf4237c0) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Increased spacing between `River` components on narrow viewports from `28px` to `36px`

- [#769](https://github.com/primer/brand/pull/769) [`41531950`](https://github.com/primer/brand/commit/4153195009f1a0e37b117546b543b476f970245a) Thanks [@danielguillan](https://github.com/danielguillan)! - Adjust text 800 line height

## 0.40.1

### Patch Changes

- [#736](https://github.com/primer/brand/pull/736) [`73cf706e`](https://github.com/primer/brand/commit/73cf706ec83c00c19fbdca4ab4349c7fa931e784) Thanks [@lukasoppermann](https://github.com/lukasoppermann)! - Replaced the `--brand-VideoPlayer-tooltip-padding` design token in the `VideoPlayer` component with two new tokens that separately account for padding along each axis: `--brand-VideoPlayer-tooltip-padding-inline` and `--brand-VideoPlayer-tooltip-padding-block`.

  _Note: This update does not introduce any visual changes. Please update any manual references to `--brand-VideoPlayer-tooltip-padding` to use the new tokens._

  ```diff
  - --brand-VideoPlayer-tooltip-padding
  + --brand-VideoPlayer-tooltip-padding-inline
  + --brand-VideoPlayer-tooltip-padding-block
  ```

- [#738](https://github.com/primer/brand/pull/738) [`f6bab573`](https://github.com/primer/brand/commit/f6bab573c5c7d690c7f49f8b2bfe4b2e8fa49fa9) Thanks [@lukasoppermann](https://github.com/lukasoppermann)! - Fixed line formatting in `functional/size/size-coarse.css` and `functional/size/size-fine.css`

  E.g.

  ```diff
  -    @media (pointer: coarse) { :root {
  -  --brand-controlStack-medium-gap-auto: var(--base-size-12);
  -  --brand-controlStack-small-gap-auto: var(--base-size-16);
  -  --brand-control-minTarget-auto: var(--base-size-44);
  -}}
  +@media (pointer: coarse) {
  +  :root {
  +    --brand-controlStack-medium-gap-auto: var(--base-size-12);
  +    --brand-controlStack-small-gap-auto: var(--base-size-16);
  +    --brand-control-minTarget-auto: var(--base-size-44);
  +  }
  +}
  ```

## 0.40.0

## 0.39.0

### Minor Changes

- [#717](https://github.com/primer/brand/pull/717) [`24fc6d02`](https://github.com/primer/brand/commit/24fc6d0268ca1b12a9c77874fd980a67bdd11089) Thanks [@rezrah](https://github.com/rezrah)! - Change to `xxlarge` breakpoint and the addition of two new base scale size tokens.

  Outcome of an upgrade to Primer Primitives `v9` release.

  ```diff
  + --base-size-2: 0.125rem;
  ```

  ```diff
  + --base-size-6: 0.375rem;
  ```

  ```diff
  - --brand-breakpoint-xxlarge: 90rem;
  + --brand-breakpoint-xxlarge: 87.5rem;
  ```

  ```diff
  - @custom-media --brand-viewportRange-wide-viewport (min-width: 90rem);
  + @custom-media --brand-viewportRange-wide-viewport (min-width: 87.5rem);
  ```

## 0.38.0

### Minor Changes

- [#691](https://github.com/primer/brand/pull/691) [`34e7aa8b`](https://github.com/primer/brand/commit/34e7aa8b5153d5bdb035e2e93119418bd60c0045) Thanks [@joshfarrant](https://github.com/joshfarrant)! - > **Warning**

  > This update contains a breaking visual change to the `LogoSuite` component. `LogoSuite` components without a specified `variant` prop will now automatically apply either `emphasis` or `muted` styles depending on the number of logos in the `LogoBar`.

  - Added new default behaviour to the `variant` prop of the `LogoSuite` component. If `variant` is `undefined` then either `emphasis` or `muted` styles are automatically applied depending on the number of logos in the `LogoBar`. Five or fewer logos apply the `emphasis` style, while six or more use the `muted` style.
  - Reduced `LogoSuite` size on mobile viewports.

## 0.37.0

## 0.36.0

## 0.35.0

### Patch Changes

- [#623](https://github.com/primer/brand/pull/623) [`8727997c`](https://github.com/primer/brand/commit/8727997c876ec59a2a768c4615509afa492b2aa5) Thanks [@rezrah](https://github.com/rezrah)! - Added `--brand-CTABanner-bgColor` token to `CTABanner` for easier customisation of the banners background color, when enabled.

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
