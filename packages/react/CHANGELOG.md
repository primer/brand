# @primer/react-brand

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
