import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'

import {createDocsSource} from './brand/docs-source.js'
import {resolveInstalledAssets} from './brand/resolve-assets.js'
import {looksLikeProductProject, resolveBrandInstall} from './brand/resolve-install.js'
import {loadCatalog} from './catalog/load.js'
import {createLogger} from './logger.js'
import {registerTools} from './tools/register.js'

const INSTRUCTIONS = `Primer Brand design system tools for building GitHub web-based marketing experiences and landing pages with @primer/react-brand.

Use these tools whenever a project builds marketing/landing pages, or depends on the @primer/react-brand design system.
This is NOT @primer/react (GitHub's product UI library); if you are building application/product UI,
use the Primer (product) tools instead.

Typical flow: primer_brand_setup once at the start of a new page or project, primer_brand_examples to start
from correct patterns, primer_brand_component for exact props, primer_brand_tokens / primer_brand_asset for tokens and
icons, primer_brand_docs for guidance, and primer_brand_review as the final gate over your complete output (JSX and
CSS together) before you finish.`

export function createServer(): McpServer {
  const logger = createLogger()

  let version = '0.0.0'
  try {
    const packagePath = fileURLToPath(new URL('../package.json', import.meta.url))
    version = (JSON.parse(readFileSync(packagePath, 'utf8')) as {version?: string}).version ?? version
  } catch {
    // No package.json next to the bundle at runtime — fall back to the default version.
  }
  const server = new McpServer({name: 'Primer Brand', version}, {instructions: INSTRUCTIONS})

  const catalog = loadCatalog(logger)
  const brand = resolveBrandInstall()
  if (brand.found) {
    logger.info(`using @primer/react-brand@${brand.version ?? 'unknown'} from ${brand.packageDir}`)
  } else if (looksLikeProductProject()) {
    logger.warn('project depends on @primer/react (product UI), not @primer/react-brand; tools describe Primer Brand')
  } else {
    logger.info('no installed @primer/react-brand found; using the bundled snapshot')
  }

  const installedAssets = resolveInstalledAssets()
  const assetsOrigin = installedAssets.assets.length > 0 ? 'installed' : 'snapshot'
  const assets = installedAssets.assets.length > 0 ? installedAssets.assets : catalog.assets
  if (assetsOrigin === 'installed') {
    const versions = installedAssets.sources.map(source => `${source.module}@${source.version ?? '?'}`).join(', ')
    logger.info(`resolved icons/illustrations from installed packages: ${versions}`)
  }

  const docs = createDocsSource(brand, logger)
  registerTools(server, {catalog, brand, docs, logger, assets, assetsOrigin})
  return server
}
