# Instructions for Primer Brand

Last reviewed: 2025-08-14.

If today's date is more than 6 months after this date, please verify these instructions against the latest codebase.

## Repository Overview

**Primer Brand** is GitHub's design system for creating React-based marketing websites and digital experiences. This is a TypeScript/React monorepo using npm workspaces that publishes multiple packages:

- **`@primer/react-brand`** (main package): React components library. Not to be confused with `@primer/react`, which is for GitHub Product UI.
- **`@primer/brand-primitives`**: Design tokens and primitives
- **`@primer/brand-css`**: CSS-only stylesheets

### Required Build Sequence

**NEVER** skip `npm run build:lib` before other commands. The monorepo has strict build dependencies:

1. **First**: `npm run build:lib` (builds design-tokens, react, css packages)
2. **Then**: Other commands like storybook, docs, tests

**Wrong**: `npm run start:storybook` (will fail without built lib)  
**Correct**: `npm run build:lib && npm run start:storybook`

### Core Commands That Work

```bash
# Installation (required first step)
npm ci --legacy-peer-deps

# Essential build (required before most other commands)
npm run build:lib              # ~2-3 minutes, builds all library packages

# QA checks (read-only, safe to run)
npm run lint                   # ESLint across all workspaces
npm run format                 # Check Prettier formatting
npm run check                  # TypeScript type checking
npm run test                   # Jest unit tests (~30 seconds)
npm run test:visual            # Visual regression tests (Playwright)

# QA tools (modifies files)
npm run format:fix             # Fix Prettier formatting (~12 seconds)
npm run clean                  # Clean all build outputs
npm run test:visual:update     # Visual regression tests + update snapshots (Playwright)

# Development
npm run start:docs             # Next.js docs site (port 3000) - Always run npm run build:lib before this
npm run start                  # Builds library and starts storybook server (port 6006)

# Full builds
npm run build                  # Full production build (~5-10 minutes)
```

### Commands With Known Issues

- **Visual tests**: E2E tests can be flaky and may require multiple runs

## File Structure & Architecture

### Workspace Layout

```
packages/
├── react/           # Main React components (@primer/react-brand)
├── design-tokens/   # Design tokens (@primer/brand-primitives)
├── css/             # CSS distribution (@primer/brand-css)
├── fonts/           # Font files, rarely changes
├── e2e/             # E2E tests and visual regression
└── repo-configs/    # Shared configuration

apps/
├── storybook/       # Component documentation/playground
└── next-docs/       # Documentation website
```

## Development Workflow

### Making Changes

1. **Always start with**: `npm i --legacy-peer-deps`
2. **Before development**: `npm run start`
3. **After editing code**: `npm run format:fix` (auto-formats all files)
4. **Before committing**:
   ```bash
   npm run lint      # Must pass with 0 warnings
   npm run format    # Must pass with no formatting issues
   npm run check     # TypeScript validation
   npm run test      # Unit tests
   ```

### Component development

- **Location**: `packages/react/src/ComponentName/`
- **Required files**: `ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
- **Stories**: `ComponentName.stories.tsx` or `Component.features.stories.tsx`.
  - Use `Component.stories.tsx` for Default and Playground stories only. Default is component with no props. Playground is the component with full Storybook controls.
  - Use `Component.features.stories.tsx` for specific features or variations of the component.
- **Tests**: `ComponentName.test.tsx`
- **CSS Modules**: Auto-generated `.d.ts` files via `npm run build:css-types`
- **Visual tests**: Auto-generated using `npm run test:visual:generate` or `npm run test:visual:update`

### Styling & Design Tokens

- **CSS Modules**: `ComponentName.module.css`. Final build output will apply hashing to class names.
- **Design tokens**: `packages/design-tokens/` (build outputs warnings about collisions - this is normal)
- **Responsive**: Only use breakpoint values from `packages/design-tokens/lib/design-tokens/css/tokens/functional/size/breakpoints.css` after running `npm run build:lib`

### Release Process

- **Changesets**: Use `npx changeset` to add release notes. Doesn't strictly follow SemVer. Don't use `major`. `minor` is instead for breaking changes, and big new features. `patch` is for small fixes.

## General notes

- Stick to existing conventions in the repo where possible, before creating new precedents.
- This project has no dependency, and minimal relation to `@primer/react`.
- When adding new features, add Unit Tests to existing files to prevent drops in coverage.
- Always ensure code is accessible and complies with WCAG 2.1 standards.
- In `**/*.module.css` files, never hardcode pixel values. Instead use size tokens from `packages/design-tokens/lib/design-tokens/css/tokens/base/size/size.css` after running `npm run build:lib`. Other CSS variables available in ``packages/design-tokens/lib/design-tokens/css/tokens/**`.

**Trust these instructions** - they are based on verified testing of the actual codebase. Only search for additional information if these instructions are incomplete or proven incorrect.
