# @primer/brand-mcp

## 0.70.0

### Minor Changes

- [#1384](https://github.com/primer/brand/pull/1384) [`d117f36`](https://github.com/primer/brand/commit/d117f3617e9ee6c5d90629a7bc29e5c2c11bf0b1) Thanks [@rezrah](https://github.com/rezrah)! - Added `@primer/brand-mcp`, a Model Context Protocol (MCP) server that helps AI agents use Primer Brand correctly when building GitHub marketing and landing pages.

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
