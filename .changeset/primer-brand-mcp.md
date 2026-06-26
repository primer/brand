---
'@primer/brand-mcp': minor
---

Added `@primer/brand-mcp`, a Model Context Protocol (MCP) server that helps AI agents use Primer Brand correctly when building GitHub marketing and landing pages.

It exposes version-aware tools like `primer_brand_component`, `primer_brand_examples`, `primer_brand_tokens`, `primer_brand_asset`, `primer_brand_docs`, and `primer_brand_review`, which read the `@primer/react-brand` package installed in your project and validates generated JSX/CSS against known design system conventions during development (e.g. unknown components, invalid props, hardcoded values, off-brand patterns).

Add it to your MCP client (e.g. Copilot CLI, in `~/.copilot/mcp-config.json`):

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
