import {existsSync, readFileSync, realpathSync} from 'node:fs'
import {dirname, join, normalize, resolve, sep} from 'node:path'

import type {Logger} from '../logger.js'
import type {BrandInstall} from './resolve-install.js'

/**
 * One entry in the documentation table of contents (parsed from `llms.txt`).
 */
export interface DocEntry {
  label: string
  /** Path relative to the docs root, e.g. `docs/components/Hero/index.md`. */
  path: string
  description?: string
}

export type DocOrigin = 'installed' | 'live' | 'none'

export interface DocResult {
  text: string
  origin: DocOrigin
  version: string | null
}

const SITE = 'https://primer.style/brand'
const FETCH_TIMEOUT_MS = 2500

/**
 * Tiered documentation source.
 *
 * Resolution order, by design:
 *   1. The bundled, version-pinned docs of the installed `@primer/react-brand` (authoritative,
 *      offline, matches the consumer's version).
 *   2. The live site's `llms.txt` / pages — best-effort enrichment for guidance that is not
 *      bundled, bounded by a short timeout and cached.
 *
 * Version-sensitive facts never depend on the network; this only covers prose guidance.
 */
export interface DocsSource {
  origin: DocOrigin
  version: string | null
  index(): Promise<DocEntry[]>
  read(path: string): Promise<DocResult | null>
}

export function createDocsSource(brand: BrandInstall, logger: Logger): DocsSource {
  const cache = new Map<string, string>()

  const hasLocalDocs = Boolean(brand.llmsPath && brand.docsDir)
  const docsRoot = brand.docsDir ? dirname(brand.docsDir) : null

  async function fetchText(url: string): Promise<string | null> {
    const cached = cache.get(url)
    if (cached !== undefined) return cached
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)})
      if (!response.ok) return null
      const text = await response.text()
      cache.set(url, text)
      return text
    } catch (error) {
      logger.debug(`live fetch failed for ${url}: ${(error as Error).message}`)
      return null
    }
  }

  async function index(): Promise<DocEntry[]> {
    if (hasLocalDocs && brand.llmsPath) {
      return parseToc(readFileSync(brand.llmsPath, 'utf8'))
    }
    const live = await fetchText(`${SITE}/llms.txt`)
    return live ? parseToc(live) : []
  }

  async function read(path: string): Promise<DocResult | null> {
    if (hasLocalDocs && docsRoot) {
      const safe = safeJoin(docsRoot, path)
      if (safe && existsSync(safe)) {
        return {text: readFileSync(safe, 'utf8'), origin: 'installed', version: brand.version}
      }
    }
    const live = await fetchText(`${SITE}/${path.replace(/^docs\//, '').replace(/\.md$/, '')}`)
    if (live) return {text: live, origin: 'live', version: null}
    return null
  }

  return {
    origin: hasLocalDocs ? 'installed' : 'live',
    version: brand.version,
    index,
    read,
  }
}

/**
 * Parse the `llms.txt` markdown table of contents into structured entries.
 * Lines look like: `- [Hero](docs/components/Hero/index.md): A prominent banner...`
 */
export function parseToc(markdown: string): DocEntry[] {
  const entries: DocEntry[] = []
  const linkLine = /^- \[(.+?)\]\((.+?)\)(?::\s*(.*))?$/
  for (const raw of markdown.split('\n')) {
    const match = linkLine.exec(raw.trim())
    if (!match) continue
    const [, label, path, description] = match
    if (!label || !path) continue
    entries.push({label, path, description: description?.trim() || undefined})
  }
  return entries
}

/**
 * Join a user-supplied doc path onto the docs root, refusing anything that escapes it.
 * Prevents path traversal (e.g. `../../etc/passwd`) reaching the filesystem.
 */
function safeJoin(root: string, path: string): string | null {
  const target = resolve(join(root, normalize(path)))
  const realRoot = realpathSync(root)
  const prefix = realRoot.endsWith(sep) ? realRoot : `${realRoot}${sep}`
  if (target !== realRoot && !target.startsWith(prefix)) return null
  return target
}
