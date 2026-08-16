---
'@primer/brand-mcp': minor
---

Updated `primer_brand_setup` to create or update `AGENTS.md` beside a `package.json` that declares `@primer/react-brand`.

- Preserves existing instructions and appends/replaces only the Primer Brand instructions.
- Requires `projectDir` when several workspace packages declare Primer Brand.
- Routes future agents to the MCP tools and version-matched local documentation.
