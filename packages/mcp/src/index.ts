#!/usr/bin/env node
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'

import {createServer} from './server.js'

/**
 * Entry point for MCP server. Transports over stdio.
 */
try {
  const server = createServer()
  await server.connect(new StdioServerTransport())
} catch (error) {
  process.stderr.write(`[primer-brand-mcp] fatal: ${(error as Error).message}\n`)
  process.exit(1)
}
