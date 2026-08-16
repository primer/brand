import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

import {z} from 'zod'

import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({})

type Input = z.infer<typeof inputSchema>

const description = `Read before building a Primer Brand marketing or landing page.
Returns page-level composition guidance and current-brand reference templates for combining components.
Use \`primer_brand_docs\` or \`primer_brand_component\` for individual component APIs.
These visual conventions are not fully enforced by \`primer_brand_review\`.`

const guidancePath = fileURLToPath(new URL('../../../content/page-design.md', import.meta.url))

export const primerPageDesignTool: ToolModule<Input> = {
  name: 'primer_brand_page_design',
  title: 'Page design patterns',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(_input, ctx: ToolContext): ToolResult {
    const guidance = readFileSync(guidancePath, 'utf8').trim()
    const assetGeneratorNote = ctx.assetGenerator.available
      ? `

## Generating Hero and River media

You have the GitHub Asset Generator MCP tools (\`asset-generator\`) — always use them for the media above instead of stock photos or AI art. For the product-UI dither treatment, call \`create_dither_patterns\` only when a product/UI screenshot is ready to pass immediately to \`create_full_screen_product_shot\`, and keep the two generated files separate. Use \`create_product_landscape\` only when the brief requires a single flattened, precomposed image, and treat its \`full_screen\` output as the product-shot style, not permission to bleed the foreground full-width. Never use social or open-graph templates such as \`create_social_square\` or \`create_landscape\` for Hero or River media.`
      : ''
    return {text: `${guidance}${assetGeneratorNote}\n\n${versionNote(ctx)}`}
  },
}
