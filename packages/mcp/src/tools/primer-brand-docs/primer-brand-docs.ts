import {z} from 'zod'

import {rank} from '../../util/text.js'
import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  query: z.string().optional().describe('Search guidance, e.g. "accessibility", "color usage", "getting started".'),
  path: z.string().optional().describe('Read a specific doc by its path (from a previous search result).'),
})

type Input = z.infer<typeof inputSchema>

const description = `Search and read Primer Brand guidance — principles, accessibility, content, and getting started. Prefers the version-pinned docs bundled with the installed @primer/react-brand, falling back to the live site (https://primer.style/brand) for general guidance. This is brand concepts and how-to, not component APIs (use primer_brand_component for those).`

async function readPath(path: string, ctx: ToolContext): Promise<ToolResult> {
  const doc = await ctx.docs.read(path)
  if (!doc) {
    return {
      text: `Could not read \`${path}\`. Run \`primer_brand_docs\` with a \`query\` to find valid paths.`,
      isError: true,
    }
  }
  const origin = doc.origin === 'installed' ? 'installed package (version-pinned)' : 'live site'
  return {text: `${doc.text}\n\n---\n_Doc source: ${origin}._`}
}

async function search(query: string, ctx: ToolContext): Promise<ToolResult> {
  const entries = await ctx.docs.index()
  if (entries.length === 0) {
    return {
      text: `No documentation index is available (no bundled docs found and the live site was unreachable).\n\n${versionNote(
        ctx,
      )}`,
      isError: true,
    }
  }

  const ranked = query
    ? rank(query, entries, entry => [entry.label, entry.description, entry.path]).map(entry => entry.item)
    : entries

  const chosen = ranked.length > 0 ? ranked : entries
  const note =
    query && ranked.length === 0
      ? `No exact match for "${query}". Showing the full index:`
      : query
      ? `Results for "${query}":`
      : 'Primer Brand documentation:'

  const lines = chosen
    .slice(0, 25)
    .map(entry => `- **${entry.label}** — \`${entry.path}\`${entry.description ? `: ${entry.description}` : ''}`)
  return {
    text: `${note}\n\n${lines.join('\n')}\n\nCall \`primer_brand_docs\` with a \`path\` to read one.\n\n${versionNote(
      ctx,
    )}`,
  }
}

export const primerBrandDocsTool: ToolModule<Input> = {
  name: 'primer_brand_docs',
  title: 'Primer Brand guidance',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx) {
    if (input.path) return readPath(input.path, ctx)
    return search(input.query ?? '', ctx)
  },
}
