# @primer/react-brand

## 0.61.0

### Minor Changes

- [#1192](https://github.com/primer/brand/pull/1192) [`065fe69`](https://github.com/primer/brand/commit/065fe692b387041d52bc8d463e5708c794d6f3dc) Thanks [@rezrah](https://github.com/rezrah)! - Improved typographic defaults for all `Text` and `Heading` instances.

  > [!WARNING]
  > This release contains various breaking changes.
  > Review these notes carefully and validate the updated typography in your project before upgrading.

  - `Text` and `Heading` components now apply a default `font-weight` range between `410` and `525`. This leads to an overall lighter typographic style in practice.
  - All `Heading` sizes above `700` are now smaller on the widest viewports. E.g. `display` size is now `64px` instead of `96px`.
  - No sizes were removed in this update. `weight` prop will continue to allow overriding as before.
  - All `Heading` instances now use `text-wrap: balance` by default. This can be disabled using the new `textWrap` prop. E.g. `textWrap="none"`
  - Replaced `monospace` system font with our proprietary Mona Sans Mono typeface for a consistent fixed width character set across OS's
  - ⚠️ Mona Sans font file location has been updated. The typeface has also been updated to the latest pre-release version and includes a new `opsz` axes for built-in optically-sized glyphs.

    If you were previously importing the font file directly from the package, please note its new location:

    ```diff
    - @primer/react-brand/fonts/MonaSans.woff2
    + @primer/react-brand/fonts/MonaSansVF[wdth,wght,opsz].woff2
    ```

  - A stylesheet for typography design tokens has been removed from the package. A replacement stylesheet with responsive values is available as a replacement.

    ```diff
    - @primer/react-brand/lib/design-tokens/css/tokens/functional/typography/typography.css
    ```

    Prefer:

    ```diff
    + @primer/react-brand/lib/design-tokens/css/tokens/functional/typography/typography-responsive.css
    ```

  Additional components affected by changes to font weights:

  - `Button`
  - `ComparisonTable`
  - `EyebrowBanner`
  - `FAQ`
  - `FormControl`
  - `IDE`
  - `Label`
  - `Link`
  - `SectionIntroStacked`
  - `SubNav`
  - `SubdomainNavBar`
  - `Tabs`
  - `Testimonial`
  - `River`
  - `RiverBreakout`

## 0.60.1

### Patch Changes

- [#1204](https://github.com/primer/brand/pull/1204) [`2148797`](https://github.com/primer/brand/commit/214879769a1565ac9feaa9d5987a83cbbddca07c) Thanks [@rezrah](https://github.com/rezrah)! - The `inert` attribute applied to unopened `RiverAccordion` items is now set through a runtime DOM manipulation. This helps to bypass type mismatches between React 18 and 19 but has no material impact to the accessibility or rendering of the final markup.

## 0.60.0

### Minor Changes

- [#1195](https://github.com/primer/brand/pull/1195) [`55474b4`](https://github.com/primer/brand/commit/55474b49d00c4973d1df85b104719a2de2514ed2) Thanks [@rezrah](https://github.com/rezrah)! - Improved support for React v19.

  All components now have improved support for React v19 type signatures, in addition to continued backwards compatibility with React v18.

  As part of this change, the following has changed:

  - Refs as props are now handled correctly in `FAQGroup`, `ActionMenu`, `Bento`, `Button`/`ButtonGroup`, and other compound components.
  - Removed internal type casting on various components. This ensures that props are inferred correctly using the new JSX runtime in React v19.
  - Removed internal dependency on `react-is` for `Fragment` detection

  No changes to component behavior or presentation is expected as part of this change.

## 0.59.2

### Patch Changes

- [#1187](https://github.com/primer/brand/pull/1187) [`168a187`](https://github.com/primer/brand/commit/168a1873c3154264f3c66fa4cab9793e11c8a68e) Thanks [@rezrah](https://github.com/rezrah)! - No-op upgrade to our internal linting toolchain (ESLint v9), which affects the source code organization of this package. No functional impact is expected.

## 0.59.1

### Patch Changes

- [#1183](https://github.com/primer/brand/pull/1183) [`01f5f05`](https://github.com/primer/brand/commit/01f5f05e76b6cb8225d697e6fdda7d539cabf482) Thanks [@rezrah](https://github.com/rezrah)! - Fixed an `AnchorNav` bug on narrow viewports where tabbing outside of the opened menu didn't close it.

## 0.59.0

### Minor Changes

- [#1178](https://github.com/primer/brand/pull/1178) [`f49bfd4`](https://github.com/primer/brand/commit/f49bfd4df34a787baa7525fef2e154db21ff1a37) Thanks [@rezrah](https://github.com/rezrah)! - Replaced `end` values with `flex-end` across multiple components to resolve downstream compilation issues with older browserslist configs.

  This change affects the following components:

  - `Bento`
  - `SubNav`
  - `Select`
  - `RiverBreakout`

### Patch Changes

- [#1174](https://github.com/primer/brand/pull/1174) [`ec9ad69`](https://github.com/primer/brand/commit/ec9ad69c22c34703c3aaa67288d60d88ee8b70ce) Thanks [@rezrah](https://github.com/rezrah)! - Internal refactoring to `SubNav` types. Updates the `ref` type from `HTMLElement` to `HTMLDivElement` to match the runtime `forwardRef` value.

## 0.58.2

### Patch Changes

- [#1168](https://github.com/primer/brand/pull/1168) [`6674211`](https://github.com/primer/brand/commit/66742111b3d8b6481a0f9a07cf1aa62d3372934d) Thanks [@danielguillan](https://github.com/danielguillan)! - Makes `PricingOptions` feature list text size smaller when there are 4 items

- [#1138](https://github.com/primer/brand/pull/1138) [`bb23073`](https://github.com/primer/brand/commit/bb230733a4d69cc580b190c300e7852add366058) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Added an `aria-label` to the list of tabs in the `IDE` component.

  - Improved types in `useTabs` hook, which is used internally in the `IDE` and `Tabs` components.

- [#1170](https://github.com/primer/brand/pull/1170) [`97994b8`](https://github.com/primer/brand/commit/97994b8a6a7fb9aa014a3687807ca2e10bf9599b) Thanks [@rezrah](https://github.com/rezrah)! - Improved footnote support to the `Statistic` component.

  Also fixes rendering of more complex `children` in both `Statistic.Heading` and `Statistic.Description`, where it would previously render `[object Object]`.

## 0.58.1

### Patch Changes

- [#1156](https://github.com/primer/brand/pull/1156) [`fc489e8`](https://github.com/primer/brand/commit/fc489e81c7ff7bfb58a2ca8606d450842486161b) Thanks [@danielguillan](https://github.com/danielguillan)! - Ensures the `svg` in the `Icon` component is properly aligned vertically

- [#1157](https://github.com/primer/brand/pull/1157) [`766850f`](https://github.com/primer/brand/commit/766850fbad01d180554eb9a20d254e80734f8630) Thanks [@danielguillan](https://github.com/danielguillan)! - Improves the appearance of the focus ring on the `minimal` variant of `Card`.

## 0.58.0

### Minor Changes

- [#1151](https://github.com/primer/brand/pull/1151) [`3e39ae1`](https://github.com/primer/brand/commit/3e39ae100ad5a26bb6b4eeab63bd7fe390d25cd7) Thanks [@rezrah](https://github.com/rezrah)! - Updated the minimum Node.js dependency for `@primer/react-brand` to match the current LTS version: `v22`

  Also updated `webpack` and various other internal dependencies.

- [#1132](https://github.com/primer/brand/pull/1132) [`072f640`](https://github.com/primer/brand/commit/072f640b29ebee05fd65e5d4a25e101fc46d4f0e) Thanks [@rezrah](https://github.com/rezrah)! - Added new `Tabs` component.

  Example:

  ```jsx
  <Tabs {...args} aria-label="Tabs">
    <Tabs.Item>Tab one</Tabs.Item>
    <Tabs.Item>Tab two</Tabs.Item>

    <Tabs.Panel>
      <Text>Panel one</Text>
    </Tabs.Panel>
    <Tabs.Panel>
      <Text>Panel two</Text>
    </Tabs.Panel>
  </Tabs>
  ```

### Patch Changes

- [#1133](https://github.com/primer/brand/pull/1133) [`23a0d50`](https://github.com/primer/brand/commit/23a0d50c8f5f2ca4f8f63bc105cad44da5662962) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added some comments to the `Accordion` component. This is a no-op update.

- [#1132](https://github.com/primer/brand/pull/1132) [`072f640`](https://github.com/primer/brand/commit/072f640b29ebee05fd65e5d4a25e101fc46d4f0e) Thanks [@rezrah](https://github.com/rezrah)! - Updates to `useTabs` hook:

  - Added an optional `externalRef` parameter to `getTabProps` function for improved forwardRef support.
  - Fixed `onTabActivate` callback to only trigger when switching between tabs (not on initial mount)
  - Optimized focus state management by preventing unnecessary state updates when focus doesn't change.
  - Removed redundant state updates in `focusTab` and `onTabFocus` functions

  This affects the following components, which use this hook:

  - `Tabs` component
  - `IDE` component

## 0.57.2

### Patch Changes

- [#1134](https://github.com/primer/brand/pull/1134) [`8b8aa33`](https://github.com/primer/brand/commit/8b8aa330eea91b5789c6a43e46ec91c0e803625d) Thanks [@iansan5653](https://github.com/iansan5653)! - Upgrade `@primer/behaviors`

- [#1129](https://github.com/primer/brand/pull/1129) [`81bb018`](https://github.com/primer/brand/commit/81bb0180838ca63400dfab23d7d2bbbb690d4abd) Thanks [@rezrah](https://github.com/rezrah)! - Added new `SectionIntroStacked` component.

  This component is an alternative header pattern to `SectionIntro`.

  :link: [Read the documentation for usage examples](https://primer.style/brand/components/SectionIntroStacked/)

## 0.57.1

### Patch Changes

- [#1121](https://github.com/primer/brand/pull/1121) [`cb34663`](https://github.com/primer/brand/commit/cb34663848fed90ed5da01d142496f664a700983) Thanks [@rezrah](https://github.com/rezrah)! - Fix layout shift in the `PricingOptions` feature list accordion

  The feature lists now respect their explicit `expanded` prop values on the initial render, and no longer apply default animations. This prevents layout shift in certain SSR contexts where the component was incorrectly relying on the client-side `window` size even when explicitly passed `expanded={true}` or `expanded={false}`, which shouldn't depend on viewport size.

- [#1120](https://github.com/primer/brand/pull/1120) [`c7d36b9`](https://github.com/primer/brand/commit/c7d36b9abde56de2e5d6e2f181c1d74d146278ae) Thanks [@rezrah](https://github.com/rezrah)! - Fix layout shift in `SubNav` by ensuring separator visibility is determined pre-hydration.

- [#1124](https://github.com/primer/brand/pull/1124) [`826cd81`](https://github.com/primer/brand/commit/826cd81e3f9c5647a1a734428bfbd624469c09d8) Thanks [@rezrah](https://github.com/rezrah)! - Fixed page layout shift caused by the `AnchorNav` component in a sticky state.

  Previously the `AnchorNav` would remove its computed height from the underlying page in sticky state. Now that lost space is compensated for to create a smoother scrolling experience.

## 0.57.0

### Minor Changes

- [#1101](https://github.com/primer/brand/pull/1101) [`7d344dc`](https://github.com/primer/brand/commit/7d344dca19e2b2b143f64a81d9fcdc92024c4326) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added play/pause control to the `IDE` component.

  ⚠️ Removed the `showReplayButton` prop as the play/pause control replaces its functionality, and is always visible.

### Patch Changes

- [#1113](https://github.com/primer/brand/pull/1113) [`30d9f1f`](https://github.com/primer/brand/commit/30d9f1fb154fb23fb78c6902b0f85bb0db8e0f70) Thanks [@danielguillan](https://github.com/danielguillan)! - Updated the layout of single item `PricingOptions`

- [#1111](https://github.com/primer/brand/pull/1111) [`8dc3fc9`](https://github.com/primer/brand/commit/8dc3fc96bf504735785de124695fdb05d6828b3c) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improvements to the styling of various components when viewed in Windows High Contrast Mode.

  - `FAQGroup`: Improved appearance for the selected tab
  - `Pagination`: Improved appearance for the current page item
  - `VideoPlayer`: Improved legibility for all text and controls
  - `Checkbox`: Improved focus and checked appearance
  - `Radio`: Improved focus and checked appearance
  - `TextInput`: Improved focus appearance
  - `Textarea`: Improved focus appearance
  - `ActionMenu`: Improved focus appearance

- [#1114](https://github.com/primer/brand/pull/1114) [`3a62a9e`](https://github.com/primer/brand/commit/3a62a9ec0f6d653730b59c18d3e4fd94862b5c80) Thanks [@rezrah](https://github.com/rezrah)! - Added support for `<table>` elements in the `Prose` component. Tables now render with improved visual appearance.

  :link: [Refer to Prose documentation for usage examples](https://primer.style/brand/components/Prose/)

- [#1102](https://github.com/primer/brand/pull/1102) [`5ef7878`](https://github.com/primer/brand/commit/5ef787898226a43577bf38e7c366fcb9f2f5f637) Thanks [@joshfarrant](https://github.com/joshfarrant)! - The `Button` component now automatically applies semantically correct disabled attributes based on the rendered element type. E.g. `disabled` for button elements and `aria-disabled` for other elements.

  ⚠️ Please review usage of `Button` in your application code or tests, to ensure that you are not relying on the previously incorrect markup. For example, if you previously targeted `a[disabled]`, you should now target `a[aria-disabled]` instead.

## 0.56.3

### Patch Changes

- [#1084](https://github.com/primer/brand/pull/1084) [`d0757df`](https://github.com/primer/brand/commit/d0757df2f749e3e5daf3c69d398fbc221f0543f2) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved keyboard navigation in `SubNav` anchor variant.

  The anchor-based submenu now appears after the main `SubNav` items in the focus order, and becomes visible when focussed.

- [#1085](https://github.com/primer/brand/pull/1085) [`61e9adc`](https://github.com/primer/brand/commit/61e9adc3e6fdf7b594f6fad27ebcf032342ddc72) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Minor internal refactoring to `VideoPlayer` component

- [#1072](https://github.com/primer/brand/pull/1072) [`775e640`](https://github.com/primer/brand/commit/775e64090300f558e5f245312b4c5f7ede33d717) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug in the `SubNav` component where the separator could appear on a new line during initial render in Safari.

- [#1082](https://github.com/primer/brand/pull/1082) [`6531558`](https://github.com/primer/brand/commit/6531558bf22b2251ae7febcafd159b8441030c78) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Internal refactoring to `SubdomainNavBar` component to remove an unused prop — `showOnlyOnNarrow` — which was leaking into the DOM.

- [#1097](https://github.com/primer/brand/pull/1097) [`d7a954f`](https://github.com/primer/brand/commit/d7a954fb1d4dbbe2ef5d4327094a3036c3b8a4c1) Thanks [@rezrah](https://github.com/rezrah)! - Add support for privacy-enhanced Youtube embeds in the `Prose` component. Now supports the `youtube-nocookie.com` hostname.

- [#1089](https://github.com/primer/brand/pull/1089) [`afd46c1`](https://github.com/primer/brand/commit/afd46c1f8d76b9d6f7843f065f4306fdc2238c49) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved focus styles for links inside `Timeline.Item`.

- [#1087](https://github.com/primer/brand/pull/1087) [`35f3e3e`](https://github.com/primer/brand/commit/35f3e3e799213a211f111e56b0f16c343e948256) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added visually-hidden, non-breaking spaces between each text item in the `EyebrowBanner` component. This improves announcements in screen readers, where they would previously be announced without a pause.

## 0.56.2

### Patch Changes

- [#1075](https://github.com/primer/brand/pull/1075) [`a2c84fd`](https://github.com/primer/brand/commit/a2c84fd6847f02a88bfbd61969590db3a759a703) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added `onNarrowMenuToggle` prop to `SubdomainNavBar`. When the menu is opened or closed on narrow viewports, the provided `onNarrowMenuToggle` callback is called with the new open state.

  This prop can be used to ensure the main content area is hidden from assistive technologies when the menu is open.

- [#1074](https://github.com/primer/brand/pull/1074) [`bcf5bda`](https://github.com/primer/brand/commit/bcf5bda8d3d32137bd00ad885756b0bb539dee56) Thanks [@rezrah](https://github.com/rezrah)! - Improved styling for `<video>` elements and Youtube embeds in the `Prose` component

- [#1081](https://github.com/primer/brand/pull/1081) [`b2ed501`](https://github.com/primer/brand/commit/b2ed50150c213ce4fd2865a1c43edf84d69116e5) Thanks [@rezrah](https://github.com/rezrah)! - Updated `useProvidedRefOrCreate` to support functional refs. Backwards compatibility with `RefObject` remains unchanged.

  This update improves support for functional refs in the following components: `Accordion`, `Checkbox`, `Radio`, `SubNav`, `Tooltip` and `VideoPlayer`.

- [#1073](https://github.com/primer/brand/pull/1073) [`cfe8c0b`](https://github.com/primer/brand/commit/cfe8c0bcb61308b5f45a7c9436d7e7528220e43d) Thanks [@rezrah](https://github.com/rezrah)! - Updated visual heading hierarchy in the `Prose` component.

  - `h3` reduced from `size-500` to `size-400`
  - `h4` reduced from `size-400` to `size-300`
  - `h5` reduced from `subhead-large` to `subhead-medium`
  - `h2` and `h6` are unchanged

  This update makes it easier to visually distinguish between `h2` and `h3` elements on the page, which were previously too similar in size.

## 0.56.1

### Patch Changes

- [#1048](https://github.com/primer/brand/pull/1048) [`3512d15`](https://github.com/primer/brand/commit/3512d15d3c0e52d1dbecb3d363fa9dd54b640e8e) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Children passed to `Card` component now appear in the DOM in a predefined order to improve the experience of screen reader users.

- [#1070](https://github.com/primer/brand/pull/1070) [`86e8e8c`](https://github.com/primer/brand/commit/86e8e8c1332fdd97dda654ee986f0f7088e77b01) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug where an `FAQ.Heading` used within an `FAQGroup` wouldn't respect the provided `as` prop.

## 0.56.0

### Patch Changes

- [#1052](https://github.com/primer/brand/pull/1052) [`7c16517`](https://github.com/primer/brand/commit/7c16517c710124fb716f78e59e028f5ed6ab0675) Thanks [@joshfarrant](https://github.com/joshfarrant)! - The `SubNav` component now traps focus inside the expanded menu on narrow viewports.

- [#1051](https://github.com/primer/brand/pull/1051) [`2946071`](https://github.com/primer/brand/commit/2946071e02a526c56eb0404266b991c7c48f3e43) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Tooltips in the `VideoPlayer` component now remain briefly visible after the pointer is moved away from the toggle. This small delay improves general usability and helps meet the [WCAG 1.4.13 criterion](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) for accessible hover interactions with tooltips.

- [#917](https://github.com/primer/brand/pull/917) [`0ca0f08`](https://github.com/primer/brand/commit/0ca0f0818be9a0a28031a057da034f8b61b6342d) Thanks [@rezrah](https://github.com/rezrah)! - Internal change to CSS module type definitions in the `IDE` component. No user-facing updates to `IDE` presentation or functionality are expected.

- [#1050](https://github.com/primer/brand/pull/1050) [`6772b34`](https://github.com/primer/brand/commit/6772b34a0d969f8c067308048cc9a1d63eb08e92) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added an `aria-label` to the GitHub logo in the `VideoPlayer` component

- [#1055](https://github.com/primer/brand/pull/1055) [`3419824`](https://github.com/primer/brand/commit/3419824d3869a90c2e0c7ed3cbc638ed141669e7) Thanks [@rezrah](https://github.com/rezrah)! - Restore `idle` option to `LogoSuite.Logobar` for enabling a default paused state, and programmatic control over animation.

  Use `marqueeSpeed="idle"` to display a logo bar that is initially paused.

  ```jsx
  <LogoSuite>
    <LogoSuite.Heading />
    <LogoSuite.Logobar marquee marqueeSpeed="idle" />
  </LogoSuite>
  ```

## 0.55.0

### Patch Changes

- [#1044](https://github.com/primer/brand/pull/1044) [`8a1bb23`](https://github.com/primer/brand/commit/8a1bb23681c79813b2d74a6907b957c9ab6ff55e) Thanks [@rezrah](https://github.com/rezrah)! - Increase specificity of custom fill styles in `PricingOptions.FeatureListItem` and `UnorderedList.Item`. This update ensures that the value of `leadingVisualFill` takes a higher precedence over rules that might otherwise override it.

- [#1042](https://github.com/primer/brand/pull/1042) [`50705e3`](https://github.com/primer/brand/commit/50705e37517f7a8286be6f35aaabee8c75daf4be) Thanks [@rezrah](https://github.com/rezrah)! - Add `Hero.Video` slot to `Hero` for inserting custom videos.

  ```jsx
  <Hero>
    <Hero.Heading>Your super sweet hero heading</Hero.Heading>
    <Hero.Video>
      <VideoPlayer title="Your custom video">
        <VideoPlayer.Source src="./example.mp4" type="video/mp4" />
        <VideoPlayer.Track src="./example.vtt" default />
      </VideoPlayer>
    </Hero.Video>
  </Hero>
  ```

  Refer to Storybook for more usage examples.

- [#993](https://github.com/primer/brand/pull/993) [`1e970b6`](https://github.com/primer/brand/commit/1e970b6953ed5153e6c71ef2aec0ea6bc1f28007) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Update accessible label of `SubNav` submenu toggle button

  - Update accessible label of `ActionMenu` dropdown toggle button

- [#1009](https://github.com/primer/brand/pull/1009) [`b3ba1dc`](https://github.com/primer/brand/commit/b3ba1dcd1d78b6bc3b157d705cb0b5803c959738) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Accessibility fixes to `Pagination` component

  - Fixed a bug where the "..." button was focusable
  - Fixed a bug where the "Previous" and "Next" buttons had the role `"link"` instead of `"button"`
  - Fixed a bug where the "Previous" and "Next" buttons lost their `aria-label` when disabled

- [#1035](https://github.com/primer/brand/pull/1035) [`4b854e6`](https://github.com/primer/brand/commit/4b854e69b5bd9d76a4e5500535716a72802f06f5) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a `gap` prop with a new `condensed` option to `LogoSuite.Logobar`.

  ```jsx
  <LogoSuite>
    <LogoSuite.Heading visuallyHidden>Heading</LogoSuite.Heading>
    <LogoSuite.Logobar gap="condensed">{/* ... */}</LogoSuite.Logobar>
  </LogoSuite>
  ```

## 0.54.2

### Patch Changes

- [#1030](https://github.com/primer/brand/pull/1030) [`4ee490d`](https://github.com/primer/brand/commit/4ee490d0ade8d057d147a9f012af77f5a35d7455) Thanks [@rezrah](https://github.com/rezrah)! - Fixed `SubdomainNavBar` to preserve the original ordering of actions in JSX, allowing more flexibility in CTA placement.

  ```jsx
  <SubdomainNavBar title="Subdomain">
    <SubdomainNavBar.Link />
    <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    {/* Primary actions can now render at the end */}
    <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
  </SubdomainNavBar>
  ```

- [#1031](https://github.com/primer/brand/pull/1031) [`094cdf4`](https://github.com/primer/brand/commit/094cdf4977a8a749625317c27aa1290380d24bc5) Thanks [@rezrah](https://github.com/rezrah)! - `SubNav` component now correctly forwards refs to the underlying element.

- [#1034](https://github.com/primer/brand/pull/1034) [`0d3a198`](https://github.com/primer/brand/commit/0d3a1988a39ec97fa92c56815ccead7d22a41e78) Thanks [@rezrah](https://github.com/rezrah)! - Increased contrast on `LogoSuite.Logobar` play/pause button in `marquee` mode.

## 0.54.1

### Patch Changes

- [#1025](https://github.com/primer/brand/pull/1025) [`667d820`](https://github.com/primer/brand/commit/667d82065ae71bab332252bb3da5e726f3f56e69) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Removed `aria-describedby` from `AnchorNav.Link` component.

- [#1015](https://github.com/primer/brand/pull/1015) [`1afeeae`](https://github.com/primer/brand/commit/1afeeaeb9329251b79a3f737dbec118006e91e20) Thanks [@danielguillan](https://github.com/danielguillan)! - Fixed an issue in `ActionMenu` where anchor links in `split-button` mode were only clickable on the text. Now, the clickable area covers the full width and height of the item.

- [#1024](https://github.com/primer/brand/pull/1024) [`97b7a97`](https://github.com/primer/brand/commit/97b7a97719af118419f278fade092b387a0ee2b7) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved accessibility of `SubNav` component when no active link — denoted by `aria-current="page"` — is present.

  - Hide last separator (on large viewports only) when there is no active link
  - Set a fallback accessible label on the overlay toggle when there is no active link

- [#1020](https://github.com/primer/brand/pull/1020) [`584280e`](https://github.com/primer/brand/commit/584280e339c6e1bf039f66a9f1040dd4db29aa25) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `ActionMenu` bugfixes:

  - Fixed a bug in `ActionMenu.Item` where provided `onClick` and `onKeyDown` handlers wouldn't be called.
  - Fixed a bug which allowed <kbd>Tab</kbd> to cycle through the list of `ActionMenu.Item` elements which resulted in unpredictable focus behaviour. The intended way to navigate through the list is by using the arrow keys.

- [#1012](https://github.com/primer/brand/pull/1012) [`ce945a2`](https://github.com/primer/brand/commit/ce945a2f7f2095cc58dbbd5665b23d3c3e60a711) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Removed the `Checkbox` and `Radio` components' built-in `<label>` as it was only used for styling and would result in inputs having two associated labels when used inside a `FormControl`.

- [#1017](https://github.com/primer/brand/pull/1017) [`dd93551`](https://github.com/primer/brand/commit/dd9355102da60eb5ecd89db0f3b2e478b7dab6d6) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Increased the touch target size of `SubNav.SubMenu` toggle button

## 0.54.0

### Minor Changes

- [#994](https://github.com/primer/brand/pull/994) [`61a1fa6`](https://github.com/primer/brand/commit/61a1fa688ee0da45878777f70711f4fccf025bc6) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `MinimalFooter` now respects the ordering of the `socialLinks` prop when rendering social links, e.g. `<MinimalFooter socialLinks={['x', 'tiktok', 'youtube']} />` will render the links in that order.

  Note: This may constitute a visual breaking change if you were relying on the social link order to _not_ be respected.

- [#920](https://github.com/primer/brand/pull/920) [`2af9c78`](https://github.com/primer/brand/commit/2af9c78f0c4dd191802598567c5e8a0a853fc704) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Added play/pause button to `LogoSuite` component.
  - Removed `"idle"` value from `LogoSuite.LogoBar` component's `marqueeSpeed` prop.
    - This prop was introduced to enable custom play/pause buttons but is no longer necessary as the play/pause button is now built into the component.

### Patch Changes

- [#1008](https://github.com/primer/brand/pull/1008) [`91073c0`](https://github.com/primer/brand/commit/91073c06a96f71cc13e624b7d20b105181291900) Thanks [@danielguillan](https://github.com/danielguillan)! - Added missing types in `PricingOptions.FeatureListGroupHeading`

- [#994](https://github.com/primer/brand/pull/994) [`61a1fa6`](https://github.com/primer/brand/commit/61a1fa688ee0da45878777f70711f4fccf025bc6) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Increased minimum touch target size of social icons in the `MinimalFooter` component to 24px.
  - Increased contrast of social icons in the `MinimalFooter` component to over 3:1.

## 0.53.0

### Minor Changes

- [#978](https://github.com/primer/brand/pull/978) [`d33f300`](https://github.com/primer/brand/commit/d33f30029d83d9464c42b57f13ebfcc17eaa41cf) Thanks [@danielguillan](https://github.com/danielguillan)! - ⚠️ Breaking changes

  The `PricingOptions.FeatureListHeading` component has been renamed to `PricingOptions.FeatureListGroupHeading`. `PricingOptions.FeatureListHeading` is now used to optionally customize the heading of the `PricingOptions` feature list accordion.

  ```diff
  - <PricingOptions.FeatureListHeading />
  + <PricingOptions.FeatureListGroupHeading />
  ```

  Full example with customizable accordion heading:,

  ```jsx
  <PricinOptions>
    <PricingOptions.FeatureList>
      <PricingOptions.FeatureListHeading>My custom title</PricingOptions.FeatureListHeading>
      <PricingOptions.FeatureListGroupHeading>Feature set 1</PricingOptions.FeatureListGroupHeading>
      <PricingOptions.FeatureListItem>Feature A</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Feature B</PricingOptions.FeatureListItem>
      <PricingOptions.FeatureListItem>Feature C</PricingOptions.FeatureListItem>
    </PricingOptions.FeatureList>
  </PricinOptions>
  ```

### Patch Changes

- [#1002](https://github.com/primer/brand/pull/1002) [`84d8e52`](https://github.com/primer/brand/commit/84d8e52f4b3f4c9a49cb9417f1f4a6c96649264e) Thanks [@danielguillan](https://github.com/danielguillan)! - - Updated styles and layout in `PricingOptions` for a more condensed design.

  - Added new `variant` options to support `gradient` styling in `PricingOptions`: `default-gradient` and `cards-gradient`.

  Usage example:

  ```jsx
  <PricingOptions variant="default-gradient">{/*...*/}</PricingOptions>
  ```

- [#1003](https://github.com/primer/brand/pull/1003) [`ab4d480`](https://github.com/primer/brand/commit/ab4d480fe0eb162c3913344019ec4264565e5b4c) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed an accessibility issue in the `SubNav` component where items within the `SubNav.SubMenu` weren't accessible to assistive technologies on narrow viewports.

- [#1001](https://github.com/primer/brand/pull/1001) [`0adad57`](https://github.com/primer/brand/commit/0adad575bddcfaa8eb8eb71b6afd0aeeaf3a757c) Thanks [@rezrah](https://github.com/rezrah)! - Add support for deeper link nesting in `SubNav`

  Use `SubNav.SubHeading` to present another tier of content between the `SubNav.Heading` and `SubNav.Link` sub-components.

  Usage example:

  ```jsx
  <SubNav>
    <SubNav.Heading href="#">Top-level page</SubNav.Heading>
    <SubNav.SubHeading href="#">Sub-level page</SubNav.SubHeading>
    <SubNav.Link href="#">Child page</SubNav.Link>
    <SubNav.Link href="#">Child page</SubNav.Link>
    <SubNav.Link href="#">Child page</SubNav.Link>
    <SubNav.Link href="#">Child page</SubNav.Link>
  </SubNav>
  ```

- [#976](https://github.com/primer/brand/pull/976) [`4cdb794`](https://github.com/primer/brand/commit/4cdb7943f5759c7a0bb5dd1499a5c71f7e9c9c6f) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a new `350` `size` option to the `Text` component.

  E.g.

  ```jsx
  <Text size="350">A new text size available</Text>
  ```

- [#976](https://github.com/primer/brand/pull/976) [`4cdb794`](https://github.com/primer/brand/commit/4cdb7943f5759c7a0bb5dd1499a5c71f7e9c9c6f) Thanks [@danielguillan](https://github.com/danielguillan)! - Increased the default text size for the `Hero` description and set its default font weight to "normal".

- [#1005](https://github.com/primer/brand/pull/1005) [`dcfdb2c`](https://github.com/primer/brand/commit/dcfdb2c75e76158efb8e9a06898ce652881a55e4) Thanks [@rezrah](https://github.com/rezrah)! - Updated default background color in dark mode from `#0d1117` (dark gray) to `#000000` (black) across all components as part of a revised visual design strategy.

- [#998](https://github.com/primer/brand/pull/998) [`fcade91`](https://github.com/primer/brand/commit/fcade91402d73592f84ec2e2f033099af949b41c) Thanks [@rezrah](https://github.com/rezrah)! - Fixed a `forwardRef` bug in `Checkbox`. An external `ref` can now be passed correctly to the component.

## 0.52.0

### Minor Changes

- [#991](https://github.com/primer/brand/pull/991) [`c083863`](https://github.com/primer/brand/commit/c083863bf4d6c2bb24147e2a9cece4975d0db09d) Thanks [@rezrah](https://github.com/rezrah)! - Updated the underlying HTML elements in the `Statistic` component for improved accessibility. Now a paragraph by default, where it was previously a heading. It can optionally also be set as a `<span>` using the `as` prop.

  ⚠️ Breaking changes:

  - `stretch` prop in `Statistic.Heading` has been removed.
  - `as` prop now accepts `p` and `span` only
  - `size` prop now accepts `1000`, `900`, `800`, `700`, `600`, `500`, `400`, `300`, `200`

- [`05aee45`](https://github.com/primer/brand/commit/05aee45ddcd87b2e7e95ec7d8d27d9153addf635) Thanks [@rezrah](https://github.com/rezrah)! - The torchlight visual effect on dark mode `Card` components is now optional. The new default effect is now similar to its `light` mode counterpart.

  To re-enable the torchlight effect, use `variant="torchlight"`. Note this effect continues to only work in `dark` color modes.

  ```jsx
  <ThemeProvider colorMode="dark">
    <Card variant="torchlight" />
  </ThemeProvider>
  ```

### Patch Changes

- [#989](https://github.com/primer/brand/pull/989) [`bb24a54`](https://github.com/primer/brand/commit/bb24a5456c3e96b81324c1d061f5c53e81e3f605) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Allow hovered `SubNav.SubMenu` menus to be closed using <kbd>Escape</kbd> key

- [#986](https://github.com/primer/brand/pull/986) [`c9f10ec`](https://github.com/primer/brand/commit/c9f10ec9d5b40a686bb9f5e88ccb22b47153a047) Thanks [@rezrah](https://github.com/rezrah)! - Visual updates to `Button` and `ActionMenu` components.

  - `secondary` button variants now feature lighter border colors.
  - `subtle` button variants now feature a semi-transparent background color in `rest` state.
  - `accent` button variants in dark mode now use a darker hue for parity with its GitHub product counterpart.

- [#991](https://github.com/primer/brand/pull/991) [`c083863`](https://github.com/primer/brand/commit/c083863bf4d6c2bb24147e2a9cece4975d0db09d) Thanks [@rezrah](https://github.com/rezrah)! - Additional `size` options available in the `Text` component: `800`, `900`, `1000`.

- [#985](https://github.com/primer/brand/pull/985) [`6364954`](https://github.com/primer/brand/commit/63649542577e14d4b66355c352d21625bf933aee) Thanks [@joshfarrant](https://github.com/joshfarrant)! - The focus outline color of `SubNav` links is now set to `var(--brand-color-focus);`

- [#961](https://github.com/primer/brand/pull/961) [`b43d15d`](https://github.com/primer/brand/commit/b43d15d6fffdb31d138d5a8a007bf58849d9c517) Thanks [@danielguillan](https://github.com/danielguillan)! - Noop update to smooth-scrolling behavior in `main.css`. Previous `scroll-behavior: smooth;` is still applied, but location in the compiled stylesheet has been updated.

- [#961](https://github.com/primer/brand/pull/961) [`b43d15d`](https://github.com/primer/brand/commit/b43d15d6fffdb31d138d5a8a007bf58849d9c517) Thanks [@danielguillan](https://github.com/danielguillan)! - Patched a type mismatch between React 18.x and 19.x for `inert` prop in `RiverAccordion` component. Refer to the [following source file for more details](https://github.com/primer/brand/blob/main/packages/react/src/river/RiverAccordion/RiverAccordion.tsx).

- [#961](https://github.com/primer/brand/pull/961) [`b43d15d`](https://github.com/primer/brand/commit/b43d15d6fffdb31d138d5a8a007bf58849d9c517) Thanks [@danielguillan](https://github.com/danielguillan)! - Updated `IDE` to use the full container width.

## 0.51.1

### Patch Changes

- [#972](https://github.com/primer/brand/pull/972) [`663a4c1`](https://github.com/primer/brand/commit/663a4c1c4ace65e45ed0e58ff604cf578c04f5e4) Thanks [@rezrah](https://github.com/rezrah)! - Add mode="split-button" variant to `ActionMenu` component

- [#972](https://github.com/primer/brand/pull/972) [`663a4c1`](https://github.com/primer/brand/commit/663a4c1c4ace65e45ed0e58ff604cf578c04f5e4) Thanks [@rezrah](https://github.com/rezrah)! - Removed default arrow visibility in the `ButtonGroup` and `CTABanner` components.

  Use `hasArrow` on individual `Button` elements to restore the previous arrow appearance.

- [#972](https://github.com/primer/brand/pull/972) [`663a4c1`](https://github.com/primer/brand/commit/663a4c1c4ace65e45ed0e58ff604cf578c04f5e4) Thanks [@rezrah](https://github.com/rezrah)! - `ActionMenu` overlay alignment now defaults to `end`, where it was previously `start`. Use the `menuAlignment` prop in `ActionMenu` to restore previous behavior if required.

## 0.51.0

### Minor Changes

- [#939](https://github.com/primer/brand/pull/939) [`7f0a119`](https://github.com/primer/brand/commit/7f0a11931f63e98f8c3ed4053d5a61d2a185a4c8) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Added a new `RiverAccordion` component.

  Usage example:

  ```tsx
  <RiverAccordion>
    <RiverAccordion.Item>
      <RiverAccordion.Heading>A Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>

    <RiverAccordion.Item>
      <RiverAccordion.Heading>Another Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>

    <RiverAccordion.Item>
      <RiverAccordion.Heading>One More Heading</RiverAccordion.Heading>
      <RiverAccordion.Content>Some content</RiverAccordion.Content>
      <RiverAccordion.Visual>
        <img src="placeholder.png" alt="placeholder" />
      </RiverAccordion.Visual>
    </RiverAccordion.Item>
  </RiverAccordion>
  ```

  🔗 [See the documentation for more usage examples](https://primer.style/brand/components/RiverAccordion)

  - Fixed a bug in the `Heading` component where the component would be re-mounted each render, causing it to lose focus when used inside a focusable element.

### Patch Changes

- [#974](https://github.com/primer/brand/pull/974) [`aea5ea4`](https://github.com/primer/brand/commit/aea5ea4c64132c3e08f0bf68aa32531b8de9384a) Thanks [@rezrah](https://github.com/rezrah)! - Removed `clsx` as a library dependency. Now treated as `devDependency`.

- [#966](https://github.com/primer/brand/pull/966) [`25db725`](https://github.com/primer/brand/commit/25db725f6be013137fadb0b3d4fca9a708a48fce) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug with the `SubNav` component where the `SubNav.Heading` and the current `SubNav.Link` were vertically misaligned in Safari on mobile viewports.

- [#971](https://github.com/primer/brand/pull/971) [`9de3349`](https://github.com/primer/brand/commit/9de33493a42b668bcf887dbcf0ff93de8fa6dff8) Thanks [@rezrah](https://github.com/rezrah)! - Fixed border radius inconsistency in the `River` component where `picture` elements were only showing rounded corners at the top but not the bottom.

- [#973](https://github.com/primer/brand/pull/973) [`c2d5b34`](https://github.com/primer/brand/commit/c2d5b34fdd735b493813291e7e78c536fbd2976b) Thanks [@rezrah](https://github.com/rezrah)! - Fixed type definitions for `PricingOptions.Label`. Now inclusive of all props in `Label`.

- [#967](https://github.com/primer/brand/pull/967) [`b1ff17b`](https://github.com/primer/brand/commit/b1ff17be1c92d8506bce6c198a1397346dd1b1dd) Thanks [@danielguillan](https://github.com/danielguillan)! - Added spacing between the label and the arrow in the next and previous links in `Pagination`.

- [#965](https://github.com/primer/brand/pull/965) [`9fdf1bf`](https://github.com/primer/brand/commit/9fdf1bf382645c761336323cf43fa153d7392b3f) Thanks [@rezrah](https://github.com/rezrah)! - Added a `hasBorder` prop to `Testimonial` component. Use `hasBorder={false}` to remove the default border applied by certain `variant` options.

  ```jsx
  <Testimonial variant="default" hasBorder={false} />
  ```

- [#967](https://github.com/primer/brand/pull/967) [`b1ff17b`](https://github.com/primer/brand/commit/b1ff17be1c92d8506bce6c198a1397346dd1b1dd) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a new `isExternal` prop to `Link` to display an external link icon.

  E.g.,

  ```jsx
  <Link href="https://github.com" isExternal>
    My external link
  </Link>
  ```

- [#971](https://github.com/primer/brand/pull/971) [`9de3349`](https://github.com/primer/brand/commit/9de33493a42b668bcf887dbcf0ff93de8fa6dff8) Thanks [@rezrah](https://github.com/rezrah)! - `River` headings and body text now have a maximum width of `400px` on default 50:50 layouts.

- [#971](https://github.com/primer/brand/pull/971) [`9de3349`](https://github.com/primer/brand/commit/9de33493a42b668bcf887dbcf0ff93de8fa6dff8) Thanks [@rezrah](https://github.com/rezrah)! - Fixed border radius inconsistency in the `Card` component where `picture` elements were only showing rounded corners at the top but not the bottom.

- [#960](https://github.com/primer/brand/pull/960) [`1203906`](https://github.com/primer/brand/commit/12039063f3b80d7dc0bee7f0b501ab1a0e3d613a) Thanks [@rezrah](https://github.com/rezrah)! - Updating various project dependencies.

  No planned changes to Primer Brand component APIs, although minor visual changes to certain icons could be visible due to an internal update of the Primer Octicons dependency.

## 0.50.0

### Minor Changes

- [#955](https://github.com/primer/brand/pull/955) [`2daaff8`](https://github.com/primer/brand/commit/2daaff87503192af74cb54bf37f3eb696c699a23) Thanks [@rezrah](https://github.com/rezrah)! - `Button` arrows are now hidden by default for all variants except `subtle` as part of a Core Brand refresh.

  To optionally re-enable arrows, use the `hasArrow` prop.

  ```jsx
  <Button variant="primary" hasArrow>
    Learn more
  </Button>
  ```

### Patch Changes

- [#958](https://github.com/primer/brand/pull/958) [`3b391a5`](https://github.com/primer/brand/commit/3b391a5d2577f5bdd108b78f04bc8ef444118c44) Thanks [@rezrah](https://github.com/rezrah)! - Updates to `PricingOptions` component:

  - New center-aligned layout available via `align` prop.
  - Added support for 4 pricing options. Previous maximum of 3.
  - Removed heading level constraint to `as` prop in `PricingOptions.Heading`. Now accepts all heading levels, while retaining the previous `h3` default.
  - Added `accordionAs`prop to `PricingOptions.FeatureList` for granular control over heading size.
  - All pricing items under `1011px` now have a max width and centered positioning
  - Fixed layout alignment bug when trailing text is not present under price.
  - Fixed layout bug when footnote contains an inline link.

- [#955](https://github.com/primer/brand/pull/955) [`2daaff8`](https://github.com/primer/brand/commit/2daaff87503192af74cb54bf37f3eb696c699a23) Thanks [@rezrah](https://github.com/rezrah)! - Visual update to `subtle` button variants. Borders on hover interactions have been replaced with a solid background color.

- [#955](https://github.com/primer/brand/pull/955) [`2daaff8`](https://github.com/primer/brand/commit/2daaff87503192af74cb54bf37f3eb696c699a23) Thanks [@rezrah](https://github.com/rezrah)! - Added new `accent` button variant.

  ```jsx
  <Button variant="accent">Register now</Button>
  ```

  🔗 [See documentation for design guidelines and usage examples](https://primer.style/brand/components/Button)

- [#955](https://github.com/primer/brand/pull/955) [`2daaff8`](https://github.com/primer/brand/commit/2daaff87503192af74cb54bf37f3eb696c699a23) Thanks [@rezrah](https://github.com/rezrah)! - Increased content spacing on wide breakpoints in `CTABanner` from `16px` to `32px`

- [#957](https://github.com/primer/brand/pull/957) [`fbe8f17`](https://github.com/primer/brand/commit/fbe8f17b8c01d347a2af75f58e1a7d36e1e1a80d) Thanks [@rezrah](https://github.com/rezrah)! - Added an `align` prop to the `Card` component with `start` (default) or `center` alignment options. Refer to our documentation for examples on when the latter should be used.

  No breaking changes are introduced as part of this change

## 0.49.0

### Minor Changes

- [#947](https://github.com/primer/brand/pull/947) [`646cccf`](https://github.com/primer/brand/commit/646cccfc502973f52bc662dbc11a29d059a46bda) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Improved `VideoPlayer` appearance on narrow viewports.
  - This necessitated the removal of the `showControlsWhenPaused` prop to prevent the height of the `VideoPlayer` from changing when the video is played/paused.

## 0.48.0

### Minor Changes

- [#945](https://github.com/primer/brand/pull/945) [`13b84de`](https://github.com/primer/brand/commit/13b84deefa7c3cdf309275a82723d260d2b979aa) Thanks [@rezrah](https://github.com/rezrah)! - Removed global CSS overrides for `reduced-motion` user preferences with local, component equivalents.

  > [!WARNING]
  > Users who relied on this functionality should now implement their own override mechanisms at the component or page level.

- [#926](https://github.com/primer/brand/pull/926) [`b11c431`](https://github.com/primer/brand/commit/b11c431d762ada206179eb81257b85d86a9e7f58) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Updated the `Pagination` component to ensure consistent behaviour across all viewports by displaying a condensed pagination on narrow viewports.

  - ⚠️ Deprecated responsive object support in the `showPages` prop. The `showPages` prop now only accepts a boolean value which will hide/show the page numbers across all viewports.

    ```diff
      <Pagination
    -   showPages={{narrow: true, regular: true, wide: true}}
    +   showPages
      />

      // Or

      <Pagination
    -   showPages={{narrow: false, regular: false, wide: false}}
    +   showPages={false}
      />
    ```

### Patch Changes

- [#931](https://github.com/primer/brand/pull/931) [`c309912`](https://github.com/primer/brand/commit/c3099124855ee87963e42781edfb7893e94c6eac) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug in Safari where an `Icon` component with `hasBackground={true}` would cut off the corners of the rendered SVG. To resolve this the `Icon` component now wraps the rendered SVG in a div.

- [#927](https://github.com/primer/brand/pull/927) [`91c10c5`](https://github.com/primer/brand/commit/91c10c59bef556d99b0710d02c5f133fe10eb32c) Thanks [@rezrah](https://github.com/rezrah)! - Improved typings to various components. This update should not affect the end-user API's.

- [#945](https://github.com/primer/brand/pull/945) [`13b84de`](https://github.com/primer/brand/commit/13b84deefa7c3cdf309275a82723d260d2b979aa) Thanks [@rezrah](https://github.com/rezrah)! - Fixed hover states for inline links in the `Prose` component. Links now behave identically to `InlineLink` component.

- [#946](https://github.com/primer/brand/pull/946) [`010578b`](https://github.com/primer/brand/commit/010578b49daf0b071bf6cd145c0fc91acb8bf14b) Thanks [@danielguillan](https://github.com/danielguillan)! - Added a new `small` size option for `Label`

  🔗 [See documentation for usage examples](https://primer.style/brand/components/Label/react#sizes)

- [#943](https://github.com/primer/brand/pull/943) [`16b0cc7`](https://github.com/primer/brand/commit/16b0cc796489bc7ea90411a86f8e2f0ac710854e) Thanks [@danielguillan](https://github.com/danielguillan)! - Sets the maximum widths for the heading and description of the `Card` component.

- [#940](https://github.com/primer/brand/pull/940) [`cca78a1`](https://github.com/primer/brand/commit/cca78a17b1266b1b0276c84c18983832d6c7fc94) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Updated the `Accordion` component to support additional state handling methods. All changes are backwards compatible. Refer to Storybook for examples of these additional `Accordion` features.

- [#942](https://github.com/primer/brand/pull/942) [`5f31936`](https://github.com/primer/brand/commit/5f319362d85ea79fabf6b5239848cc30503b1ccd) Thanks [@danielguillan](https://github.com/danielguillan)! - Update the default `primary` and `secondary` accent color tokens from `pink` and `purple` to `green` and `yellow`, respectively.

## 0.47.2

### Patch Changes

- [#934](https://github.com/primer/brand/pull/934) [`645fa5d`](https://github.com/primer/brand/commit/645fa5d89f7ab46e05e2c2da718979204573875c) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug where Card components would need to be tapped twice in iOS Safari to trigger navigation

- [#889](https://github.com/primer/brand/pull/889) [`34e444e`](https://github.com/primer/brand/commit/34e444ee2734f5cddb5428ae230c758079237b41) Thanks [@danielguillan](https://github.com/danielguillan)! - Added new `green-blue-purple` `color` option to `Label` component

## 0.47.1

### Patch Changes

- [#901](https://github.com/primer/brand/pull/901) [`d9a95b2`](https://github.com/primer/brand/commit/d9a95b233c0a48d8b925e5d720b135f9506dd061) Thanks [@rezrah](https://github.com/rezrah)! - Updated the following library depedencies: `@oddbird/popover-polyfill`, `autoprefixer`, `css-loader`, `mini-css-extract-plugin`, `postcss`, `postcss-loader`, `postcss-preset-env`, `style-loader`, `typed-css-modules`, `typescript-plugin-css-modules`, `webpack-cli`, `fast-glob`.

  These updates should not affect the library’s visuals or component APIs. **In most cases, no additional action is required**. Please note however, that the compiled output may be slightly different due to changes in the bundling process.

- [#912](https://github.com/primer/brand/pull/912) [`5966728`](https://github.com/primer/brand/commit/596672818f7bc95e0b1be128f7ade25f4840ff8a) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug in the `ActionMenu` component where items with falsy values (eg `""`) would not trigger the `onSelect` callback when selected.

- [#909](https://github.com/primer/brand/pull/909) [`c5f2d40`](https://github.com/primer/brand/commit/c5f2d40ff3a7ed2087bb4545bb808017217990ca) Thanks [@danielguillan](https://github.com/danielguillan)! - Increased the gap between primary and secondary buttons in `Hero`, `CTABanner` and `ButtonGroup` components from `8px` to `16px`.

- [#918](https://github.com/primer/brand/pull/918) [`65f7a92`](https://github.com/primer/brand/commit/65f7a92c374bbb98102ab6257dd4678e49f4cbcd) Thanks [@rezrah](https://github.com/rezrah)! - Fix `RiverStoryScroll` scrolling bug when `disabled={true}`. Now renders `children` 1:1.

## 0.47.0

### Minor Changes

- [#896](https://github.com/primer/brand/pull/896) [`ce6c8b6`](https://github.com/primer/brand/commit/ce6c8b64667a3b699a00d8bc21734434fce02028) Thanks [@rezrah](https://github.com/rezrah)! - Updated minimum, compatible version of `react` and `react-dom` to `v18`

### Patch Changes

- [#896](https://github.com/primer/brand/pull/896) [`ce6c8b6`](https://github.com/primer/brand/commit/ce6c8b64667a3b699a00d8bc21734434fce02028) Thanks [@rezrah](https://github.com/rezrah)! - Updated `leadingVisual` prop in `Label` to accept `Icon` children from the `@primer/octicons-react` package.

- [#896](https://github.com/primer/brand/pull/896) [`ce6c8b6`](https://github.com/primer/brand/commit/ce6c8b64667a3b699a00d8bc21734434fce02028) Thanks [@rezrah](https://github.com/rezrah)! - Replaced usage of `@reach/auto-id` with native `useId` in `react@v18`

- [#896](https://github.com/primer/brand/pull/896) [`ce6c8b6`](https://github.com/primer/brand/commit/ce6c8b64667a3b699a00d8bc21734434fce02028) Thanks [@rezrah](https://github.com/rezrah)! - Add `peerDependenciesMeta` configuration, preventing unnecessary peer dependency warnings

- [#899](https://github.com/primer/brand/pull/899) [`bc24d7a`](https://github.com/primer/brand/commit/bc24d7a7beafaf54aaf79619c6e13c48b7940f68) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added a scroll margin to `Footnote.Item` to prevent it from being hidden behind fixed navigation during automatic scrolling.

- [#897](https://github.com/primer/brand/pull/897) [`1c47b76`](https://github.com/primer/brand/commit/1c47b76f982df42d8ada0dde6ab683c6b5fd983d) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `IDE` component accessibility improvements

  - Added 1px border to identify active tab and start/end of Copilot suggestion. The colours of these borders can be customised via the `--brand-IDE-default-editor-tab-borderColor` and `--brand-IDE-autoSuggest-borderColor` CSS variables.
  - Added horizontal scrolling to `IDE` component when viewed on small viewports

## 0.46.0

### Minor Changes

- [#884](https://github.com/primer/brand/pull/884) [`bbdf7f2f`](https://github.com/primer/brand/commit/bbdf7f2fe99038bf8544c76af2dbd863d364d124) Thanks [@rezrah](https://github.com/rezrah)! - Anti-aliasing is now applied automatically to all `Text` instances _except_ under these conditions:

  - When explicitly disabled via `hasAntiAliasing={false}`
  - When font weight is `light` or `extralight` AND size is `'100'` or `'200'`
  - When size is `100` (regardless of weight)

- [#893](https://github.com/primer/brand/pull/893) [`d3c1ee2a`](https://github.com/primer/brand/commit/d3c1ee2a5fb3d35b9d34d4d11a920cbd8ae7183e) Thanks [@rezrah](https://github.com/rezrah)! - Updated secondary `Button` variant borders from `subtle` to `default` color for improved contrast.

- [#890](https://github.com/primer/brand/pull/890) [`4692aeea`](https://github.com/primer/brand/commit/4692aeeac23b95ff3a2e15536364ac7c1c7cc520) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Enabled keyboard navigation in the `IDE` component and made the contents navigable by screen readers.

  ⚠️ Breaking changes

  The `alternativeText` prop on the `IDE` component has been removed in favour of more granular descriptive text.

  <table width="100%">
  <tr>
  <th> Before</th>
  </tr>
  <tr>
  <td valign="top">

  ```tsx
  <IDE alternativeText="A user asks how to concatenate arrays in JavaScript, Copilot demonstrates using the concat method, and the user confirms it worked.">
    <IDE.Chat />
  </IDE>
  ```

   </td>
  </tr>
  <tr>
  <th> After</th>
  </tr>
  <tr>
  <td valign="top">

  ```tsx
  <IDE>
    <IDE.Chat alternativeText="A user asks how to concatenate arrays in JavaScript, Copilot demonstrates using the concat method, and the user confirms it worked." />
  </IDE>
  ```

  </td>
  </tr>
  </table>

  <table width="100%">
  <tr>
  <th> Before</th>
  </tr>
  <tr>
  <td valign="top">

  ```tsx
  <IDE alternativeText="TypeScript sentiment analysis function with D3.js visualization.">
    <IDE.Editor
      files={[
        {
          name: 'index.js',
        },
      ]}
    />
  </IDE>
  ```

   </td>
  </tr>
  <tr>
  <th> After</th>
  </tr>
  <tr>
  <td valign="top">

  ```tsx
  <IDE>
    <IDE.Editor
      files={[
        {
          name: 'index.js',
          alternativeText: 'TypeScript sentiment analysis function with D3.js visualization.',
          // ...
        },
      ]}
    />
  </IDE>
  ```

  </td>
  </tr>
  </table>

  🔗 [See the documentation for example usage, and more information on accessibility in the `IDE` component](https://primer.style/brand/components/IDE#accessibility)

### Patch Changes

- [#887](https://github.com/primer/brand/pull/887) [`8a49db27`](https://github.com/primer/brand/commit/8a49db27ff2b6de1e5f8516e6f1a84fbff1eaf25) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `Link` component improvements.

  - Fixed a bug in the `Link` component where the underline wouldn't take the full width when `arrowDirection='none'`.
  - Prop options are also now exported from the package root, specifically:
    - `LinkSizes`
    - `LinkArrowDirections`

- [#879](https://github.com/primer/brand/pull/879) [`4f92311f`](https://github.com/primer/brand/commit/4f92311fbae6f6738b12113d0125608bc3d2faa8) Thanks [@rezrah](https://github.com/rezrah)! - Added `toggleColor` prop to `FAQ.Question` and `Accordion.Heading`

  ```jsx
  <FAQ>
    <FAQ.Item>
      <FAQ.Question toggleColor="green-blue">...</FAQ.Question>
      <FAQ.Answer>...</FAQ.Answer>
    </FAQ.Item>
  </FAQ>
  ```

  ```jsx
  <Accordion>
    <Accordion.Heading toggleColor="green-blue">...</Accordion.Heading>
    <Accordion.Content>...</Accordion.Content>
  </Accordion>
  ```

  🔗 [See the documentation for examples and color options](https://primer.style/brand/components/FAQ/react#toggle-color-customization)

- [#894](https://github.com/primer/brand/pull/894) [`aecc8d8f`](https://github.com/primer/brand/commit/aecc8d8f18243185545f3c4a45651fb3da71fb35) Thanks [@rezrah](https://github.com/rezrah)! - Improvements to duotone text in `River` component. Now supports `<b>` elements using a semi-bold font weight.

  🔗 [See documentation for usage examples](https://primer.style/brand/components/River/react#duotone)

- [#892](https://github.com/primer/brand/pull/892) [`e85c7316`](https://github.com/primer/brand/commit/e85c731674bf9e50cd7392c5e9ba1c72a9257e55) Thanks [@rezrah](https://github.com/rezrah)! - Upgraded dev dependencies for `@types/node` and `eslint-plugin-github`

- [#883](https://github.com/primer/brand/pull/883) [`965a7865`](https://github.com/primer/brand/commit/965a7865f8f2aa4fd5c6a150ae58bf72c0a457c9) Thanks [@rezrah](https://github.com/rezrah)! - Visual spacing updates to `RiverBreakout`

  - Reduced vertical gap between the main text and link.
  - Applied a maximum width to the main text.

- [#872](https://github.com/primer/brand/pull/872) [`872bdcf0`](https://github.com/primer/brand/commit/872bdcf0f832a82ce75e6cd70bdfa07014a49121) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `VideoPlayer` tooltips now show when the associated control receives focus.

## 0.45.1

### Patch Changes

- [#880](https://github.com/primer/brand/pull/880) [`bfe40610`](https://github.com/primer/brand/commit/bfe4061068a8149fe8b6b7ec498fe61328729d05) Thanks [@rezrah](https://github.com/rezrah)! - Increased border radius of `Card` from `large` (`16px`) to `xlarge` (`24px`)

- [#878](https://github.com/primer/brand/pull/878) [`d9183796`](https://github.com/primer/brand/commit/d918379698bacaeb856067107d9ac59615f146a2) Thanks [@rezrah](https://github.com/rezrah)! - Added `leadingComponent` slot to `SectionIntro` for inserting arbitrary visuals and JSX above the heading.

  ```jsx
  <SectionIntro leadingComponent={() => <img src="leading-visual.png" alt="description of your leading visual" />}>
    <SectionIntro.Heading>...</SectionIntro.Heading>
    <SectionIntro.Description>...</SectionIntro.Description>
    <SectionIntro.Link>...</SectionIntro.Link>
  </SectionIntro>
  ```

  🔗 [See Storybook example](https://primer.style/brand/storybook?path=/story/components-sectionintro-features--leading-component)

- [#880](https://github.com/primer/brand/pull/880) [`bfe40610`](https://github.com/primer/brand/commit/bfe4061068a8149fe8b6b7ec498fe61328729d05) Thanks [@rezrah](https://github.com/rezrah)! - Added `hasBorder` prop to `Pillar` for alternative presentation

  🔗 [See Storybook for an example](https://primer.style/brand/storybook/?path=/story/components-pillar-features--with-border)

- [#703](https://github.com/primer/brand/pull/703) [`621d8ee2`](https://github.com/primer/brand/commit/621d8ee25e15a4a67281be5e4ec6116fa89a6fa0) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `VideoPlayer` accessibility improvements

  - Improved contrast of play overlay focus styles.
  - Improved contrast of controls and title.
  - The title bar now hides while the video is playing.
  - The controls bar now hides when the cursor or keyboard focus leaves the video player, or after a few seconds of inactivity, and reappears when the cursor or keyboard focus returns.

- [#862](https://github.com/primer/brand/pull/862) [`eba0c530`](https://github.com/primer/brand/commit/eba0c53043133239006807a2694b05e9852da169) Thanks [@danielguillan](https://github.com/danielguillan)! - Added image support to `Pillar` component

  Usage example:

  ```jsx
  <Pillar>
    <Pillar.Image src="/path/to/your/image.jpg" alt="Required alternative text" />
    <Pillar.Heading>Code search & code view</Pillar.Heading>
    <Pillar.Description>
      Enables you to rapidly search, navigate, and understand code, right from GitHub.com.
    </Pillar.Description>
  </Pillar>
  ```

  🔗 [See Storybook for an example](https://primer.style/brand/storybook/?path=/story/components-pillar-features--with-image)

## 0.45.0

### Minor Changes

- [#860](https://github.com/primer/brand/pull/860) [`2502f658`](https://github.com/primer/brand/commit/2502f6581686a23c0ce642e864a89c131ae31ae6) Thanks [@rezrah](https://github.com/rezrah)! - Decreased the default heading size in `River` component. Use `size="4"` to restore the previous text size, if needed.

- [#863](https://github.com/primer/brand/pull/863) [`00ef0694`](https://github.com/primer/brand/commit/00ef06945e2f856335d7b6d613c69e376f28ee0c) Thanks [@rezrah](https://github.com/rezrah)! - Added a new `FrostedGlassVFX` component for applying a frosted glass-effect texture to nested components.

  ⚠️ This is an experimental component, and not tested for compatibility with other Primer Brand components.

  When using this component, ensure there is sufficient contrast between the foreground text and the background imagery, as the frosted glass effect can significantly reduce legibility.

  Usage example:

  ```jsx
  <FrostedGlassVFX>
    <Testimonial variant="default">
      <Testimonial.Quote>
        GitHub helps us ensure that we have our security controls baked into our pipelines all the way from the first
        line of code we&apos;re writing.
      </Testimonial.Quote>
      <Testimonial.Name />
      <Testimonial.Avatar />
    </Testimonial>
  </FrostedGlassVFX>
  ```

  🔗 (See Storybook for an example)[https://primer.style/brand/storybook/?path=/story/components-testimonial-examples--with-frosted-glass]

### Patch Changes

- [#859](https://github.com/primer/brand/pull/859) [`cd18615f`](https://github.com/primer/brand/commit/cd18615f0ea9d4d904166a5a5ba426d650304ce1) Thanks [@rezrah](https://github.com/rezrah)! - `AnchorNav` component updates:

  - `AnchorNav.Action` and `AnchorNav.SecondaryAction` now appear visually smaller by default. Use `size="medium"` if the previous, larger buttons are needed.
  - `AnchorNav.Action` and `AnchorNav.SecondaryAction` each support a `variant` prop, allowing primary `Button` visuals to be optionally applied.

- [#866](https://github.com/primer/brand/pull/866) [`8223135d`](https://github.com/primer/brand/commit/8223135d47ec05832f702c6d9e5bfbe92fef5d21) Thanks [@rezrah](https://github.com/rezrah)! - Fixed delayed appearance of heading separator in `SubNav`.

- [#865](https://github.com/primer/brand/pull/865) [`0401cc5c`](https://github.com/primer/brand/commit/0401cc5c9e0390392b74722cbb97f67ef055e8f9) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Style improvements to the `SubNav` component.

  - Fixed a bug in `SubNav.Link` elements with `aria-current`, which caused inconsistent appearance across viewports.

- [#863](https://github.com/primer/brand/pull/863) [`00ef0694`](https://github.com/primer/brand/commit/00ef06945e2f856335d7b6d613c69e376f28ee0c) Thanks [@rezrah](https://github.com/rezrah)! - Added new `Testimonial` variants.

  Use `variant="default"` or `variant="subtle"` for an alternative visual appearance. The current design will be referred to as `minimal` going forward.

  🔗 [See the documentation for usage examples](https://primer.style/brand/components/Testimonial/react#variants)

- [#867](https://github.com/primer/brand/pull/867) [`4bac3868`](https://github.com/primer/brand/commit/4bac386849bcf7fca5cb2c21661af4a312224471) Thanks [@rezrah](https://github.com/rezrah)! - `Hero.Description` updated to support `variant="muted"`

- [#868](https://github.com/primer/brand/pull/868) [`c0aa598d`](https://github.com/primer/brand/commit/c0aa598d4a403f61662d3eb1b5bc718f5fe3a232) Thanks [@rezrah](https://github.com/rezrah)! - `SubNav.Link` now supports `variant="default"` to help increase contrast and legibility on non-standard backgrounds.

## 0.44.1

### Patch Changes

- [#854](https://github.com/primer/brand/pull/854) [`fa277afd`](https://github.com/primer/brand/commit/fa277afdbfa002849d4040ee7d661662cd7c1ca8) Thanks [@rezrah](https://github.com/rezrah)! - `SubNav` accessibility improvements:

  - Removed focus-trapping in the menu overlay on narrow viewports
  - Added hover state to the `SubNav.Heading`
  - Added `aria-current` visual indicator parity on narrow viewports

## 0.44.0

### Minor Changes

- [#831](https://github.com/primer/brand/pull/831) [`8c3448d0`](https://github.com/primer/brand/commit/8c3448d0c1d2a0cfd1a2268e3f0cf835f924d540) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Reduced the text size in `FormControl.Hint` and `FormControl.Validation` components to match their counterparts in `CheckboxGroup` and `RadioGroup` for improved consistency and visual design accuracy.

- [#844](https://github.com/primer/brand/pull/844) [`00275979`](https://github.com/primer/brand/commit/00275979c386bd3d5761a4dab2d8d6bb92f03279) Thanks [@joshfarrant](https://github.com/joshfarrant)! - New `Icon` component is generally available.

  Example:
  <Icon icon={ZapIcon} />

  🔗 [Read the documentation for more usage examples](https://primer.style/brand/components/Icon)

- [#830](https://github.com/primer/brand/pull/830) [`1f9eb72b`](https://github.com/primer/brand/commit/1f9eb72b23148cc7e5180dc691c11e507ef660fa) Thanks [@joshfarrant](https://github.com/joshfarrant)! - New `CheckboxGroup` and `RadioGroup` components to group `Checkbox` and `Radio` components are now available.

  `CheckboxGroup`

  ```jsx
  <CheckboxGroup>
    <CheckboxGroup.Label>Choose your favorite features</CheckboxGroup.Label>
    <FormControl>
      <FormControl.Label>Actions notifications</FormControl.Label>
      <Checkbox value="actions" />
    </FormControl>
    <FormControl>
      <FormControl.Label>Packages</FormControl.Label>
      <Checkbox value="packages" />
    </FormControl>
    <FormControl>
      <FormControl.Label>Codespaces</FormControl.Label>
      <Checkbox value="codespaces" />
    </FormControl>
  </CheckboxGroup>
  ```

  🔗 [Read the documentation for more `CheckboxGroup` examples](https://primer.style/brand/components/RadioGroup/react)

  `RadioGroup`:

  ```jsx
  <RadioGroup>
    <RadioGroup.Label>Choose your primary workspace</RadioGroup.Label>
    <FormControl>
      <FormControl.Label>Codespaces</FormControl.Label>
      <Radio name="workspace" value="codespaces" />
    </FormControl>
    <FormControl>
      <FormControl.Label>Local environment</FormControl.Label>
      <Radio name="workspace" value="local" />
    </FormControl>
    <FormControl>
      <FormControl.Label>Pen and paper</FormControl.Label>
      <Radio name="workspace" value="remote" />
    </FormControl>
  </RadioGroup>
  ```

  🔗 [Read the documentation for more `RadioGroup` examples](https://primer.style/brand/components/RadioGroup/react)

- [#824](https://github.com/primer/brand/pull/824) [`6e398ba7`](https://github.com/primer/brand/commit/6e398ba7272d53e4fc8e00f4b4fd46b29a4bc666) Thanks [@rezrah](https://github.com/rezrah)! - Updates to `SubNav` component

  - New anchor-based navigation pattern available:

    Use `variant="anchor"` on `SubNav.SubMenu` to apply anchor navigation as an alternative to the default dropdown-based submenu.

    ```jsx
    <SubNav>
      <SubNav.Heading href="#">Heading</SubNav.Heading>
      <SubNav.Link href="#" aria-current="page">
        Link with anchor navigation
        <SubNav.SubMenu variant="anchor">
          <SubNav.Link href="#">Anchor link one</SubNav.Link>
          <SubNav.Link href="#">Anchor link two</SubNav.Link>
          <SubNav.Link href="#">Anchor link three</SubNav.Link>
          <SubNav.Link href="#">Anchor link four</SubNav.Link>
        </SubNav.SubMenu>
      </SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
      <SubNav.Link href="#">Link</SubNav.Link>
    </SubNav>
    ```

  - Overlay now closes when user clicks outside of it

  - Dropdown submenus now appear with white and black background and foreground colors respectively, irrespective of color mode.

  - Various other visual updates to improve brand-alignment. These include adjustments to text size, weight, color and iconography.

### Patch Changes

- [#842](https://github.com/primer/brand/pull/842) [`26f79f62`](https://github.com/primer/brand/commit/26f79f629a503bfa0b26f61829cb9c692c6cce5e) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Allow `AnchorNav` links to wrap to the next line in the expanded list on narrow viewports.

- [#843](https://github.com/primer/brand/pull/843) [`7473042c`](https://github.com/primer/brand/commit/7473042c4ea4130f2d3fe9e4de88dd28899ce727) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added a small (200ms) delay to the closing of the `Tooltip` to make it easier for users to move their cursor to the contents of the `Tooltip`.

- [#847](https://github.com/primer/brand/pull/847) [`c3ca91c8`](https://github.com/primer/brand/commit/c3ca91c898cc222525f28accea0c34243affc72f) Thanks [@stamat](https://github.com/stamat)! - Improved accessibility of `Button` and `Link` components on Windows-based high contrast themes. Outlines are now visible only when focused, and border underlines will appear correctly.

- [#841](https://github.com/primer/brand/pull/841) [`78e82c16`](https://github.com/primer/brand/commit/78e82c160eaeb74cc76f5af6b3cbd1f29c4b4449) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Improved accessibility in `AnchorNav` through clearer navigation menu labelling for screen reader users on narrow viewports.

- [#833](https://github.com/primer/brand/pull/833) [`0f8bfa65`](https://github.com/primer/brand/commit/0f8bfa65876be7febfb37e3b9141f16731445aea) Thanks [@rezrah](https://github.com/rezrah)! - `selected` breadcrumb items now use non-interactive elements for improved keyboard navigation and correct semantics.

- [#838](https://github.com/primer/brand/pull/838) [`bf785d6b`](https://github.com/primer/brand/commit/bf785d6ba409e6e87a57c3c9ce337c4db9f8630c) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Updated the accessible label of the SubNav's open/close toggle button to include the name of the current page.

- [#828](https://github.com/primer/brand/pull/828) [`652e7ff0`](https://github.com/primer/brand/commit/652e7ff0e4ae20728b9f23ce2c83932b9b8afa41) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed bug where `TextInput`, `TextArea`, and `Select` components would expand to the width of a the validation message on the parent `FormControl`.

## 0.43.0

### Minor Changes

- [#825](https://github.com/primer/brand/pull/825) [`2c8e9240`](https://github.com/primer/brand/commit/2c8e9240a1bb36f7753a3e63318e92322a7bf780) Thanks [@rezrah](https://github.com/rezrah)! - Switched to use CSS Logical Properties in compiled output.

  - Compiled styles now directly use CSS logical properties (e.g., `margin-inline-start`, `margin-inline-end`) instead of physical properties (`margin-left`, `margin-right`).
  - This change simplifies the stylesheet and reduces its overall size (`652kB` > `593kB`)

  Example of the change:

  Source:

  ```css
  .selector {
    margin-inline-start: var(--base-size-20);
  }
  ```

  <table>
  <tr>
  <th> Previous compiled output
  </th> <th> New compiled output </th>
  </tr>
  <tr>
  <td valign="top">

  ```css
  [dir='ltr'] .selector {
    margin-left: 2px;
  }

  [dir='rtl'] .selector {
    margin-right: 2px;
  }
  ```

   </td>
  <td valign="top">

  ```css
  .selector {
    margin-inline-start: 2px;
  }
  ```

  </td>
  </tr>
  </table>

### Patch Changes

- [#825](https://github.com/primer/brand/pull/825) [`2c8e9240`](https://github.com/primer/brand/commit/2c8e9240a1bb36f7753a3e63318e92322a7bf780) Thanks [@rezrah](https://github.com/rezrah)! - Fixed errors in compiled CSS stylesheets where selectors with special characters were being unintentionally escaped for compatibility with legacy browsers.

- [#818](https://github.com/primer/brand/pull/818) [`281beb08`](https://github.com/primer/brand/commit/281beb08114f24f0ec5b23b14643324b0be532e6) Thanks [@joshfarrant](https://github.com/joshfarrant)! - `FormControl.Validation` is now associated with the relevant input using `aria-describedby`.

- [#822](https://github.com/primer/brand/pull/822) [`75da350d`](https://github.com/primer/brand/commit/75da350d63b75bd8b4e2c163e681ca4f7f1d4a46) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Updated `IDEChatMessage` type declaration to differentiate between assistant and user messages.

## 0.42.1

### Patch Changes

- [#812](https://github.com/primer/brand/pull/812) [`8ce76569`](https://github.com/primer/brand/commit/8ce7656991eadee1225173b3d7cd130716789cc8) Thanks [@danielguillan](https://github.com/danielguillan)! - Ensure accessible content order in `PricingOptions` markup

- [#815](https://github.com/primer/brand/pull/815) [`7345cc9d`](https://github.com/primer/brand/commit/7345cc9d4a6c20f963d99d837df88ac404bda496) Thanks [@rezrah](https://github.com/rezrah)! - Fixed corner background overflow bug in `Card` component on Safari browsers

## 0.42.0

### Minor Changes

- [#811](https://github.com/primer/brand/pull/811) [`6331ae61`](https://github.com/primer/brand/commit/6331ae61b7c4b9bbc0910bab146c1023dd852511) Thanks [@rezrah](https://github.com/rezrah)! - `River` and `SectionIntro` link colors now default to blue (accent) for consistency with `Card`, `Pillar` and similar components that feature blue links.

  :warning: This is a visual breaking change. Please manually review all usages of `River` and `SectionIntro` to ensure there is sufficient contrast with the background color.

### Patch Changes

- [#805](https://github.com/primer/brand/pull/805) [`2928995b`](https://github.com/primer/brand/commit/2928995bffb5994104491a4ee5d1d6d831737161) Thanks [@rezrah](https://github.com/rezrah)! - Disabled all transitions and auto-staggering when `reduced-motion` user preference is enabled

- [#809](https://github.com/primer/brand/pull/809) [`bbb14ce9`](https://github.com/primer/brand/commit/bbb14ce9ed2e7c8e9138e249732d7b4b9de85bc9) Thanks [@rezrah](https://github.com/rezrah)! - Updated `Link` underline to fill entire width

- [#798](https://github.com/primer/brand/pull/798) [`af335d37`](https://github.com/primer/brand/commit/af335d376b25edfda0feddd7afd45dacf549eeac) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - Fixed a bug where the `Bento` `leadingVisual` prop wouldn't honour the provided `size`.

  - Updated the `Card.Icon` internal implementation to use the new `Icon` component.

- [#810](https://github.com/primer/brand/pull/810) [`774b91b0`](https://github.com/primer/brand/commit/774b91b0ed16079d388bbd7cf6edc0d3dbed38e1) Thanks [@rezrah](https://github.com/rezrah)! - Added new background customization options to `CTABanner`

  New props:

  - `backgroundColor`
  - `backgroundImageSrc`
  - `backgroundImageSize`
  - `backgroundImagePosition`

  Also added `variant` prop to `CTABanner.Description`, to achieve higher contrast when using background images.

  :link: [See the documentation for more details and usage examples](https://primer.style/brand/components/CTABanner/react/).

- [#805](https://github.com/primer/brand/pull/805) [`2928995b`](https://github.com/primer/brand/commit/2928995bffb5994104491a4ee5d1d6d831737161) Thanks [@rezrah](https://github.com/rezrah)! - Removed negative margin from `RiverStoryScroll` when `reduced-motion` user preference is enabled

## 0.41.0

### Minor Changes

- [#779](https://github.com/primer/brand/pull/779) [`b5c291e2`](https://github.com/primer/brand/commit/b5c291e290313d1c03ae79ef39fb02cb12b05cbe) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Accessibility improvements to the `FormControl.Hint` component.

  - `FormControl.Hint` is now automatically associated with the form field using `aria-describedby`.
  - Improvements to the styling of `FormControl.Hint` when used alongside a `Checkbox`.

### Patch Changes

- [#791](https://github.com/primer/brand/pull/791) [`8105b6a3`](https://github.com/primer/brand/commit/8105b6a31ad61f90a07ca67417552795cf4237c0) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Increased spacing between `River` components on narrow viewports from `28px` to `36px`

- [#776](https://github.com/primer/brand/pull/776) [`06fd8476`](https://github.com/primer/brand/commit/06fd84763527bdb9f99a04b367ab4736fd396b6e) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Added `aria-describedby` attribute to leading/trailing text and visuals in `TextInput` component

- [#781](https://github.com/primer/brand/pull/781) [`ec6ffc36`](https://github.com/primer/brand/commit/ec6ffc363cfa4fcb4ad5fc3c38100cf5d0fbc099) Thanks [@joshfarrant](https://github.com/joshfarrant)! - - `Card` component no longer expands to full width when `fullWidth={false}`

  - `Card` component no longer renders duplicate borders in dark mode when `hasBorder={true}`

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

- [#728](https://github.com/primer/brand/pull/728) [`c6ee839e`](https://github.com/primer/brand/commit/c6ee839e094c7b122ff6804674997994ae7f4ee1) Thanks [@MelissaPastore](https://github.com/MelissaPastore)! - Fixed a bug with the `Checkbox` component where validation messages wouldn't be positioned correctly.

- [#768](https://github.com/primer/brand/pull/768) [`0270f06d`](https://github.com/primer/brand/commit/0270f06d4e5cc85aea5f671caa2c7e8ab08abe64) Thanks [@danielguillan](https://github.com/danielguillan)! - Improves spacing of `RiverBreakout` content

- [#797](https://github.com/primer/brand/pull/797) [`b3e34be5`](https://github.com/primer/brand/commit/b3e34be569a1cb639325ce10220be07c3a35ea84) Thanks [@rezrah](https://github.com/rezrah)! - Fixed visual bug in `RiverStoryScroll` layout on narrow viewports. Also adjusted positioning of the pagination to be closer to the scrolled items.

- [#760](https://github.com/primer/brand/pull/760) [`6be1118d`](https://github.com/primer/brand/commit/6be1118d4042e5efd78898583f546f46eac4921a) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug where passing a className to `Hero.Label` or `Hero.Eyebrow` would replace the default class.

- [#766](https://github.com/primer/brand/pull/766) [`d10dc535`](https://github.com/primer/brand/commit/d10dc535284effd85966bab7ba1c02452fd1ec8d) Thanks [@danielguillan](https://github.com/danielguillan)! - Adds internal paddings to River content on larger viewports

- [#767](https://github.com/primer/brand/pull/767) [`299ad371`](https://github.com/primer/brand/commit/299ad371ac4de9582fa27c65226bdd7c71f5689d) Thanks [@danielguillan](https://github.com/danielguillan)! - - Update the order of River children to ensure an accessible markup structure.

  - On narrow viewports, the content and visuals are now flipped, with the visuals always placed first to enhance visual hierarchy.

    > :warning: This may introduce a visual breaking change, whereby the visual is now displayed earlier in the page than originally intended. Please manually review content adjacent to the `River` components for correctness.

- [#785](https://github.com/primer/brand/pull/785) [`ec7d4023`](https://github.com/primer/brand/commit/ec7d4023ca526c42648322fbb62e2c04fec4ddc0) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed bug in `Card` component which caused the focus outline to not display when in dark-mode

## 0.40.1

### Patch Changes

- [#754](https://github.com/primer/brand/pull/754) [`d061705c`](https://github.com/primer/brand/commit/d061705c9242be17feb07fe860ac86887b22a079) Thanks [@joshfarrant](https://github.com/joshfarrant)! - The `RiverStoryScroll` component now enforces that its children must be `River` components through type checking, instead of relying on a run-time check.

- [#739](https://github.com/primer/brand/pull/739) [`24bd6338`](https://github.com/primer/brand/commit/24bd63385c95b308f7573e101b0594937f7b7830) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug in the `SubNav` component where the submenu toggle was rendered as an empty button on mobile viewports.

- [#736](https://github.com/primer/brand/pull/736) [`73cf706e`](https://github.com/primer/brand/commit/73cf706ec83c00c19fbdca4ab4349c7fa931e784) Thanks [@lukasoppermann](https://github.com/lukasoppermann)! - Replaced the `--brand-VideoPlayer-tooltip-padding` design token in the `VideoPlayer` component with two new tokens that separately account for padding along each axis: `--brand-VideoPlayer-tooltip-padding-inline` and `--brand-VideoPlayer-tooltip-padding-block`.

  _Note: This update does not introduce any visual changes. Please update any manual references to `--brand-VideoPlayer-tooltip-padding` to use the new tokens._

  ```diff
  - --brand-VideoPlayer-tooltip-padding
  + --brand-VideoPlayer-tooltip-padding-inline
  + --brand-VideoPlayer-tooltip-padding-block
  ```

- [#722](https://github.com/primer/brand/pull/722) [`99328ce0`](https://github.com/primer/brand/commit/99328ce0a7d48fc5f9c74a48ac687bb988bb9f40) Thanks [@danielguillan](https://github.com/danielguillan)! - Added support for `<b>` elements to `Bento`, `RiverBreakout`, `SectionIntro`, `Timeline`, and `Testimonial` components, as `<em>` is semantically interpreted by screen readers for emphasis, while `<b>` allows duo-tone text to function purely as a visual decoration.

  Usage example:

  ```jsx
  <SectionIntro>
    <SectionIntro.Heading>
      <b>Expressive headline</b> about an exclusive set of features.
    </SectionIntro.Heading>
  </SectionIntro>
  ```

  > **Important**
  > The updated components still support the use of `<em>` elements for backward compatibility, but moving forward, the only recommended element for emphasized text is `<b>`.

- [#733](https://github.com/primer/brand/pull/733) [`2dcb9bad`](https://github.com/primer/brand/commit/2dcb9badfe3f7bd16731836a6e74df580b652bfe) Thanks [@danielguillan](https://github.com/danielguillan)! - Fixes Label component multiline reflow

- [#746](https://github.com/primer/brand/pull/746) [`4af8db14`](https://github.com/primer/brand/commit/4af8db149e7d9e27b590599355f7437cf3fabf33) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Fixed a bug where `Card` components rendered within a dark colour mode would not take the full width of their container.

## 0.40.0

### Minor Changes

- [#690](https://github.com/primer/brand/pull/690) [`98fa3a2a`](https://github.com/primer/brand/commit/98fa3a2a943211343bac426dd9097d5772aa4d64) Thanks [@rezrah](https://github.com/rezrah)! - Improved React 19 compatibility by treating `react-dom/client` and `react/jsx-runtime` as external dependencies of the project. This change resolved a reported conflict with the latest React 19 release candidate.

## 0.39.0

### Minor Changes

- [#717](https://github.com/primer/brand/pull/717) [`24fc6d02`](https://github.com/primer/brand/commit/24fc6d0268ca1b12a9c77874fd980a67bdd11089) Thanks [@rezrah](https://github.com/rezrah)! - Improved a11y labelling in various components.

  Please note these changes could affect any behavioral tests, which rely on accessible matchers such as `getByRole`.

  - `SubdomainNavBar` search button `aria-label` changed from 'search' to 'Toggle search bar'
  - `SubdomainNavBar` removal of unnecessary `aria-label` 'global breadcrumb'
  - `Checkbox` addition of new label for `checked` state icon as 'Checkmark'
  - `Checkbox` addition of new label for `indeterminate` state icon as 'Dash icon'

- [#707](https://github.com/primer/brand/pull/707) [`715dfbb3`](https://github.com/primer/brand/commit/715dfbb3d00527cfc9050195f78c696638bbf7e6) Thanks [@rezrah](https://github.com/rezrah)! - New `Footnotes` component generally available

  ```js
  import {Footnotes} from '@primer/react-brand'
  ```

  ```jsx
  <Footnotes>
    <Footnotes.Item>There are now 100 million developers around the world using GitHub.</Footnotes.Item>
  </Footnotes>
  ```

  :link: [Read the documentation for usage guidelines and examples](https://primer.style/brand/components/Footnotes)

### Patch Changes

- [#711](https://github.com/primer/brand/pull/711) [`1cde8ef2`](https://github.com/primer/brand/commit/1cde8ef2c67794653da13863668c739116bae524) Thanks [@joshfarrant](https://github.com/joshfarrant)! - Updated `SubNav` links and submenus to use `ul` and `li` elements — instead of `div` elements — to communicate the hierarchy of the navigation to assistive technologies.

- [#700](https://github.com/primer/brand/pull/700) [`47908f1e`](https://github.com/primer/brand/commit/47908f1e324d9cb138d7221a25b0e41664e128ff) Thanks [@rezrah](https://github.com/rezrah)! - `ActionMenu` button no longer truncates longer labels. Now follows WCAG criterion around text reflow.

- [#714](https://github.com/primer/brand/pull/714) [`fb1980b1`](https://github.com/primer/brand/commit/fb1980b1c97254576ca03749d89526fbcbbbf336) Thanks [@rezrah](https://github.com/rezrah)! - Hide paged items in Pagination component on narrow viewports to prevent horizontal scrolling and offer improved accessibility by default.

  Use `showPages` to re-enable paged items if required:

  ```jsx
  <Pagination showPages />
  ```

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

- [#568](https://github.com/primer/brand/pull/568) [`40a129d`](https://github.com/primer/brand/commit/40a129d78024612b625238d8a826fc06aa933465) Thanks [@rezrah](https://github.com/rezrah)! - Added support for optional `Button` and submenu's in `SubNav` component.

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
