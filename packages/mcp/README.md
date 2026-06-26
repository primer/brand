# @primer/brand-mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server that helps AI agents use **Primer Brand** (`@primer/react-brand`) correctly when building GitHub marketing and landing pages.

It is a version-aware, `stdio` (local) server which reads the docs and metadata of your installed `@primer/react-brand` dependency.

## Tools

| Tool                     | What it does                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `primer_brand_setup`     | Framework-aware setup (Auto-installs `ThemeProvider`, Mona Sans fonts, styles, `'use client'` for RSC) - the parts agents forget. |
| `primer_brand_component` | List components, or get one component's API: props, allowed values, sub-components, examples, accessibility.                      |
| `primer_brand_examples`  | Ranked, copy-and-adapt examples for a goal, taken from the library's own tested stories. Falls back to a default set.             |
| `primer_brand_tokens`    | Resolve design tokens by intent (color, space, typography) to CSS variables and values.                                           |
| `primer_brand_asset`     | Find Octicons (`@primer/octicons-react`) and Octovisuals (`@primer/octovisuals-react`) as code imports.                           |
| `primer_brand_docs`      | Search and read Primer Brand guidance (principles, accessibility, getting started).                                               |
| `primer_brand_review`    | Check generated JSX/CSS against the design system: unknown components, invalid props, hardcoded values, off-brand tells.          |

## Getting started

Requires Node.js >= 24.

### VS Code

```jsonc
{
  "servers": {
    "Primer Brand": {
      "type": "stdio",
      "command": "npx",
      "args": ["@primer/brand-mcp@latest"]
    }
  }
}
```

### Copilot CLI / other stdio clients

Run the server with `npx @primer/brand-mcp@latest`.

## License

MIT
