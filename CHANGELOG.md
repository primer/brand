# @primer/react-brand

## 0.2.1

### Patch Changes

- [#38](https://github.com/primer/react-brand/pull/38) [`b0c9293`](https://github.com/primer/react-brand/commit/b0c929389d62f184e5ae447c0b00e351cb2d1c6e) Thanks [@rezrah](https://github.com/rezrah)! - updated `css-loader` to generate valid (escaped) class names

## 0.2.0

### Minor Changes

- [#33](https://github.com/primer/react-brand/pull/33) [`662fcfc`](https://github.com/primer/react-brand/commit/662fcfc6d123460730317b7ddd3d3a4622d30dce) Thanks [@rezrah](https://github.com/rezrah)! - - Adds `River` component

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
  https://primer.style/react-brand/components/River

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

- [#19](https://github.com/primer/react-brand/pull/19) [`3b22e9e`](https://github.com/primer/react-brand/commit/3b22e9e0823401104d6e33b3c4f8664b755ea6ba) Thanks [@colebemis](https://github.com/colebemis)! - Add `size` prop to `Hero` component

### Patch Changes

- [#23](https://github.com/primer/react-brand/pull/23) [`77abf53`](https://github.com/primer/react-brand/commit/77abf535e77ef26fa29fb09d6d2dfb746f4bc383) Thanks [@rezrah](https://github.com/rezrah)! - add Text and Heading components

* [#29](https://github.com/primer/react-brand/pull/29) [`144c7d7`](https://github.com/primer/react-brand/commit/144c7d762a91cb691699e4f8923ab08385c77966) Thanks [@rezrah](https://github.com/rezrah)! - Removed `gh-variables.css` from package as Brand variables are now surfaced in main.css

  **To upgrade:**

  - _Remove_ `import "@primer/react-brand/lib/css/gh-variables.css"`

  - _Add_ `import "@primer/react-brand/lib/css/main.css"`

- [#23](https://github.com/primer/react-brand/pull/23) [`77abf53`](https://github.com/primer/react-brand/commit/77abf535e77ef26fa29fb09d6d2dfb746f4bc383) Thanks [@rezrah](https://github.com/rezrah)! - forward className in Hero

* [#25](https://github.com/primer/react-brand/pull/25) [`4b00b72`](https://github.com/primer/react-brand/commit/4b00b72f5dbf5e578351ea77e1e74cddc69833e7) Thanks [@rezrah](https://github.com/rezrah)! - adds baseline tokens

- [#21](https://github.com/primer/react-brand/pull/21) [`ab06cce`](https://github.com/primer/react-brand/commit/ab06cceb6ed3b2eaca70f9738b9708343b4e6db9) Thanks [@rezrah](https://github.com/rezrah)! - Remove fixed background color from `Hero` to allow underlying customisation to be surfaced.

* [#27](https://github.com/primer/react-brand/pull/27) [`ca2d300`](https://github.com/primer/react-brand/commit/ca2d3002ba6f7ca9c719f80077c4d95246f33410) Thanks [@rezrah](https://github.com/rezrah)! - Updated Hero text appearance

  - **updated** Hero description text size from `500` to `400`
  - **updated** button alignment to not stretch on mobile viewports
  - **removed** `size` prop. Now only one responsive size available.

## 0.0.3

### Patch Changes

- [#18](https://github.com/primer/react-brand/pull/18) [`0835830`](https://github.com/primer/react-brand/commit/0835830fc15c582e280ac692ff3d578d6bcf282e) Thanks [@rezrah](https://github.com/rezrah)! - Fixes for production bundles

## 0.0.2

### Patch Changes

- [#2](https://github.com/primer/react-brand/pull/2) [`ab01a8a`](https://github.com/primer/react-brand/commit/ab01a8ad1dc504f7a2865213b6f41c0b0adba131) Thanks [@colebemis](https://github.com/colebemis)! - Initialize releases with [changesets](https://github.com/changesets/changesets)
