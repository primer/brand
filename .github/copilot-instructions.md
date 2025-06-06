This is Primer Brand, a React component library for creating marketing websites and digital experiences.

Please follow these guidelines when contributing:

## Code Standards

### Required Before Each Commit

- Run `npm run format:fix` and `npm run lint` before committing any changes to ensure proper code formatting.

### Development Flow

- Build: `npm run build:lib`
- Test: `npm run test`

## Repository Structure

- `apps/docs`: Contains the documentation for Primer Brand, built with Gatsby.
  - `apps/docs/content/components`: Contains the markdown documentation for the React components in Primer Brand.
- `apps/next-docs`: Contains the new documentation site which will eventually replace the existing docs site. Any changes made to the `apps/docs` should also be reflected in this new site, and vice versa.
  - `apps/next-docs/content/components`: Contains the markdown documentation for the React components in Primer Brand.
- `packages/design-tokens`: Contains design tokens for the Primer Design System. After modifying design tokens, run `npm run build --workspace=packages/design-tokens` to build them into `packages/design-tokens/lib/design-tokens/css/tokens`.
- `packages/react`: Contains the React components for Primer Brand, along with the associated tests and Storybook stories.
  - `packages/react/src`: Contains the source code for the React components.
    - Each component should have its own directory with an `index.ts` file which exports the component.
    - Each component should have its own Storybook stories file in the same directory, named `ComponentName.stories.tsx` which sets up the stories and arguments for that component.
    - Each component should have its own test file in the same directory, named `ComponentName.test.tsx` which contains the tests for that component, using React Testing Library and Jest.
    - Each component should have its own styles file in the same directory, named `ComponentName.module.css` which contains the styles for that component. The associated types file `ComponentName.module.css.d.ts` will be generated automatically by running `npm run build:lib`.
- `packages/design-tokens/lib/design-tokens/css/tokens`: Contains the CSS files for the design tokens, which are generated automatically and should not be modified directly.

## Key Guidelines

- Follow React and TypeScript best practices.
- Ensure all components are accessible and follow WCAG guidelines.
- Don't add unnecessary comments.
- Write unit tests for new functionality.
- Where possible, memoize functions using `useCallback()`
- Prefer using design tokens from `packages/design-tokens/lib/design-tokens/css/tokens` where possible.
