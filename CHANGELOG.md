# @primer/react-brand

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
