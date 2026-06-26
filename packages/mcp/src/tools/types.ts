import type {ZodRawShape} from 'zod'

import type {BrandInstall} from '../brand/resolve-install.js'
import type {DocsSource} from '../brand/docs-source.js'
import type {Catalog, CatalogAsset} from '../catalog/types.js'
import type {Logger} from '../logger.js'

/** Dependencies shared by every tool, assembled once when the server starts. */
export interface ToolContext {
  catalog: Catalog
  brand: BrandInstall
  docs: DocsSource
  logger: Logger
  /** Icons + illustrations, preferring the consumer's installed packages over the baked snapshot. */
  assets: CatalogAsset[]
  assetsOrigin: 'installed' | 'snapshot'
}

export interface ToolResult {
  text: string
  isError?: boolean
}

export interface ToolAnnotations {
  readOnlyHint?: boolean
}

/**
 * A self-contained tool. `run` holds the testable logic and is independent of the MCP
 * transport; the server wires it up via `registerTool`.
 */
export interface ToolModule<Input = unknown> {
  name: string
  title: string
  description: string
  inputShape: ZodRawShape
  annotations: ToolAnnotations
  run(input: Input, ctx: ToolContext): Promise<ToolResult> | ToolResult
}
