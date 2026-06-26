import {existsSync, readdirSync, readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

import type {CatalogAsset} from '../catalog/types.js'

interface AssetPackage {
  module: string
  kind: 'icon' | 'illustration'
}

const ASSET_PACKAGES: AssetPackage[] = [
  {module: '@primer/octicons-react', kind: 'icon'},
  {module: '@primer/octovisuals-react', kind: 'illustration'},
]

export interface InstalledAssets {
  assets: CatalogAsset[]
  sources: Array<{module: string; version: string | null}>
}

/** Walk up from `fromDir` to find an installed package directory. */
function findPackageDir(packageName: string, fromDir: string): string | null {
  let dir = fromDir
  for (;;) {
    const candidate = join(dir, 'node_modules', ...packageName.split('/'))
    if (existsSync(join(candidate, 'package.json'))) return candidate
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

function readVersion(packageDir: string): string | null {
  try {
    return (JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as {version?: string}).version ?? null
  } catch {
    return null
  }
}

/**
 * Collect exported PascalCase const names from a package's `.d.ts` type declarations. Octicons
 * declare their icons as `declare const AlertIcon: Icon` in a sibling file, so all `.d.ts` files
 * in the package's output directory are scanned, not just `index.d.ts`.
 */
function exportedNames(packageDir: string): string[] {
  const names = new Set<string>()
  for (const sub of ['dist', 'lib', '.']) {
    let entries: string[]
    try {
      entries = readdirSync(join(packageDir, sub))
    } catch {
      continue
    }
    for (const entry of entries) {
      if (!entry.endsWith('.d.ts')) continue
      let source: string
      try {
        source = readFileSync(join(packageDir, sub, entry), 'utf8')
      } catch {
        continue
      }
      for (const match of source.matchAll(/(?:export\s+)?declare\s+const\s+([A-Z]\w+)/g)) {
        if (match[1]) names.add(match[1])
      }
      for (const match of source.matchAll(/export\s+const\s+([A-Z]\w+)/g)) {
        if (match[1]) names.add(match[1])
      }
      for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
        for (const part of (match[1] ?? '').split(',')) {
          const ident = part
            .trim()
            .split(/\s+as\s+/)
            .pop()
            ?.trim()
          if (ident && /^[A-Z]\w+$/.test(ident)) names.add(ident)
        }
      }
    }
  }
  return [...names]
}

function keepName(name: string, kind: AssetPackage['kind']): boolean {
  // Octovisuals components are also named `...Icon`, so they are kept by package, not suffix.
  return kind === 'icon' ? name.endsWith('Icon') : /^[A-Z]/.test(name) && !/(Props|Type|Metadata)$/.test(name)
}

/**
 * Resolve the icon/illustration packages installed in the consumer's project and extract their
 * exported names. This makes `primer_brand_asset` version-accurate: it reflects the Octicons/Octovisuals
 * the project actually has, rather than the snapshot baked into the catalog at build time.
 */
export function resolveInstalledAssets(fromDir: string = process.cwd()): InstalledAssets {
  const assets: CatalogAsset[] = []
  const sources: Array<{module: string; version: string | null}> = []
  for (const {module, kind} of ASSET_PACKAGES) {
    const packageDir = findPackageDir(module, fromDir)
    if (!packageDir) continue
    const names = exportedNames(packageDir).filter(name => keepName(name, kind))
    if (names.length === 0) continue
    sources.push({module, version: readVersion(packageDir)})
    for (const name of names) assets.push({name, module, kind})
  }
  return {assets, sources}
}
