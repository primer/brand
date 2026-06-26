import type {Catalog} from '../catalog/types.js'

export type Severity = 'error' | 'warning'

export interface Finding {
  severity: Severity
  rule: string
  message: string
  /** A short snippet of the offending source, for context. */
  evidence?: string
}

export interface Rule {
  id: string
  run(code: string, catalog: Catalog): Finding[]
}

/** Trim a matched snippet so findings stay compact in the agent's context. */
export function evidence(snippet: string, max = 80): string {
  const collapsed = snippet.replace(/\s+/g, ' ').trim()
  return collapsed.length > max ? `${collapsed.slice(0, max - 1)}\u2026` : collapsed
}
