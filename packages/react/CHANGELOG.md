# @primer/react-brand

## 0.38.0

### Minor Changes

- [#691](https://github.com/primer/brand/pull/691) [`34e7aa8b`](https://github.com/primer/brand/commit/34e7aa8b5153d5bdb035e2e93119418bd60c0045) Thanks [@joshfarrant](https://github.com/joshfarrant)! - > **Warning**

  > This update contains a breaking visual change to the `LogoSuite` component. `LogoSuite` components without a specified `variant` prop will now automatically apply either `emphasis` or `muted` styles depending on the number of logos in the `LogoBar`.

  - Added new default behaviour to the `variant` prop of the `LogoSuite` component. If `variant` is `undefined` then either `emphasis` or `muted` styles are automatically applied depending on the number of logos in the `LogoBar`. Five or fewer logos apply the `emphasis` style, while six or more use the `muted` style.
  - Reduced `LogoSuite` size on mobile viewports.

### Patch Changes

- [#694](https://github.com/primer/brand/pull/694) [`5f1181be`](https://github.com/primer/brand/commit/5f1181becf5d32e36176dbf8d83da8794034feef) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved screen reader accuracy of column indexes in `ComparisonTable`.

## 0.37.0

### Minor Changes

- [#684](https://github.com/primer/brand/pull/684) [`e382a491`](https://github.com/primer/brand/commit/e382a4919c5f98637cb47c68311e625218b7cd40) Thanks [@danielguillan](https://github.com/danielguillan)! - Extend `Hero.Heading` and `Heading.Description` length.

  > **Warning**
  > This change can lead to reduced contrast in certain situations. Please manually review all instances of the `Hero` - particularly those that use a background image - to ensure that minimum contrast requirements are met.

### Patch Changes

- [#695](https://github.com/primer/brand/pull/695) [`2bb68ea7`](https://github.com/primer/brand/commit/2bb68ea73febfaf3d4dfae60c8e31e9de26709af) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `ComparisonTable` featured columns now identify themselves to screen readers by appending the text `featured` to the column title. This text can be customized using the `visuallyHiddenFeaturedLabel` prop.

- [#677](https://github.com/primer/brand/pull/677) [`c76c8c87`](https://github.com/primer/brand/commit/c76c8c871e1f37b1f94a8c679807ddf5a67f8a61) Thanks [@rezrah](https://github.com/rezrah)! - Removed redundant styles in default `Section` and `BreakoutBanner` components

- [#688](https://github.com/primer/brand/pull/688) [`55a353c7`](https://github.com/primer/brand/commit/55a353c782c827f2cfbb333b8ddda12d1001f920) Thanks [@rezrah](https://github.com/rezrah)! - Added experimental `TextRevealAnimation` component.

- [#688](https://github.com/primer/brand/pull/688) [`55a353c7`](https://github.com/primer/brand/commit/55a353c782c827f2cfbb333b8ddda12d1001f920) Thanks [@rezrah](https://github.com/rezrah)! - Remove strict, custom typings for `Testimonial.Quote`

- [#679](https://github.com/primer/brand/pull/679) [`30f717dd`](https://github.com/primer/brand/commit/30f717dd2f196f1c6c5065cf3ad046fa79fc84a7) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed an issue where `SubNav` submenus were not accessible through keyboard navigation

## 0.36.0

### Minor Changes

- [#654](https://github.com/primer/brand/pull/654) [`ca967a49`](https://github.com/primer/brand/commit/ca967a498ae666bad017b18019a1df9a081835f9) Thanks [@danielguillan](https://github.com/danielguillan)! - Added `Section` component

  Example:

  ```jsx
  <Section
    paddingBlockStart="condensed"
    paddingBlockEnd="spacious"
    backgroundImage="my-background.png"
    backgroundImageSize="cover"
    backgroundImagePosition="top center"
  >
    {/* Section content */}
  </Section>
  ```

  🔗 [See the documentation for more examples](https://primer.style/brand/components/Section)

- [#664](https://github.com/primer/brand/pull/664) [`ccd37a50`](https://github.com/primer/brand/commit/ccd37a50753c71ab5ff33a4da4ccbdfe4caa9168) Thanks [@rezrah](https://github.com/rezrah)! - `PricingOptions` now applies the `subtle` background color by default. This is to ensure adequate contrast on a standard `canvas-default` background.

  To apply the previous `default` background color (or custom color), you may override a new design token that has been provided for this reason: `--brand-PricingOptions-item-bgColor`.

- [#672](https://github.com/primer/brand/pull/672) [`61d72605`](https://github.com/primer/brand/commit/61d726056a675eb5acceaf8817dcb8ab43c6af9d) Thanks [@rezrah](https://github.com/rezrah)! - New breakout banner component generally available

  ```js
  import {BreakoutBanner} from '@primer/react-brand'
  ```

  ```jsx
  <BreakoutBanner>
    <BreakoutBanner.Heading>Where the most ambitious teams build great things</BreakoutBanner.Heading>
    <BreakoutBanner.LinkGroup>
      <Link href="#">Primary action</Link>
    </BreakoutBanner.LinkGroup>
  </BreakoutBanner>
  ```

  :link: [Read the documentation for usage guidelines and examples](https://primer.style/brand/components/BreakoutBanner)

### Patch Changes

- [#659](https://github.com/primer/brand/pull/659) [`6f2949b5`](https://github.com/primer/brand/commit/6f2949b5018fd811743df0e4f098734d42f5ce3e) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added `tabAttributes` prop to `FAQGroup` component. This prop is used to set arbitrary attributes on the tabs rendered by the `FAQGroup` component.

  For example, the below code will add `data-analytics="tab-0"` to the first tab and `data-analytics="tab-1"` to the second tab.

  ```tsx
  <FAQGroup
    tabAttributes={(children, index) => ({
      'data-analytics': `tab-${index}`,
    })}
  >
    <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
    <FAQ>
      <FAQ.Heading>Using GitHub Enterprise</FAQ.Heading>
      <FAQ.Item>...</FAQ.Item>
      <FAQ.Item>...</FAQ.Item>
      <FAQ.Item>...</FAQ.Item>
    </FAQ>

    <FAQ>
      <FAQ.Heading>About GitHub Enterprise</FAQ.Heading>
      <FAQ.Item>...</FAQ.Item>
      <FAQ.Item>...</FAQ.Item>
      <FAQ.Item>...</FAQ.Item>
    </FAQ>
  </FAQGroup>
  ```

- [#668](https://github.com/primer/brand/pull/668) [`9cb14ed3`](https://github.com/primer/brand/commit/9cb14ed3cecde3bc0602f72050622fbe65374e90) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed misalignment of FormControl.Validation icon

- [#667](https://github.com/primer/brand/pull/667) [`3010db67`](https://github.com/primer/brand/commit/3010db67a37146808ae397c7e9880024ef031577) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed bug with VideoPlayer component where a '0' could be seen in the bottom-left corner during the first render

- [#669](https://github.com/primer/brand/pull/669) [`67fdd2d6`](https://github.com/primer/brand/commit/67fdd2d62577492dc2e5ecd3b5b8c93a508f8072) Thanks [@rezrah](https://github.com/rezrah)! - Fixed inability to forward `name` props to the `Select` component when used inside a `FormControl`.

- [#660](https://github.com/primer/brand/pull/660) [`8f8181b7`](https://github.com/primer/brand/commit/8f8181b7a1456fd1231fdd5b70edcb77d8de4b3d) Thanks [@rezrah](https://github.com/rezrah)! - Fixed width of the focus outline in the `Select` component to fill the entire width of the control when `fullWidth` option has bene applied.

## 0.35.0

### Minor Changes

- [#634](https://github.com/primer/brand/pull/634) [`598a2c5d`](https://github.com/primer/brand/commit/598a2c5d936397539c58466e18111161297b37de) Thanks [@joshfarrant](https://github.com/joshfarrant)! - ⚠️ This update contains a breaking change.

  Refactored `VideoPlayer` component to make it more modular and customisable.

  - The `showTitle` prop has been renamed to `visuallyHiddenTitle` and inverted.
    - This prop hides the title visually, but keeps it accessible to screen readers.
    - Where you previously passed `showTitle={false}`, you should now pass `visuallyHiddenTitle={true}`.
  - The `branding` prop has been renamed to `showBranding`.
  - Individual video controls can be optionally hidden by setting any of the `showPlayPauseButton`, `showSeekControl`, `showCCButton`, `showMuteButton`, `showVolumeControl`, and `showFullScreenButton` props to `false`.
  - A custom play icon can be provided using the `playIcon` prop.

### Patch Changes

- [#623](https://github.com/primer/brand/pull/623) [`8727997c`](https://github.com/primer/brand/commit/8727997c876ec59a2a768c4615509afa492b2aa5) Thanks [@rezrah](https://github.com/rezrah)! - Added `fullWidth` prop to `Hero.Heading` to remove default max-width constraint, and enabling easier placement using a parent `Grid`.

- [#623](https://github.com/primer/brand/pull/623) [`8727997c`](https://github.com/primer/brand/commit/8727997c876ec59a2a768c4615509afa492b2aa5) Thanks [@rezrah](https://github.com/rezrah)! - Added `RiverStoryScroll` component, an experimental layout component that wraps around existing `River` patterns.

  ```jsx
  <RiverStoryScroll>
    <River>
      <River.Visual />
      <River.Content />
    </River>
    <River>
      <River.Visual />
      <River.Content />
    </River>
    <River>
      <River.Visual />
      <River.Content />
    </River>
  </RiverStoryScroll>
  ```

  :link: [See Storybook for more examples.](https://primer.style/brand/storybook/?path=/story/components-riverstoryscroll--default)

- [#647](https://github.com/primer/brand/pull/647) [`39e00cfa`](https://github.com/primer/brand/commit/39e00cfa478d6247c5f769577168a704695e35aa) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added `isExternal` prop to `SubdomainNavBar.Link` component. When `isExternal` is `true`, a [link-external](https://primer.style/foundations/icons/link-external-16) icon is displayed next to the link.

- [#644](https://github.com/primer/brand/pull/644) [`b3f1f364`](https://github.com/primer/brand/commit/b3f1f364473025aa0cfa46ec49094f521998e8ea) Thanks [@danielguillan](https://github.com/danielguillan)! - Improve the layout responsiveness of SubdomainNavBar

- [#639](https://github.com/primer/brand/pull/639) [`ebf92224`](https://github.com/primer/brand/commit/ebf92224234e6a54a979f58a86727997935adbd3) Thanks [@stamat](https://github.com/stamat)! - Fix cut AnchorNav action button outline due the introduced overflow auto

- [#646](https://github.com/primer/brand/pull/646) [`81e983e6`](https://github.com/primer/brand/commit/81e983e67b34d03dac86f0797b817c8de639b29e) Thanks [@rezrah](https://github.com/rezrah)! - Adds responsive toggling of feature lists in the `PricingOptions` component.

  `PricingOptions.FeatureList` can now be collapsed at regular and wide viewports.

  ```jsx
  <PricingOptions>
    <PricingOptions.Item>
      <PricingOptions.FeatureList expanded={{narrow: true, regular: true, wide: true}} />
    </PricingOptions.Item>
  </PricingOptions>
  ```

- [#623](https://github.com/primer/brand/pull/623) [`8727997c`](https://github.com/primer/brand/commit/8727997c876ec59a2a768c4615509afa492b2aa5) Thanks [@rezrah](https://github.com/rezrah)! - Added `--brand-CTABanner-bgColor` token to `CTABanner` for easier customisation of the banners background color, when enabled.

## 0.34.3

### Patch Changes

- [#632](https://github.com/primer/brand/pull/632) [`77b98a4c`](https://github.com/primer/brand/commit/77b98a4c5e399d4e33722ad92e6f54fd730f69d3) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Partial revert of changes to the `LogoSuite` logobar elements.

  To allow optimal treatment of logos based on their respective file formats, `<img>` tag will continue be styled with a CSS filter, whereas inline `<svg>` elements will be styled with CSS fill.

- [#637](https://github.com/primer/brand/pull/637) [`8887dc37`](https://github.com/primer/brand/commit/8887dc377360d0124b27398738a4297a42afa2f2) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixes previously non-functional `aspectRatio` prop on `Image` component

- [#636](https://github.com/primer/brand/pull/636) [`3a76bfba`](https://github.com/primer/brand/commit/3a76bfba698051f6530f52c0180e4c1748df14c3) Thanks [@rezrah](https://github.com/rezrah)! - Added `Statistic` component.

  Use the statistic component to display concise numerical information.

  ```jsx
  <Statistic>
    <Statistic.Heading>+25%</Statistic.Heading>
    <Statistic.Description>increase in developer speed</Statistic.Description>
  </Statistic>
  ```

  See the [documentation](https://primer.style/brand/components/Statistic) for more usage examples.

## 0.34.2

### Patch Changes

- [#595](https://github.com/primer/brand/pull/595) [`d0c1630`](https://github.com/primer/brand/commit/d0c1630576f5ed2882f0be3d423dc23fe72d0c6d) Thanks [@stamat](https://github.com/stamat)! - `AnchorNav` accessibility improvements.

  - Removed JS-augmented scrolling behavior in `AnchorNav`, reverting to browser-defaults.
  - Fixed zoom-related bug where certain anchor nav items were not visible.

- [#629](https://github.com/primer/brand/pull/629) [`03237fa`](https://github.com/primer/brand/commit/03237fad26e57d986d390beb123730bf949f11ea) Thanks [@stamat](https://github.com/stamat)! - Updated `FAQGroup` autofocusing conditions

- [#622](https://github.com/primer/brand/pull/622) [`3450e4b`](https://github.com/primer/brand/commit/3450e4bea7b1bf063f4b6eba9bef6f7ec39fa82b) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved keyboard navigation in mobile `AnchorNav` component. Arrow key navigation has been replaced with tab navigation.

- [#630](https://github.com/primer/brand/pull/630) [`809960b`](https://github.com/primer/brand/commit/809960bf52b2787b92bc053518e45c21420ed181) Thanks [@joshfarrant](https://github.com/joshfarrant)! - In `Image` component, the `height` prop is now correctly forwarded to the underlying `img` element, when using `as="picture" customization.

## 0.34.1

### Patch Changes

- [#606](https://github.com/primer/brand/pull/606) [`66c3049`](https://github.com/primer/brand/commit/66c3049de040c729c91e44101d1231c689a222d3) Thanks [@rezrah](https://github.com/rezrah)! - Added new `fullWidth` prop to `Card` component for easier placement in narrow viewports. This elimates the requirement for end-users to author additional custom CSS to achieve the same effect.

  ```jsx
  <Card fullWidth href="https://github.com">
    <Card.Image />
    <Card.Heading />
    <Card.Description />
  </Card>
  ```

- [#596](https://github.com/primer/brand/pull/596) [`ae20ce8`](https://github.com/primer/brand/commit/ae20ce841dce3666ee929314c30fcf360e2487a8) Thanks [@stamat](https://github.com/stamat)! - Improved keyboard navigation for tab lists in the `FAQ Groups` component. Now features focus trapping, and `up` and `down` keypress navigation as specified in the ARIA tab panel pattern.

- [#594](https://github.com/primer/brand/pull/594) [`d0fbb4a`](https://github.com/primer/brand/commit/d0fbb4a997f7135c40ae2a46d560585e8e47fc70) Thanks [@stamat](https://github.com/stamat)! - In `Bento`, the `Bento.Visual` will now respect the aspect ratio of the original image instead of cropping it.

  Individual Bento sections will now expand beyond their initial size to fit the content within them.

  If you've previously used this component, please verify that this change doesn't alter the flow of your document.

- [#611](https://github.com/primer/brand/pull/611) [`7e90641`](https://github.com/primer/brand/commit/7e90641b89807f22b9f2e27c02db3dfd931e6af9) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Resolved an issue with the `AnchorNav` component where focus would become trapped on mobile

- [#616](https://github.com/primer/brand/pull/616) [`f12b8b3`](https://github.com/primer/brand/commit/f12b8b35fd791330cfab3209b432c1fbf4ff837d) Thanks [@rezrah](https://github.com/rezrah)! - Updated all instances of `<Text />` in River components to use `muted` color instead of `default` by default, for improved visual hierarchy.

  > **Warning**
  > This is a visual breaking change to the `River` component. This can lead to reduced contrast in some situations, so please review all usages to ensure minimum contrast requirements are met.

- [#597](https://github.com/primer/brand/pull/597) [`1c4a0f3`](https://github.com/primer/brand/commit/1c4a0f3ef790dfa222e51521280b0cd04c7be33e) Thanks [@stamat](https://github.com/stamat)! - Added `idle` speed to LogoSuite marquee animation

- [#614](https://github.com/primer/brand/pull/614) [`67d0af9`](https://github.com/primer/brand/commit/67d0af9fc3ef5eb81a5c3d49f4b02b1a159ec1f7) Thanks [@rezrah](https://github.com/rezrah)! - Added multiline code block support to `Prose` using `<pre>` and `<code>` HTML elements.

- [#599](https://github.com/primer/brand/pull/599) [`e21a6b1`](https://github.com/primer/brand/commit/e21a6b1b44eca971b5444ef1b5b2e27cf64b628a) Thanks [@rfearing](https://github.com/rfearing)! - Added raster image support to `LogoSuite` component

- [#615](https://github.com/primer/brand/pull/615) [`c8d9117`](https://github.com/primer/brand/commit/c8d91173c51a0c9db951fd664498d43a6f48fdf8) Thanks [@rezrah](https://github.com/rezrah)! - Added `pageAttributesBuilder` prop to `Pagination` component to enable forwarding of custom data attributes to paged items.

  ```jsx live
  <Pagination
    pageCount={3}
    currentPage={1}
    pageAttributesBuilder={n => {
      return {
        'data-custom-attribute': `custom-attribute-${n}`,
      }
    }}
  />
  ```

  :link: [See documentation for more details](https://primer.style/brand/components/Pagination#custom-data-attributes)

- [#614](https://github.com/primer/brand/pull/614) [`67d0af9`](https://github.com/primer/brand/commit/67d0af9fc3ef5eb81a5c3d49f4b02b1a159ec1f7) Thanks [@rezrah](https://github.com/rezrah)! - Fixed incorrect background color applied to inline `<code>` instances in Prose in dark color mode

- [#610](https://github.com/primer/brand/pull/610) [`cf7e09e`](https://github.com/primer/brand/commit/cf7e09e061d0e94398c081261d18e42ea3439bb7) Thanks [@rezrah](https://github.com/rezrah)! - Fixed line wrapping in `SubNav.Heading`

## 0.34.0

### Minor Changes

- [#547](https://github.com/primer/brand/pull/547) [`9cef031`](https://github.com/primer/brand/commit/9cef031eded3e4345b00c0e95ba6e397f1e31969) Thanks [@mperrotti](https://github.com/mperrotti)! - Adds a Tooltip component.

  Example:

  ```jsx
  <Tooltip text="Hello, Tooltip!">
    <Button>Hover me</Button>
  </Tooltip>
  ```

### Patch Changes

- [#588](https://github.com/primer/brand/pull/588) [`a600e38`](https://github.com/primer/brand/commit/a600e38c37851cb7c48561ccd9d19f9db26dce42) Thanks [@rezrah](https://github.com/rezrah)! - Added larger row gaps in `Grid` at wider breakpoints, which were previously missing. Now consistent with column gaps.

- [#587](https://github.com/primer/brand/pull/587) [`16b87f1`](https://github.com/primer/brand/commit/16b87f134d613072a62268a275edb443842d0f51) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Add `trailingComponent` prop to CTABanner

- [#588](https://github.com/primer/brand/pull/588) [`a600e38`](https://github.com/primer/brand/commit/a600e38c37851cb7c48561ccd9d19f9db26dce42) Thanks [@rezrah](https://github.com/rezrah)! - Added `borderRadius` prop to `Image` component.

- [#588](https://github.com/primer/brand/pull/588) [`a600e38`](https://github.com/primer/brand/commit/a600e38c37851cb7c48561ccd9d19f9db26dce42) Thanks [@rezrah](https://github.com/rezrah)! - Added new `monospace` option to `Heading` and `Text` `font` property.

- [#584](https://github.com/primer/brand/pull/584) [`682df70`](https://github.com/primer/brand/commit/682df70adbd5cef1af5ca8f47ba9437c4831ef4b) Thanks [@mgriffin](https://github.com/mgriffin)! - Adds a missing space around font-size calculation in the IDE component

- [#588](https://github.com/primer/brand/pull/588) [`a600e38`](https://github.com/primer/brand/commit/a600e38c37851cb7c48561ccd9d19f9db26dce42) Thanks [@rezrah](https://github.com/rezrah)! - Added `minimal` Card variant, allowing for alternative presentation, with minimal internal padding.

  ```jsx
  <Card ctaText="Discover how" href="https://github.com" variant="minimal">
    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
    <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
  </Card>
  ```

- [#588](https://github.com/primer/brand/pull/588) [`a600e38`](https://github.com/primer/brand/commit/a600e38c37851cb7c48561ccd9d19f9db26dce42) Thanks [@rezrah](https://github.com/rezrah)! - - Reduced sizes for all headings in Prose by two positions on the type scale. E.g. `h2` previously `64px`, now `40px`.

  - Added `editorial` variant to Prose for alternative presentation. Provides more relaxed spacing and presentation for child elements.

- [#585](https://github.com/primer/brand/pull/585) [`a033995`](https://github.com/primer/brand/commit/a033995d1277e4bf464b471a3d75c55f270b7a79) Thanks [@MelissaPastore](https://github.com/MelissaPastore)! - Update SubNav stylesheet to exclude Subnav links with aria-current set to "false" from active link styling

## 0.33.0

### Minor Changes

- [#575](https://github.com/primer/brand/pull/575) [`89d6590`](https://github.com/primer/brand/commit/89d659084eedb60ebeea198ead43dd0f89a4fac0) Thanks [@rezrah](https://github.com/rezrah)! - New pagination component generally available

  ```jsx
  <Pagination pageCount={15} currentPage={5} />
  ```

  :link: [Read the documentation for more examples](https://primer.style/brand/components/Pagination)

- [#574](https://github.com/primer/brand/pull/574) [`95f15ba`](https://github.com/primer/brand/commit/95f15ba12156aa3ce11b5e436c9bcf10747ff1ff) Thanks [@rezrah](https://github.com/rezrah)! - New breadcrumbs component generally available

  ```jsx
  <Breadcrumbs>
    <Breadcrumbs.Item href="/">Resources</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot">GitHub Copilot</Breadcrumbs.Item>
    <Breadcrumbs.Item href="/copilot/chat" selected>
      Chat
    </Breadcrumbs.Item>
  </Breadcrumbs>
  ```

  :link: [Read the documentation for more examples](https://primer.style/brand/components/Breadcrumbs)

- [#555](https://github.com/primer/brand/pull/555) [`3980daa`](https://github.com/primer/brand/commit/3980daa4a492aefcd5e151e5451200d9ac6f9b43) Thanks [@rezrah](https://github.com/rezrah)! - Added new `IDE` component

  Example:

  ```jsx
  <IDE alternativeText="description of the IDE, including any animations for users of assistive technologies">
    <IDE.Editor />
    <IDE.Chat />
  </IDE>
  ```

  🔗 [See the documentation for more examples](https://primer.style/brand/components/IDE)

### Patch Changes

- [#568](https://github.com/primer/brand/pull/568) [`40a129d`](https://github.com/primer/brand/commit/40a129d78024612b625238d8a826fc06aa933465) Thanks [@rezrah](https://github.com/rezrah)! - Added support for optional `Button` and sub menu's in `SubNav` component.

  Also added `fullWidth` prop to optionally remove the default component padding.

  ```jsx
  <SubNav>
    <SubNav.Heading href="#">Heading</SubNav.Heading>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Link
      <SubNav.SubMenu>
        <SubNav.Link href="#">Link feature one</SubNav.Link>
        <SubNav.Link href="#">Link feature two</SubNav.Link>
        <SubNav.Link href="#">Link feature three</SubNav.Link>
        <SubNav.Link href="#">Link feature four</SubNav.Link>
      </SubNav.SubMenu>
    </SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Link href="#">Link</SubNav.Link>
    <SubNav.Action href="#" variant="secondary">
      Optional CTA
    </SubNav.Action>
  </SubNav>
  ```

- [#566](https://github.com/primer/brand/pull/566) [`eaeb50e`](https://github.com/primer/brand/commit/eaeb50e31e87748c7d1aadcdfa9518c28ee31765) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Adjusted block padding of small button controls from `12px` to `8px`.

  This change affects all small size `Button` and `ActionMenu` instances.

- [#575](https://github.com/primer/brand/pull/575) [`89d6590`](https://github.com/primer/brand/commit/89d659084eedb60ebeea198ead43dd0f89a4fac0) Thanks [@rezrah](https://github.com/rezrah)! - Added `none` optiona to `arrowDirection` prop of `Link` component. This value removes the arrow entirely.

  ```jsx
  <Link arrowDirection="none" {...rest} />
  ```

- [#573](https://github.com/primer/brand/pull/573) [`e76c92b`](https://github.com/primer/brand/commit/e76c92b73cb428c64cd14324d1a7a7fbe48c8daf) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Add `trailingComponent` prop to Hero

## 0.32.0

### Minor Changes

- [#530](https://github.com/primer/brand/pull/530) [`a9f0c1a`](https://github.com/primer/brand/commit/a9f0c1a034060e56ac00966792dd50a85fd2a0b8) Thanks [@danielguillan](https://github.com/danielguillan)! - New pricing options component now generally available

  ```jsx
  <PricingOptions>
    <PricingOptions.Item>
      <PricingOptions.Label>Recommended</PricingOptions.Label>
      <PricingOptions.Heading>Copilot</PricingOptions.Heading>
      <PricingOptions.Description>Copilot in the coding environment.</PricingOptions.Description>
      <PricingOptions.Price currencySymbol="$" trailingText="per month / $100 per year">
        10
      </PricingOptions.Price>
      <PricingOptions.FeatureList>
        <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
      </PricingOptions.FeatureList>
      <PricingOptions.PrimaryAction href="/buy">Buy now</PricingOptions.PrimaryAction>
      <PricingOptions.SecondaryAction href="/contact">Contact sales</PricingOptions.SecondaryAction>
    </PricingOptions.Item>
    <PricingOptions.Item>
      <PricingOptions.Label>Recommended</PricingOptions.Label>
      <PricingOptions.Heading>Copilot Business</PricingOptions.Heading>
      <PricingOptions.Description>
        Copilot personalized to your organization throughout the software development lifecycle. Requires GitHub
        Enterprise Cloud.
      </PricingOptions.Description>
      <PricingOptions.Price currencySymbol="$" trailingText="per user / month">
        39
      </PricingOptions.Price>
      <PricingOptions.FeatureList>
        <PricingOptions.FeatureListItem>Everything in Copilot Business plus:</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>Chat in IDE and Mobile</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>CLI assistance</PricingOptions.FeatureListItem>
        <PricingOptions.FeatureListItem>Code completions</PricingOptions.FeatureListItem>
      </PricingOptions.FeatureList>
      <PricingOptions.PrimaryAction href="/waitlist">Join waitlist</PricingOptions.PrimaryAction>
    </PricingOptions.Item>
  </PricingOptions>
  ```

  :link: [Read the documentation for more examples](https://primer.style/brand/components/PricingOptions)

### Patch Changes

- [#553](https://github.com/primer/brand/pull/553) [`0fb9052`](https://github.com/primer/brand/commit/0fb90529ac532167a43f6eeac2a904c9922325fc) Thanks [@rezrah](https://github.com/rezrah)! - Use default text color in labels that feature gradients

- [#560](https://github.com/primer/brand/pull/560) [`9b150a7`](https://github.com/primer/brand/commit/9b150a7695c1b2e70afab901550b1cc91f742bcb) Thanks [@rezrah](https://github.com/rezrah)! - Removed redundant spacing on SubNav menu toggle button

## 0.31.0

### Minor Changes

- [#503](https://github.com/primer/brand/pull/503) [`3098b3b`](https://github.com/primer/brand/commit/3098b3b54745e64a5ef0115edc81e12ea268e278) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Added SkipToContent button to SubdomainNavBar

- [#548](https://github.com/primer/brand/pull/548) [`f0a581c`](https://github.com/primer/brand/commit/f0a581ce0f65580120f5184142c6819d7f74d9cb) Thanks [@rezrah](https://github.com/rezrah)! - Added new `SubNav` component

  Example:

  ```jsx
  <SubNav>
    <SubNav.Heading>Features</SubNav.Heading>
    <SubNav.Link href="#">Actions</SubNav.Link>
    <SubNav.Link href="#">Packages</SubNav.Link>
    <SubNav.Link href="#" aria-current="page">
      Copilot
    </SubNav.Link>
    <SubNav.Link href="#">Code review</SubNav.Link>
  </SubNav>
  ```

  🔗 [See the documentation for more examples](https://primer.style/brand/components/SubNav)

## 0.30.3

### Patch Changes

- [#541](https://github.com/primer/brand/pull/541) [`392d4c4`](https://github.com/primer/brand/commit/392d4c4ba4d74a4c66b39a5e6d7cbeef7798237d) Thanks [@danielguillan](https://github.com/danielguillan)! - Adds hover states to the social icon links in MinimalFooter

- [#542](https://github.com/primer/brand/pull/542) [`79fa589`](https://github.com/primer/brand/commit/79fa589838fcac3bfc532e68e03955900c5993d7) Thanks [@rezrah](https://github.com/rezrah)! - - Added new `size` option to `ActionMenu`

  - Improved, automatic overlay positioning dependent on the action menu's location in the viewport.

  Example:

  ```jsx
  <>
    <ActionMenu size="small">
      <ActionMenu.Button>Small</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="Menu items">
        <ActionMenu.Item value="Item 1">Item 1</ActionMenu.Item>
        <ActionMenu.Item value="Item 2">Item 2</ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
    <ActionMenu size="medium">
      <ActionMenu.Button>Medium</ActionMenu.Button>
      <ActionMenu.Overlay aria-label="Menu items">
        <ActionMenu.Item value="Item 1">Item 1</ActionMenu.Item>
        <ActionMenu.Item value="Item 2">Item 2</ActionMenu.Item>
      </ActionMenu.Overlay>
    </ActionMenu>
  </>
  ```

  🔗 [See the documentation for more examples](https://primer.style/brand/components/ActionMenu#sizes)

## 0.30.2

### Patch Changes

- [#534](https://github.com/primer/brand/pull/534) [`f196cea`](https://github.com/primer/brand/commit/f196cea112da9f78696fb9917b50391f16427897) Thanks [@rezrah](https://github.com/rezrah)! - Added `x` variant to `UnorderedList`, and `leadingVisual`, `variant`, `leadingVisualAriaLabel` and `leadingVisualFill` props to list items.

  Example:

  ```jsx
  <UnorderedList variant="x">
    <UnorderedList.Item leadingVisual={CheckIcon} leadingVisualFill="green">
      Check icon override in green
    </UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill="orange">X icon in orange</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill="red">X icon in red</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill="blue">X icon in blue</UnorderedList.Item>
    <UnorderedList.Item leadingVisualFill="purple">X icon in purple</UnorderedList.Item>{' '}
    <UnorderedList.Item variant="muted">Muted text color</UnorderedList.Item>
  </UnorderedList>
  ```

## 0.30.1

### Patch Changes

- [#523](https://github.com/primer/brand/pull/523) [`f6f4c66`](https://github.com/primer/brand/commit/f6f4c662c432cc223025339f860e805b657982fc) Thanks [@rezrah](https://github.com/rezrah)! - - Improved keyboard navigation for FAQ and accordion components.

  - Pressing the escape key will now return focus to the closest accordion toggle.

- [#529](https://github.com/primer/brand/pull/529) [`d00cf4e`](https://github.com/primer/brand/commit/d00cf4ef63f50c8dc0a53c02ffaafb62885a0e72) Thanks [@alexbuiltit](https://github.com/alexbuiltit)! - Added `className` forwarding to `Hero.Description`

- [#533](https://github.com/primer/brand/pull/533) [`143c4f8`](https://github.com/primer/brand/commit/143c4f8fd82115595f88b67de4a7be4a1d8aec62) Thanks [@rezrah](https://github.com/rezrah)! - Add default inline link colors to Timeline.Item

- [#532](https://github.com/primer/brand/pull/532) [`17df500`](https://github.com/primer/brand/commit/17df500b53996828c4e61d9c28ac735caab062a6) Thanks [@danielguillan](https://github.com/danielguillan)! - Adds color mode support to the Testimonial component

- [#524](https://github.com/primer/brand/pull/524) [`365e01e`](https://github.com/primer/brand/commit/365e01e4dc0c04138126fcc0216fc8e48dae2a54) Thanks [@rezrah](https://github.com/rezrah)! - Added previously missing site title to SubdomainNavBar component menu on narrow viewports

- [#517](https://github.com/primer/brand/pull/517) [`6874019`](https://github.com/primer/brand/commit/6874019d0ae3c6961060d2157b188ecc01f7e92c) Thanks [@rezrah](https://github.com/rezrah)! - Added Label child support for River and Bento component

## 0.30.0

### Minor Changes

- [#507](https://github.com/primer/brand/pull/507) [`2309d7d`](https://github.com/primer/brand/commit/2309d7d5d96c3f390661117d56e77fe828ff0154) Thanks [@langermank](https://github.com/langermank)! - Renames --brand-Image-ratio-custom to --brand-image-aspectRatio

### Patch Changes

- [#499](https://github.com/primer/brand/pull/499) [`a3b02ad`](https://github.com/primer/brand/commit/a3b02adc8cf12ecfa8a45b91c614ac9dff2d645a) Thanks [@rezrah](https://github.com/rezrah)! - Added onKeyDown event handler to ActionMenu to replicate onClick using Enter key

- [#506](https://github.com/primer/brand/pull/506) [`3b6eb7b`](https://github.com/primer/brand/commit/3b6eb7b84bca8dab2f1e4957b8605ade4764a9de) Thanks [@langermank](https://github.com/langermank)! - Remove unused ActionMenu color tokens

  Tokens removed:
  --brand-ActionMenu-color-border-rest
  --brand-ActionMenu-color-border-hover
  --brand-ActionMenu-color-border-active

- [#498](https://github.com/primer/brand/pull/498) [`c3d7bdb`](https://github.com/primer/brand/commit/c3d7bdb32a5686841ce2a045d1ad72d2d51b991a) Thanks [@rezrah](https://github.com/rezrah)! - Added secondary action support to anchor nav.

  When two actions are present, the first action becomes a primary button variant.

  ```jsx
  <AnchorNav>
    {/* ... */}
    <AnchorNav.Action href="#">Get started</AnchorNav.Action>
    <AnchorNav.SecondaryAction href="#">Compare plans</AnchorNav.SecondaryAction>
  </AnchorNav>
  ```

## 0.29.1

### Patch Changes

- [#493](https://github.com/primer/brand/pull/493) [`ba6e320`](https://github.com/primer/brand/commit/ba6e320b3881482c48734813d92469f8bee72f84) Thanks [@rezrah](https://github.com/rezrah)! - Fixed text alignment on centered `EyebrowBanner`.

  - Headings now always start aligned
  - Forces removal of text-decoration on hover state

## 0.29.0

### Minor Changes

- [#442](https://github.com/primer/brand/pull/442) [`d2408f2`](https://github.com/primer/brand/commit/d2408f23460562e8cabfa5d059444a352fd61cdc) Thanks [@langermank](https://github.com/langermank)! - - Change base color scales to hex instead of hsl

  - Adds new tokens for `VideoPlayer`

- [#467](https://github.com/primer/brand/pull/467) [`a7e471b`](https://github.com/primer/brand/commit/a7e471b97d5e233d3b7a721bbdcef63264e6b60a) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - **breaking** InlineLink components no longer take a `size` prop, but will now inherit their size in all cases.

  ```jsx
  // Before
  <Text size="200">
    This is a link with the <InlineLink size="200">same</InlineLink> size
  </Text>
  ```

  ```jsx
  // After
  <Text size="200">
    This is a link with the <InlineLink>same</InlineLink> size
  </Text>
  ```

  If you want the Inline Link to have a different size than its parent, wrap it in a new `<Text>` component.

  ```jsx
  // Before
  <Text size="200">
    This is a link with a <InlineLink size="400">different</InlineLink>Size
  </Text>
  ```

  ```jsx
  // After
  <Text size="200">
    This is a link with a{' '}
    <Text as="span" size="400">
      <InlineLink>different</InlineLink>
    </Text>
    Size
  </Text>
  ```

  InlineLinks now work inside of `Header` components.

  ```jsx
  <Header size="3">
    This is a <InlineLink>Header</InlineLink> link!
  </Header>
  ```

- [#489](https://github.com/primer/brand/pull/489) [`be9a635`](https://github.com/primer/brand/commit/be9a63504180aaa206294861f87cf965936677e5) Thanks [@rezrah](https://github.com/rezrah)! - Updated dependency for @primer/octicons-react to `19.8.0`

  Octicons should now be passed as JSX instead of Objects.

  ```diff
  - icon={RocketIcon}
  + icon={<RocketIcon />}
  ```

- [#487](https://github.com/primer/brand/pull/487) [`6cdeba7`](https://github.com/primer/brand/commit/6cdeba7bbf3bc2a1ba2eb4483cb15a63744f8525) Thanks [@rezrah](https://github.com/rezrah)! - New eyebrow banner component now generally available

  ```jsx
  <EyebrowBanner href="http://githubuniverse.com">
    <EyebrowBanner.Heading>GitHub Universe: Dive in to AI, security, and DevEx</EyebrowBanner.Heading>
    <EyebrowBanner.SubHeading>Get your tickets now to join us on Nov. 8-9.</EyebrowBanner.SubHeading>
  </EyebrowBanner>
  ```

  :link: [Read the documentation for more examples](https://primer.style/brand/components/EyebrowBanner)

### Patch Changes

- [#490](https://github.com/primer/brand/pull/490) [`b93531e`](https://github.com/primer/brand/commit/b93531e77baf5797bd63118f96b7ce61addb14cd) Thanks [@rezrah](https://github.com/rezrah)! - Type widening for `FormControl` children.

  `FormControl` now uses `PropsWithChildren` to include support for `null` and `false` values. This allows for more flexibility when using `FormControl.*` with conditional rendering.

  ```jsx
  <FormControl>
    {/* `maybeValue can be truthy, but also null or false` */}
    {maybeValue && <FormControl.Validation>Message</FormControl.Validation>}
  </FormControl>
  ```

## 0.28.1

### Patch Changes

- [#482](https://github.com/primer/brand/pull/482) [`536adda`](https://github.com/primer/brand/commit/536addad5b8cf0e17ce39df1b6dbc2f026ef13de) Thanks [@rezrah](https://github.com/rezrah)! - Replaced global font-smoothing options with more targetted, and locally scoped usage in dark mode Heading instances only.

## 0.28.0

### Minor Changes

- [#453](https://github.com/primer/brand/pull/453) [`5855526`](https://github.com/primer/brand/commit/58555261fb7ec0df19891c8c72d392d48a07578d) Thanks [@rezrah](https://github.com/rezrah)! - - New `font` prop added to `Text` and `Heading` components to alternate between `mona-sans` and `hubot-sans` variable fonts. `mona-sans` remains the default.
  - Uses latest `v1.0.1` releases of (`Hubot Sans`)[https://github.com/github/hubot-sans/releases/tag/v1.0.1] and (`Mona Sans`)[https://github.com/github/mona-sans/releases/tag/v1.0.1] fonts.
  - Added `extralight` weight option

### Patch Changes

- [#468](https://github.com/primer/brand/pull/468) [`a6251df`](https://github.com/primer/brand/commit/a6251dfaa3996cd0298151f786466cd25504a9f8) Thanks [@rezrah](https://github.com/rezrah)! - Force removal of link underlines in Card components, to prevent specificity issues with local stylesheet overrides.

- [#451](https://github.com/primer/brand/pull/451) [`b15ab24`](https://github.com/primer/brand/commit/b15ab249a8feae9ecff60f990d1e2725d78f3002) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Fixed menu item overflow issues on narrow viewports in `SubdomainNavBar`.

  In addition, the `body` element will now hide overflow content and prevent background scrolling when the menu is open.

- [#480](https://github.com/primer/brand/pull/480) [`0e1e3bb`](https://github.com/primer/brand/commit/0e1e3bb5051614c3161d4309cdce84378bb4076c) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Improved keyboard navigation in the `SubdomainNavBar` mobile menu using focus trapping.

- [#469](https://github.com/primer/brand/pull/469) [`da4e989`](https://github.com/primer/brand/commit/da4e989f140eabc013886f9474907861f08d3f7e) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Changed the aria-label for the GitHub link in the footer

- [#457](https://github.com/primer/brand/pull/457) [`9ea0803`](https://github.com/primer/brand/commit/9ea08039caee4679b22d283013f4fb3beb48436c) Thanks [@joseph-lozano](https://github.com/joseph-lozano)! - Fixed issue with prose un-ordered lists in dark mode

- [#479](https://github.com/primer/brand/pull/479) [`1896326`](https://github.com/primer/brand/commit/1896326cd84137409b87c402addad9bc8ace9772) Thanks [@rezrah](https://github.com/rezrah)! - Increase tracking of 100 typographic position to improve readability

- [#479](https://github.com/primer/brand/pull/479) [`1896326`](https://github.com/primer/brand/commit/1896326cd84137409b87c402addad9bc8ace9772) Thanks [@rezrah](https://github.com/rezrah)! - Added export for CardSkewEffect component

- [#468](https://github.com/primer/brand/pull/468) [`a6251df`](https://github.com/primer/brand/commit/a6251dfaa3996cd0298151f786466cd25504a9f8) Thanks [@rezrah](https://github.com/rezrah)! - Added 'torchlight' hover effect to dark mode Card instances.

  See: https://primer.style/brand/components/Card/react#torchlight-effect

## 0.27.2

### Patch Changes

- [#459](https://github.com/primer/brand/pull/459) [`0166b19`](https://github.com/primer/brand/commit/0166b1924834a6b5c6c4863c26eb07e0d95f949e) Thanks [@rezrah](https://github.com/rezrah)! - Adds `borderBlockStartWidth`, `borderBlockEndWidth`, `borderInlineStartWidth`, and `borderInlineEndWidth` props to the `Box` component to support directional borders.

  ```jsx
  <>
    <Box borderBlockStartWidth="thin" borderColor="default" borderStyle="solid" />
    <Box borderBlockEndWidth="thin" borderColor="default" borderStyle="solid" />
    <Box borderInlineStartWidth="thin" borderColor="default" borderStyle="solid" />
    <Box borderInlineEndWidth="thin" borderColor="default" borderStyle="solid" />
  </>
  ```

- [#456](https://github.com/primer/brand/pull/456) [`64318fd`](https://github.com/primer/brand/commit/64318fdd7a64006aa5b63649d6c7d76515dbb5ce) Thanks [@rezrah](https://github.com/rezrah)! - Added hook for `useWindowSize` to the library exports.

  Usage example:

  ```js
  import {useWindowSize} from '@primer/react-brand'
  ```

  ```jsx
  function Component() {
    const {width, height, isXSmall, isSmall, isMedium, isLarge, isXLarge, isXXLarge, currentBreakpointSize} =
      useWindowSize()
  }
  ```

- [#460](https://github.com/primer/brand/pull/460) [`893df22`](https://github.com/primer/brand/commit/893df22dd54dd0cd5dfe6ae3226b27e2a4994036) Thanks [@rezrah](https://github.com/rezrah)! - Improvements to default styling in FAQ content.

- [#456](https://github.com/primer/brand/pull/456) [`64318fd`](https://github.com/primer/brand/commit/64318fdd7a64006aa5b63649d6c7d76515dbb5ce) Thanks [@rezrah](https://github.com/rezrah)! - Enabled `forwardRef` on `Hero.Description`, `Hero.Label` and `Hero.Image`.

- [#435](https://github.com/primer/brand/pull/435) [`3227a7d`](https://github.com/primer/brand/commit/3227a7dd0366961618899e236b48398272e7a7c1) Thanks [@josepmartins](https://github.com/josepmartins)! - Adds `Blockquote`, `Code`, `Figure` and `Figcaption` to the `Prose` component.

- [#464](https://github.com/primer/brand/pull/464) [`8e858cb`](https://github.com/primer/brand/commit/8e858cb22f1ae3eafc6b21a652e767158f7b2ce5) Thanks [@rezrah](https://github.com/rezrah)! - Replace usage of `start` with `flex-start` in `Bento`, `Hero` and `FAQGroup` components.

- [#461](https://github.com/primer/brand/pull/461) [`4ebe9a5`](https://github.com/primer/brand/commit/4ebe9a591c65e2310f15c1d3901a78e0812063e1) Thanks [@rezrah](https://github.com/rezrah)! - Add `font-smoothing` to base stylesheet, for better font rendering on macOS.

## 0.27.1

### Patch Changes

- [#449](https://github.com/primer/brand/pull/449) [`d009559`](https://github.com/primer/brand/commit/d0095592854bab08dd2fd04dfb54b67ce12b0444) Thanks [@rezrah](https://github.com/rezrah)! - Fixed bug in `AnchorNav` whereby the active link would not be highlighted when the page first loads.

- [#443](https://github.com/primer/brand/pull/443) [`6a7dc95`](https://github.com/primer/brand/commit/6a7dc9577fccd6e74169916497938a4f9e302911) Thanks [@josepmartins](https://github.com/josepmartins)! - Fixes bug in the `Testimonial` component that prevents avatar get squished

- [#440](https://github.com/primer/brand/pull/440) [`4c0bd32`](https://github.com/primer/brand/commit/4c0bd32cc10a9e9f4b6d1845188da0052314c5fa) Thanks [@rezrah](https://github.com/rezrah)! - Added `hideUntilSticky` option to AnchorNav component. This will visibly hide the `AnchorNav` until it becomes sticky.

  ```jsx
  <AnchorNav hideUntilSticky>
    <AnchorNav.Link href="#section">...</AnchorNav.Link>
  </AnchorNav>
  ```

  For any additional client-side customization, a `data-sticky` attribute is available and will be set to `true` when the `AnchorNav` is sticky.

- [#447](https://github.com/primer/brand/pull/447) [`4803d21`](https://github.com/primer/brand/commit/4803d2129ab4d0b5bb0b0d957010c203ffeb7c96) Thanks [@rezrah](https://github.com/rezrah)! - Reduced `large` button text size to `20px`.

## 0.27.0

### Minor Changes

- [#431](https://github.com/primer/brand/pull/431) [`2243ae4`](https://github.com/primer/brand/commit/2243ae4f651189e882ab5d7806f3132ca27c4de7) Thanks [@rezrah](https://github.com/rezrah)! - Fix erroneous `InlineLink` appearance on multiline.

  Removed the following design tokens:

  ```diff
  - --brand-InlineLink-transition-scale-start
  - --brand-InlineLink-transition-scale-end
  ```

- [#428](https://github.com/primer/brand/pull/428) [`6141bff`](https://github.com/primer/brand/commit/6141bff7ea7354afc78b3d5f29c842e7f569bfe0) Thanks [@josepmartins](https://github.com/josepmartins)! - - Updates the border radius scale to use the updated `small`, `medium`, `large`, and the new `xlarge` tokens.
  - Adds `xlarge` border radius option to the `Box` component properties.

### Patch Changes

- [#429](https://github.com/primer/brand/pull/429) [`aacbde1`](https://github.com/primer/brand/commit/aacbde1301a4a76a4d390dd93a9be83b07bbf3cb) Thanks [@josepmartins](https://github.com/josepmartins)! - Fixes style not being passed as general props to the `Card` component

- [#433](https://github.com/primer/brand/pull/433) [`dd02bc2`](https://github.com/primer/brand/commit/dd02bc2737bcddbdea2f00c27d55a2fd415065fa) Thanks [@rezrah](https://github.com/rezrah)! - Fixed incorrect click target area for Accordion answers

- [#436](https://github.com/primer/brand/pull/436) [`28bdf5e`](https://github.com/primer/brand/commit/28bdf5e7d82d24f6272169698b42ad35b3de3b97) Thanks [@josepmartins](https://github.com/josepmartins)! - Adds default height to `Card` to align vertical size when using `Grid` or `Stack` components as a wrappers.

- [#431](https://github.com/primer/brand/pull/431) [`2243ae4`](https://github.com/primer/brand/commit/2243ae4f651189e882ab5d7806f3132ca27c4de7) Thanks [@rezrah](https://github.com/rezrah)! - Reduced Textarea text size to 14px and 16px for medium and large sizes respectively, for consistency with other free text inputs.

## 0.26.0

### Minor Changes

- [#424](https://github.com/primer/brand/pull/424) [`61eba57`](https://github.com/primer/brand/commit/61eba570a20bc39e08a57ac5fba73b9b78cbfc4e) Thanks [@josepmartins](https://github.com/josepmartins)! - > **Warning**

  > This is a breaking change to the `Testimonial ` component.

  - Update `Testimonial` component provider layout styles
  - Remove `Testimonial` `align` prop

- [#420](https://github.com/primer/brand/pull/420) [`ad6c877`](https://github.com/primer/brand/commit/ad6c87739387d410b810b6549d25ae49e71915db) Thanks [@rezrah](https://github.com/rezrah)! - Use the bento to present content in a responsive grid layout.

  ```jsx
  <Bento>
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} />
    <Bento.Item columnSpan={6} rowSpan={8} />
    <Bento.Item columnSpan={3} rowSpan={4} rowStart={9} />
    <Bento.Item columnSpan={3} rowSpan={8} />
    <Bento.Item columnSpan={6} rowSpan={4} />
  </Bento>
  ```

### Patch Changes

- [#427](https://github.com/primer/brand/pull/427) [`084db13`](https://github.com/primer/brand/commit/084db13d4ad33cf974493908df5b6df37854ab51) Thanks [@rezrah](https://github.com/rezrah)! - Increase space between river heading and description to 16px from 8px

- [#425](https://github.com/primer/brand/pull/425) [`88e42f0`](https://github.com/primer/brand/commit/88e42f0c8090a6c19a732d093cd73fb524bf4ac3) Thanks [@josepmartins](https://github.com/josepmartins)! - Adjust `FAQGroup` navigation styles for selected items

- [#427](https://github.com/primer/brand/pull/427) [`084db13`](https://github.com/primer/brand/commit/084db13d4ad33cf974493908df5b6df37854ab51) Thanks [@rezrah](https://github.com/rezrah)! - Fixed a bug in `Hero` where an empty div with end-specific margin is erroneously defined for CTAs.

- [#427](https://github.com/primer/brand/pull/427) [`084db13`](https://github.com/primer/brand/commit/084db13d4ad33cf974493908df5b6df37854ab51) Thanks [@rezrah](https://github.com/rezrah)! - Update FormControl hasBorder color value to match control borders

- [#427](https://github.com/primer/brand/pull/427) [`084db13`](https://github.com/primer/brand/commit/084db13d4ad33cf974493908df5b6df37854ab51) Thanks [@rezrah](https://github.com/rezrah)! - Add `none` option to Box spacing props to reset defined paddings at larger viewports.

  ```
  <Box padding={{
      narrow: 24,
      wide: 'none' // <-- this will remove padding at the wide viewport
  }} />
  ```

## 0.25.0

### Minor Changes

- [#412](https://github.com/primer/brand/pull/412) [`d985e1f`](https://github.com/primer/brand/commit/d985e1f376e5bb25415f060f81e69997edd4f437) Thanks [@josepmartins](https://github.com/josepmartins)! - Visual updates to the Card component.

  - Increase border radius to 16px.
  - Adjust inner spacing between body text and link.
  - Use accent color in the link.
  - Removed shadow
  - Removed border by default, add `hasBorder` prop to add it back.

  ⚠️ This is a visual breaking change

  To restore the previous visual appearance, use the following

  ```diff
  - <Card>
  + <Card hasBorder>
  ```

- [#422](https://github.com/primer/brand/pull/422) [`c9d5e05`](https://github.com/primer/brand/commit/c9d5e05c7f1914ffb22c5ef47554797c942df775) Thanks [@rezrah](https://github.com/rezrah)! - Replaced twitter references in MinimalFooter with X

  > [!WARNING]
  > This is a breaking, but necessary change to the API.

  Migration steps:

  ```diff
  - <MinimalFooter socialLinks={['twitter']} />
  + <MinimalFooter socialLinks={['x']} />
  ```

- [#410](https://github.com/primer/brand/pull/410) [`8933e19`](https://github.com/primer/brand/commit/8933e19c19b2bd244f446c6dbd8713f0be709b4e) Thanks [@rezrah](https://github.com/rezrah)! - Added `FAQGroup` component for displaying a group of FAQ items.

  ```js
  import {FAQGroup} from '@primer/react-brand'
  ```

  ```jsx
  <FAQGroup>
    <FAQGroup.Heading>Frequently asked questions</FAQGroup.Heading>
    <FAQ />
    <FAQ />
  </FAQGroup>
  ```

  See [Storybook](https://primer.style/brand/storybook/?path=/story/components-faq-features--groups) for more examples.

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

- [#373](https://github.com/primer/brand/pull/373) [`b952a37`](https://github.com/primer/brand/commit/b952a377ed0a5bff621012f8af29b05b2a951495) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Use VideoPlayer component to render hosted videos

  ```jsx
  <VideoPlayer title="GitHub media player">
    <VideoPlayer.Source src="/example.mp4" />
    <VideoPlayer.Track src="/example.vtt" srcLang="en" label="English" />
  </VideoPlayer>
  ```

### Patch Changes

- [#397](https://github.com/primer/brand/pull/397) [`7acec10`](https://github.com/primer/brand/commit/7acec109cfa635f7ebc9df53bcae1243e5bebc40) Thanks [@rezrah](https://github.com/rezrah)! - Backfilled missing directional spacing styles in Box for `112` and `128`.

- [#397](https://github.com/primer/brand/pull/397) [`7acec10`](https://github.com/primer/brand/commit/7acec109cfa635f7ebc9df53bcae1243e5bebc40) Thanks [@rezrah](https://github.com/rezrah)! - Added fullWidth props to ` SectionIntro` and `Timeline`

  ```jsx
  <SectionIntro fullWidth>
    <SectionIntro.Heading>This heading will fill the maximum width of its parent container.</SectionIntro.Heading>
  </SectionIntro>
  ```

  ```jsx
  <Timeline fullWidth>
    <Timeline.Item>This text will fill the maximum width of its parent container.</Timeline.Item>
  </Timeline>
  ```

- [#397](https://github.com/primer/brand/pull/397) [`7acec10`](https://github.com/primer/brand/commit/7acec109cfa635f7ebc9df53bcae1243e5bebc40) Thanks [@rezrah](https://github.com/rezrah)! - Enable `className`` forwarding in the River component.

- [#397](https://github.com/primer/brand/pull/397) [`7acec10`](https://github.com/primer/brand/commit/7acec109cfa635f7ebc9df53bcae1243e5bebc40) Thanks [@rezrah](https://github.com/rezrah)! - Backfilled missing styles in `Box` for directional margins and paddings above `96px`

- [#416](https://github.com/primer/brand/pull/416) [`d36709d`](https://github.com/primer/brand/commit/d36709d170f3ffe0f81cf74f318b423aaaef1bcf) Thanks [@rezrah](https://github.com/rezrah)! - Visual updates to FAQ groups

  - Optical alignment of heading in FAQ group panels
  - Removed extra padding from FAQ group tabs
  - Use dedicated tokens for accordion borders

- [#399](https://github.com/primer/brand/pull/399) [`0479092`](https://github.com/primer/brand/commit/04790926c578c535cd39b410441ca8252180b2d8) Thanks [@simurai](https://github.com/simurai)! - **added** `instagram` to `MinimalFooter` to avoid Type error

## 0.24.0

### Minor Changes

- [#389](https://github.com/primer/brand/pull/389) [`957c839`](https://github.com/primer/brand/commit/957c83975e74f0c0062bf6fb8e73dd93091a603c) Thanks [@langermank](https://github.com/langermank)! - :warning: This update contains breaking changes as part of a Site Refactor update.

  Please refer to the following Discussion post for full details on all changes.

  :link: [Primer Brand v0.25 RC - Technical Preview](https://github.com/github/primer/discussions/2547)

- [#398](https://github.com/primer/brand/pull/398) [`2e9ca53`](https://github.com/primer/brand/commit/2e9ca53206ee360871b9c154d963bc412ec37711) Thanks [@josepmartins](https://github.com/josepmartins)! - Remove `small` size variant to `Label` component. The default `medium` size should be used instead.

  ⚠️ This is a breaking change

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

- [#379](https://github.com/primer/brand/pull/379) [`a1aa9b9`](https://github.com/primer/brand/commit/a1aa9b9d3c43727a3249e4326856b0b19e231e6d) Thanks [@rezrah](https://github.com/rezrah)! - Added default rounded corners to River.Visual and removed shadows

  ⚠️ This is a visual breaking change

  To restore the previous visual appearance, use the following

  ```diff
  - <River.Visual>
  + <River.Visual rounded={false} hasShadow>
  ```

### Patch Changes

- [#372](https://github.com/primer/brand/pull/372) [`dfa33f7`](https://github.com/primer/brand/commit/dfa33f771fa3271cd18b2117c4c31a97738a3a7a) Thanks [@mperrotti](https://github.com/mperrotti)! - Updated Testimonial component visuals, and enables customization of the quote color.

  Usage example:

  ```jsx
  <Testimonial>
    <Testimonial.Quote>
      <em>GitHub helps us ensure that we have our security controls baked into our pipelines</em> all the way from the
      first line of code we&apos;re writing.
    </Testimonial.Quote>
    <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>

    <Testimonial.Avatar
      src="https://avatars.githubusercontent.com/u/92997159?v=4"
      alt="Circular avatar from David Ross's GitHub profile"
    />
  </Testimonial>
  ```

## 0.23.0

### Minor Changes

- [#380](https://github.com/primer/brand/pull/380) [`49ef70b`](https://github.com/primer/brand/commit/49ef70bf565ec2c0caad53d7c145c7ff40b5eb6f) Thanks [@danielguillan](https://github.com/danielguillan)! - Use the timeline component to display a list of connected items as a vertical timeline.

  Usage example:

  ```jsx
  <Timeline>
    <Timeline.Item>
      <em>GitHub Codespaces</em> offers a complete dev environment in seconds, so you can code, build, test, and open
      pull requests from any repo anywhere.
    </Timeline.Item>
    <Timeline.Item>
      <em>GitHub Copilot</em> is your AI pair programmer that empowers you to complete tasks 55% faster by turning
      natural language prompts into coding suggestions.
    </Timeline.Item>
    <Timeline.Item>
      <em>GitHub Actions</em> automates your build, test, and deployment workflow with simple and secure CI/CD.
    </Timeline.Item>
  </Timeline>
  ```

  See the [documentation](https://primer.style/brand/components/Timeline) or [Storybook](https://primer.style/brand/storybook/?path=/story/components-timeline--default)

### Patch Changes

- [#352](https://github.com/primer/brand/pull/352) [`fd039af`](https://github.com/primer/brand/commit/fd039af7c114f4fe6af5c7351d3ebf4fdffe64c7) Thanks [@jesskuo4](https://github.com/jesskuo4)! - Added a `block` prop to Button to allow for a full width button.

- [#381](https://github.com/primer/brand/pull/381) [`f9c3ea5`](https://github.com/primer/brand/commit/f9c3ea534a56886099af1b7b6c40849aa786b74b) Thanks [@rezrah](https://github.com/rezrah)! - Add default spacing and optional divider to `trailingComponent` styles to `River.Content`

  ```jsx
  <River.Content
    trailingComponent={() => (
      <Stack direction="vertical" padding="none" alignItems="flex-start">
        <Heading as="h3" size="3">
          +50%
        </Heading>
        <Text variant="muted" as="p" size="300">
          Developer efficiency
        </Text>
      </Stack>
    )}
    trailingComponentDivider
  >
    <Heading>Heading</Heading>
    <Text>Use trailing components to provide additional, custom content immediately after the main content.</Text>
  </River.Content>
  ```

## 0.22.0

### Minor Changes

- [#362](https://github.com/primer/brand/pull/362) [`db9e54d`](https://github.com/primer/brand/commit/db9e54da130fd33f6908847113d9a2b2a82ff41e) Thanks [@rezrah](https://github.com/rezrah)! - Use a LogoSuite to present a list logos, such as sponsors or vendors.

  Usage example:

  ```jsx
  <LogoSuite>
    <LogoSuite.Heading>Heading</LogoSuite.Heading>
    <LogoSuite.Description>Description</LogoSuite.Description>
    <LogoSuite.Logobar>
      <svg />
      <svg />
    </LogoSuite.Logobar>
  </LogoSuite>
  ```

  See the [documentation](https://primer.style/brand/components/LogoSuite) or [Storybook](https://primer.style/brand/storybook/?path=/story/components-logosuite--default) for more usage examples.

### Patch Changes

- [#359](https://github.com/primer/brand/pull/359) [`ed7bd1e`](https://github.com/primer/brand/commit/ed7bd1e17a73be4a42cccd03d9b2266c51ee1b6c) Thanks [@mperrotti](https://github.com/mperrotti)! - Replaces aria-required with required for the Textarea component

- [#363](https://github.com/primer/brand/pull/363) [`151eca0`](https://github.com/primer/brand/commit/151eca008950d0fc2cbeb8d179960de736618d14) Thanks [@rezrah](https://github.com/rezrah)! - Added optional label to section intro component

  ```jsx
  <SectionIntro>
    <SectionIntro.Label>Label</SectionIntro.Label>
    <SectionIntro.Heading>...</SectionIntro.Heading>
  </SectionIntro>
  ```

- [#366](https://github.com/primer/brand/pull/366) [`81abab1`](https://github.com/primer/brand/commit/81abab1b815596e7e533991fbe75bce573c4b49e) Thanks [@rezrah](https://github.com/rezrah)! - Add optional foreground image support to Hero

  Use `position` to alternate between various layouts.

  ```jsx
  <>
    <Hero>
      <Hero.Heading>Automate your workflow from idea to production</Hero.Heading>
      <Hero.Image
        src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png"
        alt="placeholder, blank area with an off-white background color"
      />
    </Hero>
    <br />
    <Hero>
      <Hero.Heading>Automate your workflow from idea to production</Hero.Heading>
      <Hero.Image
        position="inline-end"
        src="https://via.placeholder.com/300x450/d3d9df/d3d9df.png"
        alt="placeholder, blank area with an off-white background color"
      />
    </Hero>
  </>
  ```

- [#363](https://github.com/primer/brand/pull/363) [`151eca0`](https://github.com/primer/brand/commit/151eca008950d0fc2cbeb8d179960de736618d14) Thanks [@rezrah](https://github.com/rezrah)! - Added optional label to the hero component

  ```jsx
  <Hero>
    <Hero.Label>Label</Hero.Label>
    <Hero.Heading>...</Hero.Heading>
  </Hero>
  ```

- [#370](https://github.com/primer/brand/pull/370) [`6e8a648`](https://github.com/primer/brand/commit/6e8a648c1a2f1991b9eee591867c986dad8381aa) Thanks [@josepmartins](https://github.com/josepmartins)! - Updates `Pillar` icon size, spacing and font settings.

  - updated icon size to be medium (32px)
  - updated heading font settings to use size 6 (20px/14px)
  - updated spacing between icon and heading, heading and description, description and link
  - updated link spacing to use margin-top: auto. This property adjust the position depending on it's sibling height size.
  - added stacked with link story

## 0.21.0

### Minor Changes

- [#347](https://github.com/primer/brand/pull/347) [`6f8cd9d`](https://github.com/primer/brand/commit/6f8cd9d82abbe447871a78f175e52fad8b502aa4) Thanks [@rezrah](https://github.com/rezrah)! - Added Box component

  Use a box to simplify the process of applying one-off styles to an element

  ```jsx
  <>
    <Box padding="condensed">condensed, uniform padding</Box>
    <Box padding="normal">normal, uniform padding</Box>
    <Box padding="spacious">spacious, uniform padding</Box>

    <Box margin="condensed">condensed, uniform margin</Box>
    <Box margin="normal">normal, uniform margin</Box>
    <Box margin="spacious">spacious, uniform margin</Box>

    <Box background="subtle">alternate background colors</Box>

    <Box borderRadius="full">rounded borders</Box>

    <Box borderWidth="thicker">thicker border widths</Box>
  </>
  ```

  :link: [See the documentation for more details, options and usage examples.](https://primer.style/brand/components/Box)

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

- [#337](https://github.com/primer/brand/pull/337) [`b7e1423`](https://github.com/primer/brand/commit/b7e1423929f7185834fb1d4e0be0fe9e3b7f2cd0) Thanks [@danielguillan](https://github.com/danielguillan)! - Fixes SectionIntro description to use the muted text variant

- [#347](https://github.com/primer/brand/pull/347) [`6f8cd9d`](https://github.com/primer/brand/commit/6f8cd9d82abbe447871a78f175e52fad8b502aa4) Thanks [@rezrah](https://github.com/rezrah)! - Added `flexWrap` prop to Stack component to enable automatic wrapping of flex items.

  ```jsx
  <Stack direction="horizontal" flexWrap="wrap">
    <Item />
    <Item />
    <Item />
  </Stack>
  ```

- [#342](https://github.com/primer/brand/pull/342) [`e7239ad`](https://github.com/primer/brand/commit/e7239ade2578320beeffdc979db943ef3663ebf0) Thanks [@rezrah](https://github.com/rezrah)! - Fixed grid column appearance at medium breakpoints for columns that span beyond `9`. Required styles, which were previously missing have been backfilled.

  ```jsx
  <Grid>
    <Grid.Column
      span={{
        medium: 9,
      }}
    ></Grid.Column>
    <Grid.Column
      span={{
        medium: 3,
      }}
    ></Grid.Column>
  </Grid>
  ```

- [#341](https://github.com/primer/brand/pull/341) [`f2b74f6`](https://github.com/primer/brand/commit/f2b74f69f4c3325d20346e2a39303ab4443e237a) Thanks [@rezrah](https://github.com/rezrah)! - Added optional `align` prop to Text component.

  ```jsx
  <>
    <Text as="p" align="start">
      Start
    </Text>
    <Text as="p" align="center">
      Center
    </Text>
    <Text as="p" align="end">
      End
    </Text>
  </>
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

- [#301](https://github.com/primer/brand/pull/301) [`73d11c9`](https://github.com/primer/brand/commit/73d11c9e36c5fc3a1f646239ddc36c8c9aae6f79) Thanks [@josepmartins](https://github.com/josepmartins)! - Pillar accessibility improvements:

  - Hide native SVG icons by default.
  - Remove as=”span” from prop table.
  - Add more descriptive text to “Learn more” link in storybook examples.

- [#290](https://github.com/primer/brand/pull/290) [`9e506f7`](https://github.com/primer/brand/commit/9e506f77cd0047be6f0774ee0467135a5c60fae9) Thanks [@josepmartins](https://github.com/josepmartins)! - Add `Pillar.Link` to the `Pillar` component

  ```jsx
  <Pillar>
    <Pillar.Heading>Code search & code view</Pillar.Heading>
    <Pillar.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Pillar.Description>
    <Pillar.Link href="https://github.com">Learn more</Pillar.Link>
  </Pillar>
  ```

- [#317](https://github.com/primer/brand/pull/317) [`552c154`](https://github.com/primer/brand/commit/552c154a727eefa9307c7c290c07ce5ec93c8514) Thanks [@mperrotti](https://github.com/mperrotti)! - Addresses a11y engineering feedback about the `Card` component. The `Card` container element is no longer `<a>`, it's `<div>`.

- [#282](https://github.com/primer/brand/pull/282) [`47f175e`](https://github.com/primer/brand/commit/47f175e7873b9c9f41edc0863869259263e80318) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added Instagram logo to MinimalFooter options

## 0.20.0

### Minor Changes

- [#276](https://github.com/primer/brand/pull/276) [`9e202d5`](https://github.com/primer/brand/commit/9e202d5eb92ffb1cbf591524c339bf4eae028ed5) Thanks [@rezrah](https://github.com/rezrah)! - Added animation support

  Use the `animate` prop to apply various animation presets directly on a component.

  ```jsx
  <AnimationProvider>
    <Button animate="fade-in">This button will fade in</Button>
  </AnimationProvider>
  ```

  - [Read the documentation for more examples](https://primer.style/brand/getting-started/animation)

### Patch Changes

- [#280](https://github.com/primer/brand/pull/280) [`a2cb323`](https://github.com/primer/brand/commit/a2cb323777ed69ffe8d5b13139bd049b6340501b) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Minimal Footer Updates
  - Updating MinimalFooter.Link spacing to match when as it set to button or link.
  - Updated visual tests to include spacing.

* [#279](https://github.com/primer/brand/pull/279) [`6704829`](https://github.com/primer/brand/commit/6704829892bbcba8482bad68246d3e19d1ec50ee) Thanks [@danielguillan](https://github.com/danielguillan)! - Adds spacing scale support in Stack's gap and padding props

  ```jsx
  <>
    <Stack gap={96} padding={96}>
      ...
    </Stack>
    <Stack
      gap={{
        narrow: 96,
      }}
      padding={{
        narrow: 96,
      }}
    >
      ...
    </Stack>
  </>
  ```

## 0.19.0

### Minor Changes

- [#239](https://github.com/primer/brand/pull/239) [`54b6a31`](https://github.com/primer/brand/commit/54b6a31127dad302fdf4583cd119b3595f7136db) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Provides the `Hero` component with a composable API.

  > **Warning**
  > This is a breaking change to the `Hero` component. Please review the following carefully.

  <table>
  <tr>
  <th> Before</th> <th> After </th>
  </tr>
  <tr>
  <td valign="top">

  ```jsx
  <Hero
    heading="This is my super sweet hero heading"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    primaryAction={{
      text: 'Primary action',
      href: '#',
    }}
    align="center"
  />
  ```

   </td>
  <td valign="top">

  ```jsx
  <Hero>
    <Hero.Heading>This is my super sweet hero heading</Hero.Heading>
    <Hero.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Hero.Description>
    <Hero.PrimaryAction href="#">Primary action</Hero.PrimaryAction>
  </Hero>
  ```

  </td>
  </tr>
  </table>

## 0.18.0

### Minor Changes

- [#262](https://github.com/primer/brand/pull/262) [`b0c3fa0`](https://github.com/primer/brand/commit/b0c3fa05603615a9690ccc4ff9297e933f3d881b) Thanks [@josepmartins](https://github.com/josepmartins)! - Add Pillar component

  Example Usage

  ```jsx live
  <Pillar>
    <Pillar.Heading>Collaboration is the key to DevOps success</Pillar.Heading>
    <Pillar.Description>Everything you need to know about getting started with GitHub Actions.</Pillar.Description>
  </Pillar>
  ```

  - [Pillar Documentation](https://primer.style/brand/components/Pillar)

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

- [#272](https://github.com/primer/brand/pull/272) [`f5c9656`](https://github.com/primer/brand/commit/f5c9656a4acf5057f282a2efd81e864d477b0988) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added polymorphism to the MinimalFooter link element

* [#271](https://github.com/primer/brand/pull/271) [`cb6d7b4`](https://github.com/primer/brand/commit/cb6d7b4ecc4abe28214349798e2335cb5a50a688) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added explicit text-decoration none to all components that currently explicitly set the text-decoration to none to ensure usability on legacy sites.

- [#260](https://github.com/primer/brand/pull/260) [`eeb988b`](https://github.com/primer/brand/commit/eeb988b81e8dd4c545ca2adf8234da6da2ff82ac) Thanks [@mperrotti](https://github.com/mperrotti)! - Prevents column width from overflowing the River component

## 0.17.1

### Patch Changes

- [#253](https://github.com/primer/brand/pull/253) [`4f77746`](https://github.com/primer/brand/commit/4f777466a6b03a73904e48b6df38aa846a64c450) Thanks [@josepmartins](https://github.com/josepmartins)! - Added support for `Image` in the `Card` component. The new `Card.Image` child is optional, and can be used alongside a `Card.Label`. Image aspect ratio can be controlled using the `aspectRatio` prop.

  ```jsx
  <Card href="https://github.com">
    <Card.Image src="https://via.placeholder.com/600x400/d3d9df/d3d9df.png" aspectRatio="16:9" alt=" " />
    <Card.Heading>Code search & code view</Card.Heading>
    <Card.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Card.Description>
  </Card>
  ```

* [#258](https://github.com/primer/brand/pull/258) [`d8ab2c9`](https://github.com/primer/brand/commit/d8ab2c9ba74579a98813e568927d792090f13a66) Thanks [@rezrah](https://github.com/rezrah)! - `Grid.Column` now spans full width by default when using responsive API

  ```jsx
  <Grid>
    <Grid.Column
      span={{
        large: 6,
      }}
    ></Grid.Column>
    <Grid.Column
      span={{
        xsmall: 3,
        large: 6,
      }}
    ></Grid.Column>
  </Grid>
  ```

- [#258](https://github.com/primer/brand/pull/258) [`d8ab2c9`](https://github.com/primer/brand/commit/d8ab2c9ba74579a98813e568927d792090f13a66) Thanks [@rezrah](https://github.com/rezrah)! - Add `brand` prefix to Grid component design tokens.

  ```diff
  - --grid-spacing-margin
  + --brand-Grid-spacing-margin
  ```

* [#256](https://github.com/primer/brand/pull/256) [`e98a121`](https://github.com/primer/brand/commit/e98a1219a6df4fac4a502d7cae0183c5d6f80f71) Thanks [@rezrah](https://github.com/rezrah)! - Add escape-hatch for no title in SubdomainNavBar

  ```jsx
  <SubdomainNavBar title="" />
  ```

## 0.17.0

### Minor Changes

- [#237](https://github.com/primer/brand/pull/237) [`51e383d`](https://github.com/primer/brand/commit/51e383dd2ccd74bf9c79c3beaf64e99e0a01a0a5) Thanks [@rezrah](https://github.com/rezrah)! - Added `Grid` component

  Use `Grid` to create flexible and responsive grid-based layouts

  ```jsx
  <Grid>
    <Grid.Column span={4}></Grid.Column>
    <Grid.Column span={4}></Grid.Column>
    <Grid.Column span={4}></Grid.Column>
  </Grid>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Grid)

* [#229](https://github.com/primer/brand/pull/229) [`2359c0c`](https://github.com/primer/brand/commit/2359c0c87ec8c419ef156e8ff78eb4fcdd24b4f3) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added `Image` component

  Usage example:

  ```jsx
  <Image src="/path/to/your/image.jpg" alt="Required alternative text" />
  ```

  See the [documentation](https://primer.style/brand/components/Image) or [Storybook](https://primer.style/brand/storybook/?path=/story/components-image--playground) for more usage examples.

### Patch Changes

- [#243](https://github.com/primer/brand/pull/243) [`9c479f9`](https://github.com/primer/brand/commit/9c479f9e214ffa7f7bfccafbce4d328275ef3ff3) Thanks [@josepmartins](https://github.com/josepmartins)! - Added support for `[Octicons](https://primer.style/design/foundations/icons)` in the `Card` component. The new `Card.Icon` child is optional, and can be used alongside a `Card.Label`. Icon color and background can be customized using the `color` and `hasBackground` prop respectively.

  ```jsx
  <Card href="https://github.com">
    <Card.Icon icon={CopilotIcon} color="purple" hasBackground />
    <Card.Heading>Code search & code view</Card.Heading>
    <Card.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Card.Description>
  </Card>
  ```

* [#246](https://github.com/primer/brand/pull/246) [`e66ffe0`](https://github.com/primer/brand/commit/e66ffe0f81355949c390ef670cc833239d926b4f) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Fixes zoom issue in `SubdomainNavBar` where secondary CTA link would disappear at 200% zoom, or specified width

- [#237](https://github.com/primer/brand/pull/237) [`51e383d`](https://github.com/primer/brand/commit/51e383dd2ccd74bf9c79c3beaf64e99e0a01a0a5) Thanks [@rezrah](https://github.com/rezrah)! - Improved type defintion accuracy for `SubdomainNavBar.PrimaryAction` by forwarding all default props from `HTMLAnchorElement`. This will prevent compiler errors on attributes like `onClick`.

* [#240](https://github.com/primer/brand/pull/240) [`6d590e2`](https://github.com/primer/brand/commit/6d590e2994398caceee5731a2f59e13d108f2b9e) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a `size` prop to control Testimonial's text size

- [#245](https://github.com/primer/brand/pull/245) [`52cc40d`](https://github.com/primer/brand/commit/52cc40d0431eff2286dfd8a12afaaac85a207ee6) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Fixes focus navigation within mobile menu in `SubdomainNavbar`

## 0.16.1

### Patch Changes

- [#234](https://github.com/primer/brand/pull/234) [`28f0679`](https://github.com/primer/brand/commit/28f067951810f05a81a9b105ea2e115c71e2d788) Thanks [@josepmartins](https://github.com/josepmartins)! - Adjust spacing in `River` component to avoid margin collapse.

## 0.16.0

### Minor Changes

- [#220](https://github.com/primer/brand/pull/220) [`d583547`](https://github.com/primer/brand/commit/d58354741fe1e678f030e086b9ba247a66767ba2) Thanks [@josepmartins](https://github.com/josepmartins)! - Added new Label component

  Use `Label` to indicate the status of the content or add metadata to the `Card` component.

  ```jsx
  <Label color="green" size="large">
    New feature
  </Label>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Label)

  Update Card component to use Label component and its color variants

  ```jsx
  <Card href="https://github.com">
    <Card.Label color="green">New feature</Card.Label>
    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
    <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
  </Card>
  ```

### Patch Changes

- [#216](https://github.com/primer/brand/pull/216) [`3bd2290`](https://github.com/primer/brand/commit/3bd2290a4fac495bc5e170d585df61dc419541a0) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Hides `Accordion` icons from component's accessible name

* [#222](https://github.com/primer/brand/pull/222) [`7da349d`](https://github.com/primer/brand/commit/7da349d21d7cc4bf77b105186a9a1aae14ae464b) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Introduces accessibility fixes for `SubdomainNavBar`

  - Improves `ARIA` usage across the component
  - Adjusts some landmarks to reduce verbosity
  - Fixes some `aria-expanded` states

- [#225](https://github.com/primer/brand/pull/225) [`b59728e`](https://github.com/primer/brand/commit/b59728e7a4fd9f57dd8773a73a71a068c4f4fb5b) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Adds improved `combobox` accessibility support for `SubdomainNavBar` search

* [#209](https://github.com/primer/brand/pull/209) [`b6d9602`](https://github.com/primer/brand/commit/b6d9602780b4e310f41c9caaff8b5d47856b294f) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Fixes transition bug by making `:hover` style take priority over `:focus`.

- [#226](https://github.com/primer/brand/pull/226) [`06f045d`](https://github.com/primer/brand/commit/06f045d39b68ae138c63bfb396c12c032d7b31f7) Thanks [@rezrah](https://github.com/rezrah)! - Add heading level customization to River headings.

  ```jsx
  <River>
    <River.Visual />
    <River.Content>
      <Heading as="h1">Use alternative heading levels, like h1, h2, h3 and more</Heading>
    </River.Content>
  </River>
  ```

## 0.15.1

### Patch Changes

- [#221](https://github.com/primer/brand/pull/221) [`0b5d9b0`](https://github.com/primer/brand/commit/0b5d9b0bb048d87b31ea2071b6c2546401c75fe7) Thanks [@rezrah](https://github.com/rezrah)! - Updated dark mode Button hover colors for secondary and subtle variants.

  Colors have changed from gray to white.

* [#215](https://github.com/primer/brand/pull/215) [`e96601c`](https://github.com/primer/brand/commit/e96601c02b6fb85991ad7da4908e5014e9619d7c) Thanks [@TylerJDev](https://github.com/TylerJDev)! - - Updated `Hero` to use the HTML landmark element `<section>` for improved semantics and accessibility.

## 0.15.0

### Minor Changes

- [#200](https://github.com/primer/brand/pull/200) [`f8e273a`](https://github.com/primer/brand/commit/f8e273a89a34c4a7e9135608281e938c8c4f6fd0) Thanks [@josepmartins](https://github.com/josepmartins)! - Add label and test coverage to the Card component

  ⚠️ This update contains a breaking change.

  **Before:**

  ```jsx
  <Card label="Read more">...</Card>
  ```

  **after:**

  ```jsx
  <Card ctaText="Read more">...</Card>
  ```

* [#205](https://github.com/primer/brand/pull/205) [`d8974c1`](https://github.com/primer/brand/commit/d8974c1d301e91726bca0a3996afea4750ab13a2) Thanks [@rezrah](https://github.com/rezrah)! - ### React

  Added new ActionMenu component

  Use `ActionMenu` to display a list of actions or selections that expand through a trigger button.

  ```jsx
  <ActionMenu>
    <ActionMenu.Button>Open menu</ActionMenu.Button>
    <ActionMenu.Overlay>
      <ActionMenu.Item value="Copilot" selected>
        Copilot
      </ActionMenu.Item>
      <ActionMenu.Item value="Codespaces">Codespaces</ActionMenu.Item>
      <ActionMenu.Item value="CodeQL">CodeQL</ActionMenu.Item>
    </ActionMenu.Overlay>
  </ActionMenu>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/ActionMenu)

### Patch Changes

- [#204](https://github.com/primer/brand/pull/204) [`469af45`](https://github.com/primer/brand/commit/469af45eaedfb093fbc8f444c5bd5fc0121f27ab) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Adds outline to `Button` variants (Primary, Secondary) when in High Contrast Mode (HCM)

  <table>
  <tr>
  <th> Before </th> <th> After </th>
  </tr>
  <tr>
  <td valign="top">

  <img width="200" alt="Button 'Primary' variant, shows a button with no outline in HCM" src="https://user-images.githubusercontent.com/26746305/224075381-d2cb2f80-9dc2-43e7-b7fa-b0e116c9845b.png">

   </td>
  <td valign="top">

  <img width="205" alt="Button 'Primary' variant, shows a button with a yellow outline in HCM" src="https://user-images.githubusercontent.com/26746305/224077824-6a87aef5-96ee-40df-a50c-7dbb0ac5a25b.png">

  </td>
  </tr>
  <tr>

  <td>

  <img width="260" alt="Button 'Primary' variant, shows a disabled button with no outline in HCM" src="https://user-images.githubusercontent.com/26746305/224076271-802b54a0-c924-439b-beb2-1e2a637e7e47.png">

  </td>

  <td>

  <img width="276" alt="Button 'Primary' variant, shows a disabled button with a green outline in HCM" src="https://user-images.githubusercontent.com/26746305/224076547-1ffbd080-c18e-4f36-898e-3b9ea01a3c1d.png">

  </td>

  </tr>
  </table>

* [#217](https://github.com/primer/brand/pull/217) [`cb892f8`](https://github.com/primer/brand/commit/cb892f8890ad22279ef1e25098e9df86f53a427d) Thanks [@rezrah](https://github.com/rezrah)! - `Avatar` now correctly forwards native `img` attributes. This includes `loading`, `decoding`, and `crossOrigin` attributes.

## 0.14.0

### Minor Changes

- [#162](https://github.com/primer/brand/pull/162) [`b7dcae0`](https://github.com/primer/brand/commit/b7dcae0cac18611cd472fe156be3deaa2305c4f8) Thanks [@josepmartins](https://github.com/josepmartins)! - Card Component

  Example Usage

  ```jsx live
  <Card href="https://github.com">
    <Card.Heading>Collaboration is the key to DevOps success</Card.Heading>
    <Card.Description>Everything you need to know about getting started with GitHub Actions.</Card.Description>
  </Card>
  ```

  - [Card Documentation](https://primer.style/brand/components/Card)

### Patch Changes

- [#194](https://github.com/primer/brand/pull/194) [`2ffcb14`](https://github.com/primer/brand/commit/2ffcb14892278745e871f223281d779759fb6976) Thanks [@rezrah](https://github.com/rezrah)! - Added `arrowDirection` prop to Link component

  ```jsx
  <Link href="https://github.com" arrowDirection="start">
    Back to GitHub
  </Link>
  ```

* [`55abb8e`](https://github.com/primer/brand/commit/55abb8e1c154a3bd17e951bae5ab6e0b2f2aa59a) Thanks [@rezrah](https://github.com/rezrah)! - Fix bug in forwarding a `className` to SubdomainNavBar and remove console errors for Avatar

  E.g.

  ```
  <SubdomainNavBar className="custom-css-class" />
  ```

- [#193](https://github.com/primer/brand/pull/193) [`3d8a95b`](https://github.com/primer/brand/commit/3d8a95ba637af3f7ee54222e278fa38685f13e68) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Allows `FAQ.Question` and `FAQ.Subheading` to have adjustable heading levels (e.g. <FAQ.Question as="h3" />)

## 0.13.0

### Minor Changes

- [#176](https://github.com/primer/brand/pull/176) [`ca07fdc`](https://github.com/primer/brand/commit/ca07fdc0bb15695074d20d265a9403115d38fa60) Thanks [@danielguillan](https://github.com/danielguillan)! - New `Avatar` component available

  Use `Avatar` to display a thumbnail representation of a person.

  ```jsx
  <Avatar src="https://avatars.githubusercontent.com/u/92997159?v=4" alt="A random avatar picture" />
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Avatar)

* [#163](https://github.com/primer/brand/pull/163) [`fe0e1ee`](https://github.com/primer/brand/commit/fe0e1ee1021fa38955115d3c40aba4f1f536eef3) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - CTAForm Component

  Example Usage

  ```jsx live
  <CTAForm>
    <CTAForm.Input>
      <FormControl required>
        <FormControl.Label>Your work email address</FormControl.Label>
        <TextInput placeholder="name" />
      </FormControl>
    </CTAForm.Input>
    <CTAForm.Confirm>
      <FormControl required>
        <FormControl.Label>
          <Text size="300" variant="muted">
            I agree to the <InlineLink href="https://github.com">Privacy Policy</InlineLink> and{' '}
            <InlineLink href="https://github.com">Terms of Service</InlineLink>
          </Text>
        </FormControl.Label>
        <Checkbox name="confirm" />
      </FormControl>
    </CTAForm.Confirm>
    <CTAForm.Action>Subscribe</CTAForm.Action>
  </CTAForm>
  ```

  - [CTAForm Documentation](https://primer.style/brand/components/CTAForm)

### Patch Changes

- [#189](https://github.com/primer/brand/pull/189) [`d805a17`](https://github.com/primer/brand/commit/d805a171c3b3377e1ee5808fdb0207283fd69f85) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Applies a transition: none rule to `:focus` on the `<Button>` component. Ensures that the existing box-shadow on :hover does not interfere with the the :focus box-shadow.

  <table>
  <caption>Before/After</caption>
  <tr>
  <th> Version 0.12.0 </th> <th> Version 0.12.1 (current)</th> <th> PR version </th>
  </tr>
  <tr>
  <td valign="top">

  https://user-images.githubusercontent.com/26746305/219712759-d814db66-dae2-4b74-9a48-c411cb7705c3.mov

  Video shows the cursor moving over the button. When pressed and hovered off of, the `box-shadow` border appears on the button in a bottom-to-top transition animation.

  Video also shows cursor hovering over button when focused, removing the `box-shadow` border before displaying it back when hovered off of.

  </td>
  <td valign="top">

  https://user-images.githubusercontent.com/26746305/219712378-7d0f0cb7-2068-463b-a3da-548729c8f6e0.mov

  Video shows cursor moving over the button. When pressed the `box-shadow` border appears over the button instantly, showing the same bottom-to-top transition effect as the previous cell example.

   </td>
  <td valign="top">

  https://user-images.githubusercontent.com/26746305/219712490-347af6ce-6900-496d-a6cb-bc2c0c27b453.mov

  Video shows cursor moving over the button and then pressing the button. The `box-shadow` border displays over the button instantly, showing no transition animation.

  </td>
  </tr>
  </table>

* [#190](https://github.com/primer/brand/pull/190) [`8307f60`](https://github.com/primer/brand/commit/8307f601a1a01251f7e030d7edf023ee32d99da1) Thanks [@rezrah](https://github.com/rezrah)! - Added `leadingVisual` and `trailingVisual` support to `Button`

  **Usage example**

  ```jsx
  //import {SearchIcon, CheckIcon} from '@primer/octicons-react'

  <Button leadingVisual={SearchIcon} trailingVisual={CheckIcon}>
    Button
  </Button>
  ```

  - [See the documentation for more examples](https://primer.style/brand/components/Button#appending-an-icon)

## 0.12.1

### Patch Changes

- [#181](https://github.com/primer/brand/pull/181) [`2572904`](https://github.com/primer/brand/commit/25729045d5bcaddf8e656da168d4c3dd2561fb2b) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Fixed CTABanner Class Forwarding Bug, now users can pass custom classes to the wrapper for the CTABanner component

* [#170](https://github.com/primer/brand/pull/170) [`c913aab`](https://github.com/primer/brand/commit/c913aab049e5ea8c69b38176f2e698af35cc5c21) Thanks [@TylerJDev](https://github.com/TylerJDev)! - Adds accessibility fixes for `Button`.

  - Retains outline on focus when only `aria-disabled` is applied.
  - Adds focus indicator and 'disabled' style for WHCM.
  - Allows use of 'disabled' and 'aria-disabled' separately.
  - Hides SVG from screen readers.

- [#186](https://github.com/primer/brand/pull/186) [`9cc537a`](https://github.com/primer/brand/commit/9cc537ab42169afd599c9b32b1bad6ce0fe9cd87) Thanks [@rezrah](https://github.com/rezrah)! - Add `stretch` and `letter-spacing` configurability to Heading

  **Width**

  ```jsx
  <>
    <Heading as="h3" stretch="condensed">
      condensed
    </Heading>
    <Heading as="h3" stretch="normal">
      normal
    </Heading>
    <Heading as="h3" stretch="expanded">
      wide
    </Heading>
  </>
  ```

  **Letter spacing**

  ```jsx
  <>
    <Heading as="h3" letterSpacing="condensed">
      condensed
    </Heading>
    <Heading as="h3" letterSpacing="normal">
      normal
    </Heading>
    <Heading as="h3" letterSpacing="none">
      none
    </Heading>
  </>
  ```

## 0.12.0

### Minor Changes

- [#165](https://github.com/primer/brand/pull/165) [`3eeda65`](https://github.com/primer/brand/commit/3eeda651c9fcae44cc2025cf9271b47482789d61) Thanks [@rezrah](https://github.com/rezrah)! - New `MinimalFooter` component available

  Use `MinimalFooter` to provide a global footer navigation to your website or application.

  ```jsx
  <MinimalFooter>
    <MinimalFooter.Footnotes>
      <Text>
        <sup>1</sup>By signing up, GitHub may use your information to personalize and measure the effectiveness of
        enterprise business ads, including those you see off of GitHub, promotional communications or marketing you
        receive related to the Enterprise Marketing Pages. We will send you relevant emails and promotional information
        based on your GitHub profile and any additional information provided in the sign-up form. If you change your
        mind, you can unsubscribe at any time (an unsubscribe link is provided in every email). For more information on
        how GitHub uses your personal information, please see the{' '}
        <InlineLink
          href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
          target="_blank"
        >
          GitHub Privacy Statement
        </InlineLink>
        .
      </Text>
    </MinimalFooter.Footnotes>
    <MinimalFooter.Link href="https://github.com/organizations/enterprise_plan">Try GitHub for free</MinimalFooter.Link>
    <MinimalFooter.Link href="https://github.com/enterprise">Enterprise</MinimalFooter.Link>
    <MinimalFooter.Link href="https://github.com/enterprise/contact">Email us</MinimalFooter.Link>
  </MinimalFooter>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/MinimalFooter)

### Patch Changes

- [#167](https://github.com/primer/brand/pull/167) [`1095d8f`](https://github.com/primer/brand/commit/1095d8f8e547592b1f608361886aad3795a9cd01) Thanks [@josepmartins](https://github.com/josepmartins)! - Fix left alignment in Hero actions

## 0.11.0

### Minor Changes

- [#158](https://github.com/primer/brand/pull/158) [`7bc0b14`](https://github.com/primer/brand/commit/7bc0b14a8341b3d7008e126ef2a6e9615641fc54) Thanks [@danielguillan](https://github.com/danielguillan)! - New `SectionIntro` component available

  Use `SectionIntro` to provide a title, optional description and link to a new section in the page.

  ```jsx
  <SectionIntro>
    <SectionIntro.Heading>My section tilte</SectionIntro.Heading>
    <SectionIntro.Description>My section description</SectionIntro.Description>
    <SectionIntro.Action href="/my-link">My action</SectionIntro.Action>
  </SectionIntro>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/SectionIntro)

### Patch Changes

- [#164](https://github.com/primer/brand/pull/164) [`44057f7`](https://github.com/primer/brand/commit/44057f7c19b8bcaee1577b996b7cd18084317775) Thanks [@danielguillan](https://github.com/danielguillan)! - - Fixes types to support conditional children in the Stack component
  - Adds support for responsive `alignItems` and `justifyContent` to Stack component

## 0.10.0

### Minor Changes

- [#145](https://github.com/primer/brand/pull/145) [`2aeebf7`](https://github.com/primer/brand/commit/2aeebf7b4e979da8f9a9344b672b764eb5311136) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added `OrderedList` and `UnorderedList`

  Example Usage:

  ```
  <UnorderedList variant="checked">
      <UnorderedList.Item>Automatic security and version updates</UnorderedList.Item>
      <UnorderedList.Item>GitHub Security Advisories</UnorderedList.Item>
      <UnorderedList.Item>Code and secret scanning</UnorderedList.Item>
      <UnorderedList.Item>Dependency review</UnorderedList.Item>
      <UnorderedList.Item>Automated authentication and identity management</UnorderedList.Item>
  </UnorderedList>
  ```

  - [UnorderedList Documentation](https://primer.style/brand/components/UnorderedList)

  ```
  <OrderedList>
      <OrderedList.Item>Automatic security and version updates</OrderedList.Item>
      <OrderedList.Item>GitHub Security Advisories</OrderedList.Item>
      <OrderedList.Item>Code and secret scanning</OrderedList.Item>
      <OrderedList.Item>Dependency review</OrderedList.Item>
      <OrderedList.Item>Automated authentication and identity management</OrderedList.Item>
  </OrderedList>
  ```

  - [OrderedList Documentation](https://primer.style/brand/components/OrderedList)

### Patch Changes

- [#159](https://github.com/primer/brand/pull/159) [`d5431ee`](https://github.com/primer/brand/commit/d5431ee9cdfe92343ad23df32d434773201ebdef) Thanks [@rezrah](https://github.com/rezrah)! - Fixes `SubdomainNavBar` bug when no child links are passed by removing the menu button.

* [#155](https://github.com/primer/brand/pull/155) [`516f828`](https://github.com/primer/brand/commit/516f82865444bba4118c7eeef715770c503401a7) Thanks [@rezrah](https://github.com/rezrah)! - Added `weight` prop to `Heading` component to allow fine-grained control over default `font-weight`.

  [See docs for usage examples](https://primer.style/brand/components/Heading/#weight)

- [#157](https://github.com/primer/brand/pull/157) [`1c3f665`](https://github.com/primer/brand/commit/1c3f665a59b995106b72ef05a5e27b0e8595628f) Thanks [@rezrah](https://github.com/rezrah)! - Added `weight` prop to `Text` component to allow fine-grained control over default `font-weight`.

  [See docs for usage examples](https://primer.style/brand/components/Text/#weight)

* [#161](https://github.com/primer/brand/pull/161) [`c6acd92`](https://github.com/primer/brand/commit/c6acd922da801080d9f36a6db8526110c3628c88) Thanks [@rezrah](https://github.com/rezrah)! - Added a `visually-hidden` utility class to the global stylesheet

  Usage example:

  ```jsx
  <Text className="visually-hidden">body text that should be visually hidden but available to screen readers</Text>
  ```

## 0.9.1

### Patch Changes

- [#149](https://github.com/primer/brand/pull/149) [`e3f0659`](https://github.com/primer/brand/commit/e3f0659aa3bb15932ca016b581779c42fbf7d339) Thanks [@renbaoshuo](https://github.com/renbaoshuo)! - Fix href prop of `<SubdomainNavBar.SecondaryAction />`

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

### Patch Changes

- [#148](https://github.com/primer/brand/pull/148) [`c9cf4bb`](https://github.com/primer/brand/commit/c9cf4bb886945943f3e6f38fcdc603d7e7be8c53) Thanks [@rezrah](https://github.com/rezrah)! - Add default typography values to Accordion.Content

* [#142](https://github.com/primer/brand/pull/142) [`5d4a4fa`](https://github.com/primer/brand/commit/5d4a4fa423a256083371d92195aa31baafa82480) Thanks [@rezrah](https://github.com/rezrah)! - Prevents background page scrolling in AnchorNav when the menu is open.

- [#144](https://github.com/primer/brand/pull/144) [`463ad37`](https://github.com/primer/brand/commit/463ad37119f767b03f04a48208a1de668221c207) Thanks [@josepmartins](https://github.com/josepmartins)! - - added left-aligned style in footnotes for ComparisonTable on narrow screens
  - added missing content in docs examples and props
  - fixed the Edit this page in GitHub link in docs

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

* [#128](https://github.com/primer/brand/pull/128) [`1f14be6`](https://github.com/primer/brand/commit/1f14be6e43b54b5b459bf2e8ca52805aa2b3fb4c) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - New CTABanner component available

  ```jsx
  <CTABanner>
    <CTABanner.Heading>Where the most ambitious teams build great things</CTABanner.Heading>
    <CTABanner.Description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
      felis nam pulvinar risus elementum.
    </CTABanner.Description>
    <CTABanner.ButtonGroup>
      <Button>Primary Action</Button>
      <Button>Secondary Action</Button>
    </CTABanner.ButtonGroup>
  </CTABanner>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/CTABanner)

### Patch Changes

- [#135](https://github.com/primer/brand/pull/135) [`32555dd`](https://github.com/primer/brand/commit/32555dd1cc72575c5cafb7c789cdea219fab1110) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - `Stack` component: Added `className` prop forwarding to the `Stack` root

## 0.7.2

### Patch Changes

- [#127](https://github.com/primer/brand/pull/127) [`c16551f`](https://github.com/primer/brand/commit/c16551f65bd1f2ceb62f9979c0ae909e58aed348) Thanks [@rezrah](https://github.com/rezrah)! - Improvements to Button appearance

  - added an inactive / disabled visual appearance to the Button, which it previously didn't have

  - added new design tokens to replace functional tokens and enable app-side customisation

  - updated focus styles from previously bespoke grey to the global focus tokens

## 0.7.1

### Patch Changes

- [#124](https://github.com/primer/brand/pull/124) [`bc08980`](https://github.com/primer/brand/commit/bc0898075c4674cbcbaf587fac78f073ff747312) Thanks [@rezrah](https://github.com/rezrah)! - Fix: SubdomainNavBar and Radio component bugs in safari (iOS)

## 0.7.0

### Minor Changes

- [#117](https://github.com/primer/brand/pull/117) [`68d649f`](https://github.com/primer/brand/commit/68d649fd141c4cc158e0b5a47394d25aa0cc0ccf) Thanks [@rezrah](https://github.com/rezrah)! - Fix conflict with id and name attributes for form components

  The previous API for FormControl relied on the `id` prop to automatically assign the necessary `name` attribute for input tags. This had previously overridden the explicit `name` prop, which is not the desired behavior. This release fixes that by forwarding the `name` prop if it is provided, and falling back to the `id` prop if it is not.

  ```jsx
  <FormControl>
    <FormControl.Label>Name</FormControl.Label>
    <TextInput name="name" />
  </FormControl>
  ```

  The above will now render as

  ```html
  <section id="FormControl--custom-id">
    <label for="custom-id">Name</label>
    <input type="text" name="custom-name" id="custom-id" />
  </section>
  ```

* [#117](https://github.com/primer/brand/pull/117) [`68d649f`](https://github.com/primer/brand/commit/68d649fd141c4cc158e0b5a47394d25aa0cc0ccf) Thanks [@rezrah](https://github.com/rezrah)! - New Radio component available

  Use radios when a user needs to select one option from a list

  ```js
  import {Radio} from '@primer/react-brand'
  ```

  ```jsx
  <>
    <Radio name="radio-group" value="radio one" />
    <Radio name="radio-group" value="radio two" />
  </>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Radio)

- [#117](https://github.com/primer/brand/pull/117) [`68d649f`](https://github.com/primer/brand/commit/68d649fd141c4cc158e0b5a47394d25aa0cc0ccf) Thanks [@rezrah](https://github.com/rezrah)! - New Textarea component available

  Use Textarea for multi-line text input form fields

  ```js
  import {Textarea} from '@primer/react-brand'
  ```

  ```jsx
  <Textarea>Enter multiline text here</Textarea>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/Textarea)

### Patch Changes

- [#121](https://github.com/primer/brand/pull/121) [`7d7c9c3`](https://github.com/primer/brand/commit/7d7c9c3d643d894f44874330848da556a39ac2a1) Thanks [@rezrah](https://github.com/rezrah)! - Fixed conditional rendering bug in SubdomainNavBar

  Previously, SubdomainNavBar links would not appear correctly onscreen following a rerender.

  This bug has been fixed to ensure that conditional rendering - using `showLinks` below as an example - works as expected.

  ```jsx
  <SubdomainNavBar title="Subdomain">
    {showLinks &&
      ['Collections', 'Topics', 'Articles', 'Events', 'Video'].map(link => {
        return (
          <SubdomainNavBar.Link key={link} href={`#${link}`}>
            {link}
          </SubdomainNavBar.Link>
        )
      })}
  </SubdomainNavBar>
  ```

## 0.6.0

### Minor Changes

- [#108](https://github.com/primer/brand/pull/108) [`ba4f102`](https://github.com/primer/brand/commit/ba4f102435cd1bc5d6061de8402b961e9d17b223) Thanks [@rezrah](https://github.com/rezrah)! - New ComparisonTable component available

  ```jsx
  <ComparisonTable featuredColumn={1} heading="GitHub vs Jenkins">
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Use case</ComparisonTable.Cell>
      <ComparisonTable.Cell>GitHub</ComparisonTable.Cell>
      <ComparisonTable.Cell>Jenkins</ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Automation & CI/CD</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p" size="300">
          Comparable native core capabilities
        </Text>
        <Text as="p" size="300">
          <InlineLink href="#">Over 13,000 GitHub Actions are available</InlineLink>
          &nbsp;in the GitHub Marketplace to automate your development workflow.
        </Text>
      </ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p" size="300">
          Comparable native capabilities
        </Text>
        <Text as="p" size="300">
          1,800+ community contributed Jenkins plugins <InlineLink href="#">in Jenkins Plugin Marketplace.</InlineLink>
        </Text>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Row>
      <ComparisonTable.Cell>Deployment models</ComparisonTable.Cell>
      <ComparisonTable.Cell>Cloud or self-hosted</ComparisonTable.Cell>
      <ComparisonTable.Cell>
        <Text as="p" size="300">
          Self-hosted only
        </Text>
        <Text as="p" size="300">
          CloudBees is the cloud alternative
        </Text>
      </ComparisonTable.Cell>
    </ComparisonTable.Row>
    <ComparisonTable.Footnote>
      *** This is a biased overview of capabilities by use case, based on publicly available information as of
      2022-05-16.
    </ComparisonTable.Footnote>
  </ComparisonTable>
  ```

  :link: [See the documentation for more details and usage examples.](https://primer.style/brand/components/ComparisonTable)

* [#110](https://github.com/primer/brand/pull/110) [`2569d4f`](https://github.com/primer/brand/commit/2569d4f4a94000c164740c6a5efc42268a1f08f4) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added `ButtonGroup` component

  Usage example:

  ```jsx
  <ButtonGroup>
    <Button>This is one button</Button>
    <Button>This is the second button</Button>
  </ButtonGroup>
  ```

  See the [Storybook](https://primer.style/brand/storybook/?path=/story/components-buttongroup--primary) for more usage examples.

## 0.5.3

### Patch Changes

- [#104](https://github.com/primer/brand/pull/104) [`b6322de`](https://github.com/primer/brand/commit/b6322de9e5efb336aa6c0e8971c91f5af27029ff) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added a subtle variant for button component

* [#106](https://github.com/primer/brand/pull/106) [`85ed4d0`](https://github.com/primer/brand/commit/85ed4d0759b09c174ef25c5b03eaf2154c91830d) Thanks [@rezrah](https://github.com/rezrah)! - Restore font folder to package root

  In `0.5.2` release, the `/fonts` folder was mistakenly placed in `dist/` following the conversion of primer/brand to a monorepo.

  This has now been fixed in `0.5.3` by restoring the folder to package root to preserve backwards compatibility.

- [#102](https://github.com/primer/brand/pull/102) [`7fa82a5`](https://github.com/primer/brand/commit/7fa82a5173193d23cabec1c7b2731aa4bd3c43ef) Thanks [@rezrah](https://github.com/rezrah)! - Added size prop to Heading component for granular control of visual sizing.

  Usage example:

  ```jsx
  <Heading as="h2" size="4">
    This h2 will appear visually identical to a h4
  </Heading>
  ```

## 0.5.2

### Patch Changes

- [#92](https://github.com/primer/brand/pull/92) [`fcef134`](https://github.com/primer/brand/commit/fcef1344f7c1af85691f931851a4dd98a0004099) Thanks [@rezrah](https://github.com/rezrah)! - No updates in this release.

  New package versions published to verify the release process.

## 0.5.1

### Patch Changes

- [#87](https://github.com/primer/brand/pull/87) [`0a82cd4`](https://github.com/primer/brand/commit/0a82cd42e8eb4f001504345172d209a33e18a476) Thanks [@rezrah](https://github.com/rezrah)! - UI bugfixes for `SubdomainNavBar` and `Testimonial` components.

  ## SubdomainNavBar

  - Fix bug where a missing `SubdomainNavBar.Search` child would cause the `SubdomainNavBar` to render incorrectly, despite being optional.
  - Fix bug where the overflow menu still appears when there are no items in the overflow menu.
  - Fix bug where longer titles caused text wrapping and layout issues. Slightly longer titles are now accepted.

  ## Testimonial

  - Increase spacing beneath the quote visual to 48px from 45px.

* [#89](https://github.com/primer/brand/pull/89) [`396734e`](https://github.com/primer/brand/commit/396734ecc4d4559c5ea7a63d009050b2b487d489) Thanks [@rezrah](https://github.com/rezrah)! - Add `titleHref` and `fullWidth` props for SubdomainNavBar

  Usage example:

  ```jsx
  <SubdomainNavBar fullWidth={true} titleHref="/something-other-than-home" title="Subdomain">
    {/* ... */}
  </SubdomainNavBar>
  ```

## 0.5.0

### Minor Changes

- [#81](https://github.com/primer/brand/pull/81) [`88e2007`](https://github.com/primer/brand/commit/88e20076f797338b9ab6d7d2d932320094cda5d7) Thanks [@rezrah](https://github.com/rezrah)! - Added `SubdomainNavBar` component.

  Usage example:

  ```jsx
  <SubdomainNavBar title="Subdomain">
    <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
    <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
    <SubdomainNavBar.Search ref={inputRef} onSubmit={handleSubmit} />
    <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
    <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
  </SubdomainNavBar>
  ```

  See the [documentation](https://primer.style/brand/components/SubdomainNavBar) and [Storybook](https://primer.style/brand/storybook/?path=/story/components-subdomainnavbar--playground) for more usage examples.

* [#82](https://github.com/primer/brand/pull/82) [`afbab6c`](https://github.com/primer/brand/commit/afbab6c24b5a8fe08d6eea28dfebc4bde143bfd5) Thanks [@rezrah](https://github.com/rezrah)! - Added `Testimonial` component.

  Usage example:

  ```jsx
  <Testimonial>
    <Testimonial.Quote>
      GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first line
      of code we&apos;re writing.
    </Testimonial.Quote>
    <Testimonial.Name position="Staff Security Engineer">David Ross</Testimonial.Name>
    <Testimonial.Avatar
      src="https://avatars.githubusercontent.com/u/92997159?v=4"
      alt="Circular avatar from David Ross's GitHub profile"
    />
  </Testimonial>
  ```

  See the [documentation](https://primer.style/brand/components/Testimonial) or [Storybook](https://primer.style/brand/storybook/?path=/story/components-testimonial--playground) for more usage examples.

- [#82](https://github.com/primer/brand/pull/82) [`afbab6c`](https://github.com/primer/brand/commit/afbab6c24b5a8fe08d6eea28dfebc4bde143bfd5) Thanks [@rezrah](https://github.com/rezrah)! - Added `Stack` component.

  Usage example:

  ```jsx
  <Stack direction="horizontal" gap="spacious" padding="spacious">
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
    <div>
      <img
        src="https://via.placeholder.com/300x150/f5f5f5/f5f5f5.png"
        alt="placeholder with gray background and no foreground text"
      />
    </div>
  </Stack>
  ```

  See [Storybook](https://primer.style/brand/storybook/?path=/story/components-stack--playground) for more usage examples.

## 0.4.0

### Minor Changes

- [#78](https://github.com/primer/brand/pull/78) [`487a9e7`](https://github.com/primer/brand/commit/487a9e7b03b6c196358e1f1146fd87e8c4fe44d4) Thanks [@JoshBowdenConcepts](https://github.com/JoshBowdenConcepts)! - Added a new `size` prop to `Button` and a `medium` sized variant, making the previous `large` size optional.

  ⚠️ This update should be considered a breaking change, despite being issued in a `minor` release.

  Selectable values: `medium` (default) and `large`.

  **Upgrade steps:**

  ```diff
  - <Button>before</Button>
  + <Button size="large">after</Button>
  ```

* [#69](https://github.com/primer/brand/pull/69) [`7838af5`](https://github.com/primer/brand/commit/7838af57ae2fdb94d07c188a142feebc0a4a605d) Thanks [@rezrah](https://github.com/rezrah)! - Added `FormControl`, `Checkbox`, `TextInput` and `Select` components.

  **Read the Technical Previews for usage examples:**

  [🔗 FormControl](https://primer.style/brand/components/FormControl)

  [🔗 Checkbox](https://primer.style/brand/components/Checkbox)

  [🔗 TextInput](https://primer.style/brand/components/TextInput)

  [🔗 Select](https://primer.style/brand/components/Select)

## 0.3.1

### Patch Changes

- [#59](https://github.com/primer/brand/pull/59) [`fdc731b`](https://github.com/primer/brand/commit/fdc731bda050aaef7041aafe6aaa7857c49ea03b) Thanks [@rezrah](https://github.com/rezrah)! - Added `fillMedia` prop to River.Visual

  Previously, all image and video children were automatically styled to fit the parent elements dimensions.

  This isn't ideal in all situations, so the ability to toggle-off this behaviour is now available through an `fillMedia` prop.

## 0.3.0

### Minor Changes

- [`c8609a8`](https://github.com/primer/brand/commit/c8609a8d35ea80192d85e97794390207f4624e63) Thanks [@rezrah](https://github.com/rezrah)! - added an FAQ component, which displays a list of questions and answers relating to a particular subject.

  [See usage examples](https://primer.style/brand/components/FAQ)

* [#45](https://github.com/primer/brand/pull/45) [`2fb6924`](https://github.com/primer/brand/commit/2fb6924a834ddcbad34cfb97ecfc1659d54f4ed5) Thanks [@rezrah](https://github.com/rezrah)! - > **Warning**

  > This is a breaking change, but as the library is a pre-v1 release we are publishing this update as a `minor` change.
  > Please read the following instructions carefully before updating:

  ### Updated references for "left" and "right" to "start" and "end"

  For improved i18n support and closer alignment with our Figma naming conventions, we have updated the references for "left" and "right" to "start" and "end" respectively in `Hero` and `River` components.

  ```diff
  - <River align="left">
  - <River align="right">
  + <River align="start">
  + <River align="end">
  ```

## 0.2.1

### Patch Changes

- [#38](https://github.com/primer/brand/pull/38) [`b0c9293`](https://github.com/primer/brand/commit/b0c929389d62f184e5ae447c0b00e351cb2d1c6e) Thanks [@rezrah](https://github.com/rezrah)! - updated `css-loader` to generate valid (escaped) class names

## 0.2.0

### Minor Changes

- [#33](https://github.com/primer/brand/pull/33) [`662fcfc`](https://github.com/primer/brand/commit/662fcfc6d123460730317b7ddd3d3a4622d30dce) Thanks [@rezrah](https://github.com/rezrah)! - - Adds `River` component

  - Renames `LinkButton` to `Button` :warning: (see below)
  - Button supports polymorphism and can be used `as` either `a` or `button`

  ### `River`

  **NEW** Component :sparkles:

  <table>
  <tr>
  <th> Before</th> <th> After</th>
  </tr>
  <tr>
  <td valign="top">❌</td>
  <td valign="top">

  ```jsx
  // import {River} from "@primer/react-brand";

  <River>
    <River.Visual>
      <img
        src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
        alt="placeholder, blank area with an off-white background color"
      />
    </River.Visual>
    <River.Content>
      <Heading>Heading</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis
        felis nam pulvinar risus elementum.
      </Text>
      <Link href="#">Call to action</Link>
    </River.Content>
  </River>
  ```

  </td>
  </tr>
  </table>

  See more examples in our documentation.
  https://primer.style/brand/components/River

  ### `LinkButton`

  > **Warning**
  > The changes below should be considered a breaking change for anyone relying on `LinkButton`, but as we are shipping a pre-v1 library, this has been marked as a `minor` release rather than `major`. Please remember to update your usage per the below example.

  <table>
  <tr>
  <th> Before</th> <th> After</th>
  </tr>
  <tr>
  <td valign="top">

  ```jsx
  //import { LinkButton } from '@primer/react-brand';

  <LinkButton href="#">Sign up</LinkButton>
  ```

  </td>
  <td valign="top">

  ```jsx
  //import { Button } from '@primer/react-brand';

  <Button as="a" href="#">
    Sign up
  </Button>
  ```

  </td>
  </tr>
  <tr>
  <td valign="top">

  ❌

  </td>
  <td valign="top">

  ```jsx
  //import { Button } from '@primer/react-brand';

  <Button onClick={handler}>Sign Up</Button>
  ```

  </td>
  </tr>

  </table>

## 0.1.0

### Minor Changes

- [#19](https://github.com/primer/brand/pull/19) [`3b22e9e`](https://github.com/primer/brand/commit/3b22e9e0823401104d6e33b3c4f8664b755ea6ba) Thanks [@colebemis](https://github.com/colebemis)! - Add `size` prop to `Hero` component

### Patch Changes

- [#23](https://github.com/primer/brand/pull/23) [`77abf53`](https://github.com/primer/brand/commit/77abf535e77ef26fa29fb09d6d2dfb746f4bc383) Thanks [@rezrah](https://github.com/rezrah)! - add Text and Heading components

* [#29](https://github.com/primer/brand/pull/29) [`144c7d7`](https://github.com/primer/brand/commit/144c7d762a91cb691699e4f8923ab08385c77966) Thanks [@rezrah](https://github.com/rezrah)! - Removed `gh-variables.css` from package as Brand variables are now surfaced in main.css

  **To upgrade:**

  - _Remove_ `import "@primer/react-brand/lib/css/gh-variables.css"`

  - _Add_ `import "@primer/react-brand/lib/css/main.css"`

- [#23](https://github.com/primer/brand/pull/23) [`77abf53`](https://github.com/primer/brand/commit/77abf535e77ef26fa29fb09d6d2dfb746f4bc383) Thanks [@rezrah](https://github.com/rezrah)! - forward className in Hero

* [#25](https://github.com/primer/brand/pull/25) [`4b00b72`](https://github.com/primer/brand/commit/4b00b72f5dbf5e578351ea77e1e74cddc69833e7) Thanks [@rezrah](https://github.com/rezrah)! - adds baseline tokens

- [#21](https://github.com/primer/brand/pull/21) [`ab06cce`](https://github.com/primer/brand/commit/ab06cceb6ed3b2eaca70f9738b9708343b4e6db9) Thanks [@rezrah](https://github.com/rezrah)! - Remove fixed background color from `Hero` to allow underlying customisation to be surfaced.

* [#27](https://github.com/primer/brand/pull/27) [`ca2d300`](https://github.com/primer/brand/commit/ca2d3002ba6f7ca9c719f80077c4d95246f33410) Thanks [@rezrah](https://github.com/rezrah)! - Updated Hero text appearance

  - **updated** Hero description text size from `500` to `400`
  - **updated** button alignment to not stretch on mobile viewports
  - **removed** `size` prop. Now only one responsive size available.

## 0.0.3

### Patch Changes

- [#18](https://github.com/primer/brand/pull/18) [`0835830`](https://github.com/primer/brand/commit/0835830fc15c582e280ac692ff3d578d6bcf282e) Thanks [@rezrah](https://github.com/rezrah)! - Fixes for production bundles

## 0.0.2

### Patch Changes

- [#2](https://github.com/primer/brand/pull/2) [`ab01a8a`](https://github.com/primer/brand/commit/ab01a8ad1dc504f7a2865213b6f41c0b0adba131) Thanks [@colebemis](https://github.com/colebemis)! - Initialize releases with [changesets](https://github.com/changesets/changesets)
