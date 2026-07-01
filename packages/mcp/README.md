# @primer/brand-mcp

A [Model Context Protocol](https://modelcontextprotocol.io) server that helps AI agents use **Primer Brand** (`@primer/react-brand`) correctly when building GitHub marketing and landing pages.

It is a version-aware, `stdio` (local) server which reads the docs and metadata of your installed `@primer/react-brand` dependency.

## Tools

| Tool                       | What it does                                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `primer_brand_setup`       | Configures Primer Brand first-time. Includes `ThemeProvider`, Mona Sans and RSC-directive configuration among other things                           |
| `primer_brand_page_design` | Page-design conventions (header/footer, hero media, gridline aesthetic, card grids, labels) and the current-brand reference templates to start from. |
| `primer_brand_component`   | Get a component API information like props, allowed values and named sub-components.                                                                 |
| `primer_brand_examples`    | Reference examples taken from our Storybook.                                                                                                         |
| `primer_brand_tokens`      | Resolve design tokens by intent (color, space, typography) to CSS variables and values.                                                              |
| `primer_brand_asset`       | Find Octicons (`@primer/octicons-react`) and Octovisuals (`@primer/octovisuals-react`) more easily                                                   |
| `primer_brand_docs`        | Search and read Primer Brand guidance, including principles, accessibility and getting started.                                                      |
| `primer_brand_review`      | Check generated JSX and CSS against the design system for unknown components, invalid props, hardcoded values                                        |

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
