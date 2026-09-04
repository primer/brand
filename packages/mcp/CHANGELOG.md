# @primer/brand-mcp

## 0.75.1

## 0.75.0

### Patch Changes

- [#1462](https://github.com/primer/brand/pull/1462) [`7080a2b`](https://github.com/primer/brand/commit/7080a2b92947b9dfc5ac8973a928e988ec922c13) Thanks [@rezrah](https://github.com/rezrah)! - Updated MCP dependencies and asset discovery capabilities for Octicons/Octovisuals.

## 0.74.0

### Minor Changes

- [#1444](https://github.com/primer/brand/pull/1444) [`e61d466`](https://github.com/primer/brand/commit/e61d4664c260e18ce9b6f134a3d0684f339198cc) Thanks [@rezrah](https://github.com/rezrah)! - Updated `primer_brand_setup` to create or update `AGENTS.md` beside a `package.json` that declares `@primer/react-brand`.

  - Preserves existing instructions and appends/replaces only the Primer Brand instructions.
  - Requires `projectDir` when several workspace packages declare Primer Brand.
  - Routes future agents to the MCP tools and version-matched local documentation.

### Patch Changes

- [#1444](https://github.com/primer/brand/pull/1444) [`e61d466`](https://github.com/primer/brand/commit/e61d4664c260e18ce9b6f134a3d0684f339198cc) Thanks [@rezrah](https://github.com/rezrah)! - Updated MCP text guidance:

  - Recommended component text defaults in `primer_brand_page_design` and warned about unnecessary `size` props in `primer_brand_review`.
  - Recommended `InlineCode` for short code fragments in authored React.

- [#1444](https://github.com/primer/brand/pull/1444) [`e61d466`](https://github.com/primer/brand/commit/e61d4664c260e18ce9b6f134a3d0684f339198cc) Thanks [@rezrah](https://github.com/rezrah)! - Updated MCP gridline tools to prevent disconnected, centered border boxes:

  - Updated `primer_brand_page_design` to prefer built-in gridline APIs and scope custom page-width frames to grouped Cards and Pillars.
  - Updated `primer_brand_examples` to preserve canonical Card/Pillar companion CSS and surface the focused Statistic gridline example.

- [#1451](https://github.com/primer/brand/pull/1451) [`3b22cb5`](https://github.com/primer/brand/commit/3b22cb592978ab7b32103575909db12cad548c1a) Thanks [@rezrah](https://github.com/rezrah)! - Improved clarity and guidelines for `Token` and `Label` components:

  - Use `Token` for compact metadata that describes or supports adjacent content.
  - Use `Label` for short status or metadata attached to an object in product-like UI.
  - Added development warnings for legacy standalone `Label` children in `River.Content` and `Bento.Content`.
  - Added MCP server instructions to provide errors for the standalone `Label` component used near first-class patterns and components.

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
