import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'

import type {Logger} from '../logger.js'
import {type Catalog, emptyCatalog} from './types.js'

export function loadCatalog(logger: Logger): Catalog {
  // Output next to the compiled output (`dist/catalog.json`) by the build-time generator.
  const path = fileURLToPath(new URL('../catalog.json', import.meta.url))
  try {
    const parsed = JSON.parse(readFileSync(path, 'utf8')) as Catalog
    logger.debug(
      `loaded catalog (${parsed.components.length} components, generated from @primer/react-brand@${parsed.generatedFromVersion})`,
    )
    return parsed
  } catch (error) {
    logger.warn(`could not load catalog at ${path}: ${(error as Error).message}`)
    // If missing, it falls back to an empty catalog.
    return emptyCatalog()
  }
}
