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
      'What you need, e.g. "accent background", "danger text", "spacing", "border width", "border radius". Color words map to brand roles (red->danger, green->success, gray->neutral, background->canvas); spacing and dimensional width map to the size scale; "border" surfaces border-width and border-color tokens.',
    ),
  group: z
    .string()
    .optional()
    .describe(
      'Filter by token category, matched against token names: e.g. "color", "canvas", "size", "spacing", "border", "radius", "font". Combine with query to narrow.',
    ),
  limit: z.number().int().min(1).max(50).optional().default(15).describe('Max results.'),
})

type Input = z.infer<typeof inputSchema>

const description = `Resolve Primer Brand design tokens to CSS variables and values, searching by intent. Use these CSS variables instead of hardcoded hex/px so pages adapt across light and dark themes.`

/**
 * Maps colloquial words to the vocabulary that actually appears in Primer Brand token names, so
 * intent-based queries and the `group` facet resolve to real tokens. Only genuine translations
 * belong here: words that already appear in token names (e.g. "weight", "lineHeight", "easing",
 * "gap", "padding") match literally and need no entry.
 *
 * Brand functional color roles are: accent (green), danger, success, neutral, canvas (backgrounds),
 * text (foreground), border, focus. There is intentionally NO `attention` or `severe` role — those
 * are Primer *product* (@primer/react) roles, not brand, so never map to them.
 */
const semanticTokenMap: Record<string, string[]> = {
  // Color intent -> brand functional roles. (Brand accent is green; "blue" routes product-minded
  // queries to the primary accent, and still matches the base blue scale literally.)
  blue: ['accent'],
  red: ['danger'],
  green: ['success'],
  gray: ['neutral'],
  grey: ['neutral'],
  colour: ['color'],
  background: ['canvas'],
  bg: ['canvas'],
  foreground: ['text'],
  fg: ['text'],
  // Spacing / dimensions -> the base size scale (--base-size-*) and brand spacing tokens. "width"
  // is ambiguous (border width vs. dimensional width), so it surfaces both families.
  space: ['spacing', 'size'],
  spacing: ['spacing', 'size'],
  gap: ['gap', 'spacing', 'size'],
  padding: ['padding', 'spacing', 'size'],
  margin: ['spacing', 'size'],
  size: ['size'],
  width: ['borderWidth', 'size'],
  border: ['borderWidth'],
  radius: ['radius'],
  rounded: ['radius'],
  font: ['font'],
  typography: ['font', 'lineHeight'],
}

export const primerBrandTokensTool: ToolModule<Input> = {
  name: 'primer_brand_tokens',
  title: 'Primer Brand design tokens',
  description,
  inputShape: inputSchema.shape,
  annotations: {readOnlyHint: true},
  run(input, ctx: ToolContext): ToolResult {
    const expandQuery = (query: string): string => {
      const extra = query
        .toLowerCase()
        .split(/\s+/)
        .flatMap(word => semanticTokenMap[word] ?? [])
      return [query, ...extra].join(' ')
    }

    const categorySearchTerms = (term: string): string[] => {
      const lower = term.trim().toLowerCase()
      return [lower, ...(semanticTokenMap[lower] ?? [])]
    }

    let tokens = ctx.catalog.tokens
    if (tokens.length === 0) {
      return {
        text: `Token data is not available. Check that \`@primer/brand-primitives\` is installed/built.\n\n${versionNote(
          ctx,
        )}`,
        isError: true,
      }
    }

    if (input.group) {
      const searchTerms = categorySearchTerms(input.group)
      tokens = tokens.filter(token => {
        const tokenText = `${token.name} ${token.group}`.toLowerCase()
        return searchTerms.some(searchTerm => tokenText.includes(searchTerm))
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
