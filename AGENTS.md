# Primer Brand

Last reviewed: 2026-10-23.

If more than six months have passed since this date, verify the guidance relevant to the current task against the latest codebase before relying on it. Update this date only after reviewing the whole file for consistency.

Primer Brand is GitHub's marketing design system. Not to be confused with `@primer/react`, which is for GitHub's signed-in Product UI. This monorepo contains React components, design tokens, CSS, documentation, Storybook recipes, and a consumer-facing MCP server for the brand system.

## Read Before Authoring

- Read the [authoring guidelines](contributor-docs/authoring-guidelines.md) first.
- Load the [component-authoring skill](.github/skills/component-authoring/SKILL.md) when creating or changing components in packages/react.
- Read the [Storybook recipe instructions](.github/instructions/storybook-recipes-and-examples.instructions.md) when composing Storybook recipes.
- Follow the written guidelines over conflicting patterns that exist in older files. Do not refactor unrelated components unless task requires you to do this.

## Work Within Scope

- Preserve public APIs and behavior unless the task requires changes to them.
- Check the existing env before installing dependencies, starting servers, regenerating snapshots, or changing build tooling. Reuse what the user or harness has already prepared when it meets the task's needs.
- Do not create branches, commit, or push unless explicitly requested.
- Do not create or modify pull requests. Contributors manage them. Never create issues without approval either.

## Workspace And Commands

Use the Node and npm versions declared in [package.json](package.json) and [.nvmrc](.nvmrc). Run `npm ci` when dependencies are missing or out of sync.

- Run `npm run build:lib` when a check needs missing or outdated package outputs. Root `start:storybook`, `start:docs`, and `test` already include this build; avoid building twice. Start servers only when requested.
- Choose checks that fit the change you're making. Use focused checks during development and broaden coverage for shared or cross-package changes. Reuse passing results while their inputs remain unchanged.
- Run Prettier in write mode on touched files before final validation. Avoid slow repository-wide formatting.
- For new or substantial component changes, show the implementation for manual review before expensive builds or VRT, unless full verification is requested. Complete deferred checks after review.
- Before a requested commit, run `npm run lint` (zero warnings), `npm run format`, `npm run check`, and `npm run test`. [CI](.github/workflows/ci.yml) also runs MCP smoke tests and docs-bundle verification. Report failed or unrun checks.

## Persisting user preferences

When the user asks to add a preference to the codebase guidelines:

1. Update the relevant section of the [authoring guidelines](contributor-docs/authoring-guidelines.md). Prefer to merge with existing rules instead of appending duplicates.
2. State the scope and preferred pattern. Add a short example or exception only when necessary. Do not turn a task-specific choice into a universal rule.
3. Update the component skill only if the workflow changes. Keep shared page guidance in its existing source.
4. Do not refactor legacy code as part of recording a preference. Summarize the durable rule and its location.
