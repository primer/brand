# @primer/brand-mcp

## 0.73.0

### Patch Changes

- [#1438](https://github.com/primer/brand/pull/1438) [`baa0861`](https://github.com/primer/brand/commit/baa0861d4a05aabd703dd62059b85caf743f97d3) Thanks [@rezrah](https://github.com/rezrah)! - Improved gridline guidance. Also added new example CSS with canonical component examples to the catalog.

## 0.72.0

### Patch Changes

- [#1400](https://github.com/primer/brand/pull/1400) [`29cf9f0`](https://github.com/primer/brand/commit/29cf9f0ec459f1f3d9791073459eef2ae497d96f) Thanks [@rezrah](https://github.com/rezrah)! - Improves guidance and examples delivered through the Primer Brand MCP tools:

  - Improves guidance delivered through the `primer_brand_review` tool.
  - Cleaner output from the `primer_brand_examples` tool.
  - Add new page design guidance advising that `River` descriptions are limited to 160 characters and the default `50:50` image-to-text ratio is preferred.
  - Improved guidance on imagery used in `Hero` and `River` components

## 0.71.0

### Patch Changes

- [#1395](https://github.com/primer/brand/pull/1395) [`42b27ee`](https://github.com/primer/brand/commit/42b27ee115bbf4d11ed3d013759a6ef4bac828e0) Thanks [@rezrah](https://github.com/rezrah)! - Expanded the `primer_brand_page_design` guidance with clearer instructions on:

  - containing content within the gridline column
  - preserving typographic hierarchy
  - respecting icon color rules

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
