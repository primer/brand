import {z} from 'zod'

import {rank} from '../../util/text.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  query: z.string().describe('What you are looking for, e.g. "arrow", "shield", "rocket", "logo".'),
  kind: z
    .enum(['icon', 'illustration'])
    .optional()
    .describe('Restrict to Octicons ("icon") or Octovisuals ("illustration").'),
  limit: z.number().int().min(1).max(50).optional().default(12).describe('Max results.'),
})

type Input = z.infer<typeof inputSchema>

const description = `Find approved Primer Brand visuals as code imports: Octicons (@primer/octicons-react) and Octovisuals (@primer/octovisuals-react). Use these instead of emoji, clip art, or random icon sets — mismatched or emoji icons are off-brand.`

export const primerBrandAssetTool: ToolModule<Input> = {
  name: 'primer_brand_asset',
  title: 'Primer Brand icons & illustrations',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx: ToolContext): ToolResult {
    const origin =
      ctx.assetsOrigin === 'installed'
        ? '_Resolved from the icon packages installed in your project._'
        : '_From the bundled snapshot; your project may have a newer icon package installed._'

    let assets = ctx.assets
    if (assets.length === 0) {
      return {text: `No icon/illustration data is available.\n\n${origin}`, isError: true}
    }
    if (input.kind) {
      assets = assets.filter(asset => asset.kind === input.kind)
    }

    const ranked = rank(input.query, assets, asset => [asset.name]).map(entry => entry.item)
    if (ranked.length === 0) {
      return {
        text: `No ${input.kind ?? 'asset'} matched "${
          input.query
        }". Try a simpler term (e.g. "arrow", "check", "shield").\n\n${origin}`,
      }
    }

    const shown = ranked.slice(0, input.limit)
    const more = ranked.length > shown.length ? `\n\n_${ranked.length - shown.length} more — refine your query._` : ''
    const lines = shown
      .map(asset => `- \`${asset.name}\` _(${asset.kind})_ — \`import {${asset.name}} from '${asset.module}'\``)
      .join('\n')
    return {text: `${lines}${more}\n\n${origin}`}
  },
}
