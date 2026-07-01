#!/usr/bin/env node
/**
 * Quick smoke test for CI (not comprehensive - but catches critical regressions).
 * Creates a MCP client and connects to the built server.
 * Calls a handful of tools to ensure they return non-empty content and don't error.
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

  assert(tools.length > 1, `expected multiple tools, got ${tools.length}`)

  const call = async (name, args) => {
    const result = await client.callTool({name, arguments: args})
    const text = result.content?.[0]?.text ?? ''
    assert(!result.isError, `${name} returned an error: ${text.slice(0, 200)}`)
    assert(text.length > 0, `${name} returned empty content`)
    process.stdout.write(`  \u2713 ${name}\n`)
    return text
  }

  await call('primer_brand_setup', {framework: 'next-app'})
  await call('primer_brand_page_design', {})
  await call('primer_brand_component', {name: 'Hero'})
  await call('primer_brand_examples', {goal: 'education landing page'})
  await call('primer_brand_asset', {query: 'arrow', kind: 'icon'})
  await call('primer_brand_tokens', {query: 'accent background', limit: 4})

  // This is deliberately bad code, which should be flagged by the review tool.
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
  try {
    await client.close()
  } catch {
    // ignore errors while closing the client
  }
}
