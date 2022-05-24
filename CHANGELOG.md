# @primer/react-brand

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
