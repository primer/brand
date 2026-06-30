import type {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'

import {primerBrandAssetTool} from './primer-brand-asset/index.js'
import {primerBrandComponentTool} from './primer-brand-component/index.js'
import {primerBrandDocsTool} from './primer-brand-docs/index.js'
import {primerBrandExamplesTool} from './primer-brand-examples/index.js'
import {primerBrandReviewTool} from './primer-brand-review/index.js'
import {primerBrandTokensTool} from './primer-brand-tokens/index.js'
import {primerBrandSetupTool} from './primer-brand-setup/index.js'
import type {ToolContext, ToolModule} from './types.js'

/**
 * Register a single tool
 */
function add<Input>(server: McpServer, tool: ToolModule<Input>, ctx: ToolContext): void {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputShape,
      annotations: tool.annotations,
    },
    async (args: unknown) => {
      try {
        const result = await tool.run(args as Input, ctx)
        return {
          content: [{type: 'text' as const, text: result.text}],
          isError: result.isError ?? false,
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        ctx.logger.error(`tool ${tool.name} failed: ${message}`)
        return {
          content: [{type: 'text' as const, text: `The ${tool.name} tool failed: ${message}`}],
          isError: true,
        }
      }
    },
  )
}

export function registerTools(server: McpServer, ctx: ToolContext): void {
  add(server, primerBrandSetupTool, ctx)
  add(server, primerBrandComponentTool, ctx)
  add(server, primerBrandExamplesTool, ctx)
  add(server, primerBrandTokensTool, ctx)
  add(server, primerBrandAssetTool, ctx)
  add(server, primerBrandDocsTool, ctx)
  add(server, primerBrandReviewTool, ctx)
}
