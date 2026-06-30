import {existsSync, readFileSync, realpathSync} from 'node:fs'
import {dirname, join, normalize, resolve, sep} from 'node:path'

import type {Logger} from '../logger.js'
import type {BrandInstall} from './resolve-install.js'

/**
 * One entry in the documentation table of contents (parsed from `llms.txt`).
 */
export type DocEntry = {
  label: string
  /** Path relative to the docs root, e.g. `docs/components/Hero/index.md`. */
  path: string
  description?: string
}

export type DocOrigin = 'installed' | 'live' | 'none'

export type DocResult = {
  text: string
  origin: DocOrigin
  version: string | null
}

const prodURL = 'https://primer.style/brand'

/**
 * Docs source is either user-installed (bundled with the installed `@primer/react-brand`), or live from the site. The
 * MCP client will always try the installed docs first, and fall back to the live site if not found.
 */
export type DocsSource = {
  origin: DocOrigin
  version: string | null
  index(): Promise<DocEntry[]>
  read(path: string): Promise<DocResult | null>
}

export function createDocsSource(brand: BrandInstall, logger: Logger): DocsSource {
  const cache = new Map<string, string>()

  const hasLocalDocs = Boolean(brand.llmsPath && brand.docsDir)
  const docsRoot = brand.docsDir ? dirname(brand.docsDir) : null

  /**
   * Prevents path traversal (e.g. `../../etc/passwd`) reaching the filesystem.
   */
  const safeJoin = (root: string, path: string): string | null => {
    const target = resolve(join(root, normalize(path)))
    const realRoot = realpathSync(root)
    const prefix = realRoot.endsWith(sep) ? realRoot : `${realRoot}${sep}`
    if (target !== realRoot && !target.startsWith(prefix)) return null
    return target
  }

  /**
   * Parse the `llms.txt` markdown table of contents into structured entries.
   */
  const parseToc = (markdown: string): DocEntry[] => {
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

  const fetchText = async (url: string): Promise<string | null> => {
    const cached = cache.get(url)
    if (cached !== undefined) return cached
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(2500)})
      if (!response.ok) return null
      const text = await response.text()
      cache.set(url, text)
      return text
    } catch (error) {
      logger.debug(`live fetch failed for ${url}: ${(error as Error).message}`)
      return null
    }
  }

  const index = async (): Promise<DocEntry[]> => {
    if (hasLocalDocs && brand.llmsPath) {
      return parseToc(readFileSync(brand.llmsPath, 'utf8'))
    }
    const live = await fetchText(`${prodURL}/llms.txt`)
    return live ? parseToc(live) : []
  }

  const read = async (path: string): Promise<DocResult | null> => {
    if (hasLocalDocs && docsRoot) {
      const safe = safeJoin(docsRoot, path)
      if (safe && existsSync(safe)) {
        return {text: readFileSync(safe, 'utf8'), origin: 'installed', version: brand.version}
      }
    }
    const live = await fetchText(`${prodURL}/${path.replace(/^docs\//, '').replace(/\.md$/, '')}`)
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
