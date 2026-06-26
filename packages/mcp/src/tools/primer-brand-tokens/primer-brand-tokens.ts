import {z} from 'zod'

import {rank} from '../../util/text.js'
import {versionNote} from '../format.js'
import type {ToolContext, ToolModule, ToolResult} from '../types.js'

const inputSchema = z.object({
  query: z
    .string()
    .optional()
    .default('')
    .describe(
      'What you need, e.g. "accent background", "danger text", "spacing", "border width", "border radius". Spacing maps to the size/spacing scale; "border" surfaces border-width and border-color tokens.',
    ),
  group: z
    .string()
    .optional()
    .describe(
      'Filter by token category, matched against token names: e.g. "color", "size", "spacing", "border", "shadow", "radius", "font". Combine with query to narrow.',
    ),
  limit: z.number().int().min(1).max(50).optional().default(15).describe('Max results.'),
})

type Input = z.infer<typeof inputSchema>

const description = `Resolve Primer Brand design tokens to CSS variables and values. Searches by intent — mapping color words to GitHub semantics (blue->accent, red->danger, green->success, yellow->attention) and spacing words to the size/spacing scale — and \`group\` filters by category (e.g. "color", "size", "border", "shadow"). Use these CSS variables instead of hardcoded hex/px so pages adapt across light and dark themes.`

/**
 * Map human words to the vocabulary that actually appears in Primer token names, so intent-based
 * queries and the `group` facet resolve to real tokens. Spacing is expressed with size/spacing
 * tokens, and the GitHub functional palette renames the usual colour words.
 */
const TOKEN_SYNONYMS: Record<string, string[]> = {
  blue: ['accent'],
  red: ['danger'],
  green: ['success'],
  yellow: ['attention'],
  orange: ['severe'],
  gray: ['neutral'],
  grey: ['neutral'],
  space: ['spacing', 'size'],
  spacing: ['spacing', 'size'],
  gap: ['gap', 'spacing', 'size'],
  padding: ['padding', 'spacing', 'size'],
  margin: ['margin', 'spacing', 'size'],
  size: ['size'],
  // "border" alone otherwise ranks border-COLOR tokens above the border-WIDTH family (the 1px/2px
  // primitives agents actually need); boosting borderWidth surfaces them alongside the colors.
  border: ['borderWidth'],
  width: ['borderWidth'],
  radius: ['radius'],
  rounded: ['radius'],
  font: ['font'],
  typography: ['font', 'lineHeight'],
}

/** A category term plus its synonyms, lower-cased — what token names and groups are matched against. */
function categoryNeedles(term: string): string[] {
  const lower = term.trim().toLowerCase()
  return [lower, ...(TOKEN_SYNONYMS[lower] ?? [])]
}

function expandQuery(query: string): string {
  const extra = query
    .toLowerCase()
    .split(/\s+/)
    .flatMap(word => TOKEN_SYNONYMS[word] ?? [])
  return [query, ...extra].join(' ')
}

export const primerBrandTokensTool: ToolModule<Input> = {
  name: 'primer_brand_tokens',
  title: 'Primer Brand design tokens',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx: ToolContext): ToolResult {
    let tokens = ctx.catalog.tokens
    if (tokens.length === 0) {
      return {
        text: `Token data is not available. Ensure \`@primer/brand-primitives\` is installed/built.\n\n${versionNote(
          ctx,
        )}`,
        isError: true,
      }
    }

    if (input.group) {
      const needles = categoryNeedles(input.group)
      tokens = tokens.filter(token => {
        const haystack = `${token.name} ${token.group}`.toLowerCase()
        return needles.some(needle => haystack.includes(needle))
      })
    }

    const query = input.query.trim()
    const chosen = query
      ? rank(expandQuery(query), tokens, token => [token.name, token.group, token.value]).map(entry => entry.item)
      : tokens

    if (chosen.length === 0) {
      return {
        text: `No tokens matched "${query}"${
          input.group ? ` in category "${input.group}"` : ''
        }. Try a broader term like "color", "size", or "border".\n\n${versionNote(ctx)}`,
      }
    }

    const shown = chosen.slice(0, input.limit)
    const more =
      chosen.length > shown.length ? `\n\n_${chosen.length - shown.length} more — narrow your query to see them._` : ''
    const lines = shown.map(token => `- \`var(${token.name})\` = \`${token.value}\` _(${token.group})_`).join('\n')
    return {text: `${lines}${more}\n\n${versionNote(ctx)}`}
  },
}
