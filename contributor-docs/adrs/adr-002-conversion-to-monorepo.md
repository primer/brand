# ADR 2. Conversion to a monorepo

Date: 2022-06-19

## Status

Proposed

## Decision

Convert `react-brand` to a monorepo to make it easier to navigate, maintain and scale in future.

<table>
<tr>
<th> Before</th> <th> After </th>
</tr>

<tr>
<td valign="top">

```ascii
.
├── .storybook/
│   ├── main.js
│   ├── preview.js
│   └── ...
├── docs/
│   ├── src/
│   └── content/
│       ├── Button.documentation.mdx
│       └── ...
├── fonts/
│   ├── MonaSans.woff
│   └── fonts.css
├── lib/
│   ├── css/
│   ├── design-tokens/
│   ├── Button/
│   ├── ...
│   └── index.js
├── scripts/
│   ├── build-design-tokens.sh
│   └── ...
├── src/
│   ├── tokens/
│   │   ├── base/
│   │   │   └── color.json
│   │   └── functional/
│   │       └── color.json
│   ├── css/
│   │   ├── reset.css
│   │   └── global.ts
│   ├── e2e/
│   │   └── global-tests.js
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       ├── Button.module.css
│       ├── Button.stories.css
│       └── index.ts
└── package.json

```

 </td>
<td valign="top">

```ascii
.
├── packages/
│   ├── design-tokens/
│   │   ├── base/
│   │   │   └── color.json
│   │   ├── functional/
│   │   │   └── color.json
│   │   └── scripts/
│   │       └── build-design-tokens.sh
│   ├── css/
│   │   ├── components/
│   │   │   ├── Button.module.css
│   │   │   └── ...
│   │   ├── reset.css
│   │   └── global.ts
│   ├── fonts/
│   │   ├── MonaSans.woff
│   │   └── fonts.css
│   ├── e2e/
│   │   └── global-tests.js
│   └── react/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.test.tsx
│           ├── Button.stories.css
│           ├── Button.documentation.mdx
│           └── index.ts
├── apps/
│   ├── docs/
│   │   └── src/
│   │       └── ...
│   └── storybook/
│       └── .storybook/
│           ├── main.js
│           └── preview.js
└── package.json
```

</td></tr></table>

## Context

The file and folder structure of the Primer Brand repository can be confusing to navigate for new contributors.

The repository contains:

- design tokens that are independently generated and provide an one-to-many interface for consumers
- css stylesheets that are written to be framework-agnostic
- react components that force a dependency on design tokens through css stylesheets
- documentation in the form of Storybook and Markdown-based content

While there is a relationship between these various components, it's difficult to discern exactly how they are connected without explicit dependency management.

This is where a monorepo could help.

## Alternative approaches

The current file structure came from prioritizing speed-to-market, and to mimic other Primer projects like Primer React, which use a polyrepo approach.

A polyrepo approach is not feasible for Primer Brand, for three main reasons:

1. We have discovered logistical challenges at an org-level, such as tightly coupled dependencies across the ecosystem that make it difficult to understand regression impact ahead-of-time.
2. We are required to abide by release cadences owned by teams that may have other priorities, which could block Primer Brand work from progressing.
3. Primer Brand currently generates its own tokens, stylesheets and React components locally to the repository. Moving to a polyrepo would significantly increase the operational and technical complexity without solving the problem at hand, as we would need to compartmentalize the codebase into strict modules and re-integrate them.

The remaining options are therefore:

- monorepo
- single repo (current)

A monorepo would solve our immediate and long-term needs.

It would help us to:

- separate concerns vertically by domain, while remaining in the same repository
- improve the experience for new contributors to the repo
- publish design tokens as a separate package if needed
- publish css stylesheets as a separate package if needed

## Consequences

- We may want to consider renaming the repository to `primer/brand`
- Engineering effort will be required to disentangle the current single repo configuration, including all established CI/CD automation.

## Actions

- [ ] Convert the repository to a monorepo
  - [ ] Investigate options
  - [ ] Implement decision
- [ ] Revise contributor documentation
