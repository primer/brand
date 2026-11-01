# Authoring Guidelines

These are the Primer Brand maintainers' coding preferences. Follow these guidelines when writing new code in this repo.

## Components And Ownership

### Structure And Reuse

- Keep each component's implementation, CSS Module, barrel, stories, and tests together in its component folder.
- Prefer compound APIs when consumers compose meaningful parts, attaching subcomponents to the root with `Object.assign`. Do not add compound parts to leaf components merely to match the reference.
- If a component file is exceeding ~600 lines of code due to complex sub-components move the named children into a `sub-components/` folder.
- Do not impose arbitrary maximum widths on grouping components. Let the parent layout constrain them unless the specification requires otherwise.

### Functions And Helpers

- Use named function declarations for components and subcomponents, not arrow functions. With `forwardRef`, name the implementation `ComponentNameBase` and place `const ComponentName = forwardRef(ComponentNameBase)` immediately after it.
- Support the React versions declared in the [package peer dependencies](../packages/react/package.json). Retain `forwardRef` while React 18 is supported.
- Reserve module-root functions for component implementations and public entry points.
- Keep private helpers inside the component or function that uses them as `const` arrow functions, including helpers reused by its inner callbacks.
- Extract genuinely shared or substantial helper logic into suitable modules, rather than adding small helper functions alongside the component.
- Do not add `useMemo` or `useCallback` by default.

### Types And Naming

- Use full component names for new component bindings and their props types, such as `TestimonialQuote` and `TestimonialQuoteProps`. Keep generic local names such as `ref` and `testIds`; do not rename existing public exports just to match this convention.
- Prefer `type` aliases over `interface` for new types.
- Combine class names with `clsx` and strings with template literals.
- Prefix custom callback props with `on` and handler functions with `handle`, e.g. `onLinkActivate` and `handleLinkActivate`. Describe the action, not the input device. Keep standard DOM props such as `onClick` unchanged.
- Keep prop descriptions short and concrete.
- Do not remove compatibility comments or documented workarounds just because they appear unused.

## Styling And Tokens

### CSS

- Use CSS Modules for components, stories, and examples, not new global stylesheets.
- Derive part and state classes in React; do not use data-attribute CSS selectors.
- Use logical properties such as `margin-block-start` and `padding-inline`; do not add directional spacing such as `margin-top`.
- Use the existing breakpoints. Do not add global breakpoint tokens or copy prototype-specific thresholds.
- CSS Module declarations are generated with `npm run build:css-types --workspace=packages/react`.

### Tokens

- Use text/heading tokens for typography, not base spacing tokens.
- Set light/dark values in source token files rather than overriding those tokens in component CSS.
- Reuse global brand tokens (e.g. `--brand-text-*`) only when they match the intended design exactly across all relevant breakpoints and color modes.
- When no equivalent global token exists, define a component-specific token for the required design value.
- Put responsive values in the token's `responsive` object using existing breakpoints. Use one CSS variable, not separate breakpoint tokens, and register the file with the [responsive token build](../packages/design-tokens/scripts/build-tokens.js).
- Hardcoded values should be rare. Add a short `TODO` comment explaining why each hardcoded value was needed.
- Token source examples: [base tokens](../packages/design-tokens/src/tokens/functional/components/testimonial/base.json) and [mode-aware colors](../packages/design-tokens/src/tokens/functional/components/testimonial/colors.json).
- Format token JSON with expanded multiline `value` objects, matching the existing source files.

## Accessibility And Content

### Accessibility

- Follow WAI-ARIA conventions and guidance by default
- Preserve screen-reader announcements when localizing components. For simple labels, prefer complete strings with defaults over formatter callbacks.
- Use English fixtures in unit tests unless the test specifically checks localization.

### Content And Assets

- Use the repository's Mona Sans fonts, Octicons for UI icons, and `@primer/octovisuals-react` for GitHub illustrative icons rather than copied font or icon exports.
- Prefer fictional GitHub users or mascots such as Hubot (Chief Automation Officer) for quotes in Storybook and docs. Follow [Hubot's official character](https://hubot.github.com/). Do not attribute spoken quotes to Mona.
- Use representative content with realistic lengths. Preserve maintainer-authored copy unless the task requires changing it.
- Support at least one non-English locale in every English-default Storybook story, covering its example text and accessible labels. Use the existing locale selector; custom Playground text remains user-provided. Do not add localized visual snapshots.

## Stories, Tests, And Documentation

### Storybook

- Keep Default and Playground in the main stories file.
- Default uses default component props and representative content; Playground exposes the component's controls.
- Feature stories demonstrate states or composition with concise labels. Example stories demonstrate realistic workflows. Redeclare each story's JSX and parameters instead of sharing render helpers or spreading another story.
- Prefer the component's uncontrolled state in input/toggle playgrounds. Do not introduce `useArgs` synchronization without an explicit requirement.

### Unit Tests

- Prefer role, label, and text queries such as `getByRole`, `getByLabelText`, and `getByText`.
- Use exposed `Component.testIds` when those queries aren't suitable. Define a `root` ID and derive child IDs with getters using `this.root`.
- Use one flat `describe` block per test file, descriptive cases, and `it.each`.
- Keep related tests in the component's existing test file.

### Visual Tests

- Visual specs are generated from Storybook with `npm run test:visual:generate`. Specs and snapshots live beside the component; tooling lives in [packages/e2e](../packages/e2e).

### Documentation And Releases

- Use one changeset per component/area. Check existing changesets before adding another.
- Small fixes are `patch`; breaking changes and substantial new features are `minor`, not `major` given Primer Brand is pre-v1.
- New-component release notes should briefly say what was added, show concise JSX usage, and link to the documentation. Describe public changes, not internal implementation details. Refer to `packages/react/Changelog.md` for examples of previous changelog entries.

## Pages And Recipes

- Follow the [page-design guide](../packages/mcp/content/page-design.md) and its examples when building full-page recipes.

## Reference Components

These components illustrate the conventions above. Choose a reference with similar complexity to what you're building.

- [Testimonial](../packages/react/src/Testimonial/)

When changing or reviewing a reference component, mention its role as a reference and flag conflicts with this guide. Agree convention changes with maintainers and update the guide alongside the component.

## Validation

Follow the [repository validation policy](../AGENTS.md#workspace-and-commands) for build prerequisites, batched checks, and pre-commit gates.
