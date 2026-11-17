---
name: component-authoring
description: 'Create or update Primer Brand React components, including variants, Figma implementation, styles, stories, tests, visual regression coverage, and documentation. Not for composing pages from existing components.'
---

# Component Authoring

Read the [authoring guidelines](../../../contributor-docs/authoring-guidelines.md) and their approved examples before making any edits.

## Choose The Path

- **New component:** Inspect related components for reusable primitives and conventions. Do not substitute an existing component without agreement.
- **Existing component:** Read its implementation and tests. Preserve unrelated APIs and behavior; change only what the task requires.
- **Recipes and full page layouts:** Follow the [Storybook recipe instructions](../../instructions/storybook-recipes-and-examples.instructions.md).

## Inspecting The Design

When a Figma design is supplied:

- Inspect it using the Figma MCP server and follow its guidance.
- If unavailable, ask the user to enable it or agree an alternative.
- Don't use code connect unless the user asks for it
