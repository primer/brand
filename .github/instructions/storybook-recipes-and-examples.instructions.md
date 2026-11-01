---
description: 'Use when creating Storybook recipes, component compositions, or full-page layouts with existing Primer Brand components inside this repository.'
applyTo: 'packages/react/src/recipes/**,packages/react/src/**/*.examples.stories.tsx,packages/react/src/**/*.features.stories.tsx'
---

# Storybook Recipes And Examples

Read the [page-design guide](../../packages/mcp/content/page-design.md) before creating or changing a full-page recipe or page-level example. Keep shared page-design rules in that guide rather than duplicating them here.

You can find recipe examples in the [Storybook recipe sources](../../packages/react/src/recipes). Follow approved references named in the page design guide, checking that they still exist. If a reference is missing however, report it and use an existing recipe consistent with the guide.

For smaller, pattern-specific examples (e.g. Cards in a grid), put recipes in `Component.examples.stories.tsx` and feature/state demonstrations in `Component.features.stories.tsx`.

Coding conventions are in the [authoring guidelines](../../contributor-docs/authoring-guidelines.md).
