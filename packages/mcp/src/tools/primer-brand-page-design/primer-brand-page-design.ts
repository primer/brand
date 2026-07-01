import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

import {z} from 'zod'

import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({})

type Input = z.infer<typeof inputSchema>

const description = `Page-design patterns to read before building a page: how to structure and style a full marketing/landing page and use components together correctly (frame with \`SubdomainNavBar\` + \`MinimalFooter\`, give heroes media, group cards inside connected gridlines, keep labels auto-width, bias to the gridline aesthetic) plus the current-brand reference templates to start from. Learn individual component APIs with \`primer_brand_docs\` / \`primer_brand_component\` — this is the page-design layer above them. These conventions \`primer_brand_review\` does not enforce.`

const guidancePath = fileURLToPath(new URL('../../../content/page-design.md', import.meta.url))

export const primerPageDesignTool: ToolModule<Input> = {
  name: 'primer_brand_page_design',
  title: 'Page design patterns',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(_input, ctx: ToolContext): ToolResult {
    const guidance = readFileSync(guidancePath, 'utf8').trim()
    return {text: `${guidance}\n\n${versionNote(ctx)}`}
  },
}
