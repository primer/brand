# @primer/react-brand

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
