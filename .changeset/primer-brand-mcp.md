---
'@primer/brand-mcp': minor
---

Added `@primer/brand-mcp`, a Model Context Protocol (MCP) server that helps AI agents use Primer Brand correctly when building GitHub marketing and landing pages.

It exposes version-aware tools like:

- `primer_brand_setup`
- `primer_brand_page_design`
- `primer_brand_component`
- `primer_brand_examples`
- `primer_brand_tokens`
- `primer_brand_asset`
- `primer_brand_docs`
- `primer_brand_review`

These tools read the `@primer/react-brand` package that you already have installed and validates JSX and CSS against Primer design system conventions during agentic development.

Add it to your MCP client using `npx @primer/brand-mcp`.

For Copilot CLI, add the following to your `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "primer-brand": {
      "type": "local",
      "command": "npx",
      "args": ["@primer/brand-mcp@latest"],
      "tools": ["*"]
    }
  }
}
```
