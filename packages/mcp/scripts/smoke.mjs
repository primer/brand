#!/usr/bin/env node
/**
 * End-to-end smoke test for the built server: spawn `dist/index.js` over stdio, connect a real
 * MCP client, and assert its tools answer without error — including that the
 * flagship `primer_brand_review` actually flags planted off-brand code. Run in CI via `npm run smoke`
 * (which builds first); also handy locally. Exits non-zero on the first failed assertion.
 */
import {Client} from '@modelcontextprotocol/sdk/client/index.js'
import {StdioClientTransport} from '@modelcontextprotocol/sdk/client/stdio.js'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const transport = new StdioClientTransport({command: 'node', args: ['dist/index.js']})
const client = new Client({name: 'primer-brand-mcp-smoke', version: '0.0.0'})

try {
  await client.connect(transport)

  const {tools} = await client.listTools()
  const names = tools.map(tool => tool.name).sort()
  process.stdout.write(`tools (${tools.length}): ${names.join(', ')}\n`)
  // Zero-maintenance signal: a healthy server registers multiple tools. The specific tools we rely
  // on are exercised by the calls below, so there is no hardcoded tool list to keep in sync.
  assert(tools.length > 1, `expected multiple tools, got ${tools.length}`)

  const call = async (name, args) => {
    const result = await client.callTool({name, arguments: args})
    const text = result.content?.[0]?.text ?? ''
    assert(!result.isError, `${name} returned an error: ${text.slice(0, 200)}`)
    assert(text.length > 0, `${name} returned empty content`)
    process.stdout.write(`  \u2713 ${name}\n`)
    return text
  }

  // primer_brand_docs is intentionally not asserted here: it depends on a bundled docs dir / network,
  // which isn't guaranteed offline in CI. It still appears in the printed tool list above.
  await call('primer_brand_setup', {framework: 'next-app'})
  await call('primer_brand_component', {name: 'Hero'})
  await call('primer_brand_examples', {goal: 'education landing page'})
  await call('primer_brand_asset', {query: 'arrow', kind: 'icon'})
  await call('primer_brand_tokens', {query: 'accent background', limit: 4})

  // Flagship check: deliberately off-brand code (raw <div>, hardcoded hex, pill radius, placeholder
  // copy) must be flagged, proving the review engine runs end to end against the real catalog.
  const review = await call('primer_brand_review', {
    code: `import {Hero} from '@primer/react-brand'
<Hero align="middle"><Hero.Title>Ship faster</Hero.Title></Hero>
<div className="card" style={{background: '#6f42c1', borderRadius: '9999px'}}>lorem ipsum</div>`,
  })
  assert(
    /error\(s\)/.test(review) && !/No issues found/.test(review),
    'primer_brand_review did not flag the planted violations',
  )

  process.stdout.write('\nsmoke: OK\n')
} catch (error) {
  process.stderr.write(`\nsmoke: FAILED \u2014 ${error.message}\n`)
  process.exitCode = 1
} finally {
  await client.close().catch(() => {})
}
