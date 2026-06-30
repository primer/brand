import {existsSync, readdirSync, readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

import type {CatalogAsset} from '../catalog/types.js'

type AssetPackage = {
  module: string
  kind: 'icon' | 'illustration'
}

const iconPackages: AssetPackage[] = [
  {module: '@primer/octicons-react', kind: 'icon'},
  {module: '@primer/octovisuals-react', kind: 'illustration'},
]

export type InstalledAssets = {
  assets: CatalogAsset[]
  sources: Array<{module: string; version: string | null}>
}

/**
 * Resolves the icon/illustration packages installed in the consumer's project and extract their
 * exported names. This makes `primer_brand_asset` version-accurate.
 */
export function resolveInstalledAssets(fromDir: string = process.cwd()): InstalledAssets {
  /** Walk up from `fromDir` to find an installed package directory. */
  const findPackageDir = (packageName: string): string | null => {
    let dir = fromDir
    for (;;) {
      const candidate = join(dir, 'node_modules', ...packageName.split('/'))
      if (existsSync(join(candidate, 'package.json'))) return candidate
      const parent = dirname(dir)
      if (parent === dir) return null
      dir = parent
    }
  }

  const readVersion = (packageDir: string): string | null => {
    try {
      return (JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8')) as {version?: string}).version ?? null
    } catch {
      return null
    }
  }

  /** Collects exported PascalCase const names from a package's `.d.ts` type declarations. */
  const exportedNames = (packageDir: string): string[] => {
    const names = new Set<string>()
    for (const subDir of ['dist', 'lib', '.']) {
      let entries: string[]
      try {
        entries = readdirSync(join(packageDir, subDir))
      } catch {
        continue
      }
      for (const entry of entries) {
        if (!entry.endsWith('.d.ts')) continue
        let source: string
        try {
          source = readFileSync(join(packageDir, subDir, entry), 'utf8')
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

  const keepName = (name: string, kind: AssetPackage['kind']): boolean =>
    kind === 'icon' ? name.endsWith('Icon') : /^[A-Z]/.test(name) && !/(Props|Type|Metadata)$/.test(name)

  const assets: CatalogAsset[] = []
  const sources: Array<{module: string; version: string | null}> = []
  for (const {module, kind} of iconPackages) {
    const packageDir = findPackageDir(module)
    if (!packageDir) continue
    const names = exportedNames(packageDir).filter(name => keepName(name, kind))
    if (names.length === 0) continue
    sources.push({module, version: readVersion(packageDir)})
    for (const name of names) assets.push({name, module, kind})
  }
  return {assets, sources}
}
