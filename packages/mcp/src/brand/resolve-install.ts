import {existsSync, readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

/**
 * Information about the `@primer/react-brand` install discovered in the consumer's project.
 * This is what makes the server version-aware: tools prefer the docs and version of the
 * package the project actually depends on.
 */
export interface BrandInstall {
  found: boolean
  version: string | null
  packageDir: string | null
  /** Bundled version-pinned docs directory, when the installed version ships one. */
  docsDir: string | null
  /** Bundled `llms.txt` table of contents, when present. */
  llmsPath: string | null
}

const notFound: BrandInstall = {
  found: false,
  version: null,
  packageDir: null,
  docsDir: null,
  llmsPath: null,
}

/**
 * Walk up from `fromDir` looking for `node_modules/@primer/react-brand`. We resolve from the
 * working directory (not from this server's own location) so that, when launched inside a
 * consumer project, we read their installed version.
 */
export function resolveBrandInstall(fromDir: string = process.cwd()): BrandInstall {
  let dir = fromDir
  for (;;) {
    const packageDir = join(dir, 'node_modules', '@primer', 'react-brand')
    if (existsSync(join(packageDir, 'package.json'))) {
      const docsDir = join(packageDir, 'docs')
      const llmsPath = join(packageDir, 'llms.txt')
      return {
        found: true,
        version: readVersion(join(packageDir, 'package.json')),
        packageDir,
        docsDir: existsSync(docsDir) ? docsDir : null,
        llmsPath: existsSync(llmsPath) ? llmsPath : null,
      }
    }
    const parent = dirname(dir)
    if (parent === dir) return notFound
    dir = parent
  }
}

/**
 * To properly disambiguate competing MCP libraries within Primer, we check if the project depends on `@primer/react` (the product UI library) but not Primer Brand.
 * Used to gently steer agents that may have invoked the wrong design system's tools.
 */
export function looksLikeProductProject(fromDir: string = process.cwd()): boolean {
  if (resolveBrandInstall(fromDir).found) return false
  let dir = fromDir
  for (;;) {
    if (existsSync(join(dir, 'node_modules', '@primer', 'react', 'package.json'))) return true
    const parent = dirname(dir)
    if (parent === dir) return false
    dir = parent
  }
}

function readVersion(packageJsonPath: string): string | null {
  try {
    const parsed = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {version?: string}
    return parsed.version ?? null
  } catch {
    // Unreadable manifest -> treat the version as unknown rather than failing discovery.
    return null
  }
}
