/** Small text utilities shared across tools: escaping and keyword relevance scoring. */

export function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Score how well a free-text query matches a set of fields. Substring matches count,
 * whole-word matches count extra. Returns 0 when nothing matches. Deliberately simple and
 * deterministic — good enough to rank a few hundred catalog entries without a search index.
 */
function scoreText(query: string, fields: Array<string | undefined>): number {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return 0
  const haystack = fields.filter(Boolean).join(' \u0000 ').toLowerCase()
  let score = 0
  for (const term of terms) {
    if (haystack.includes(term)) score += 2
    if (new RegExp(`\\b${escapeRegExp(term)}\\b`).test(haystack)) score += 1
  }
  return score
}

export interface Ranked<T> {
  item: T
  score: number
}

/** Rank items by their best matching field score, keeping only positive matches. */
export function rank<T>(query: string, items: T[], fields: (item: T) => Array<string | undefined>): Array<Ranked<T>> {
  return items
    .map(item => ({item, score: scoreText(query, fields(item))}))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}
