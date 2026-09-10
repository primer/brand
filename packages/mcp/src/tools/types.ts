import type {ZodRawShape} from 'zod'

import type {BrandInstall} from '../brand/resolve-install/resolve-install.js'
import type {FrameworkInfo} from '../brand/detect-framework/detect-framework.js'
import type {DocsSource} from '../brand/docs-source/docs-source.js'
import type {Catalog, CatalogAsset} from '../catalog/types.js'
import type {Logger} from '../logger.js'

/** Dependencies shared by every tool, assembled once when the server starts. */
export type ToolContext = {
  catalog: Catalog
  brand: BrandInstall
  /** Directory where the MCP server was started; bounds workspace-scoped file discovery. */
  workspaceDir: string | null
  framework: FrameworkInfo
  docs: DocsSource
  logger: Logger
  /** Icons + illustrations, preferring the consumer's installed packages over the baked snapshot. */
  assets: CatalogAsset[]
  assetsOrigin: 'installed' | 'snapshot'
  assetGenerator: {available: boolean}
}

export type ToolResult = {
  text: string
  isError?: boolean
}

export type ToolAnnotations = {
  readOnlyHint?: boolean
  destructiveHint?: boolean
  idempotentHint?: boolean
  openWorldHint?: boolean
}

export type ToolModule<Input = unknown> = {
  name: string
  title: string
  /**
   * This is discovery metadata shown before tool invocation.
   * Should describe when and why to call the tool, its scope,
   * adjacent tools, and important limitations. Put the actual guidance,
   * rules and implementation detail in the tool output, not here.
   */
  description: string
  inputShape: ZodRawShape
  annotations: ToolAnnotations
  run(input: Input, ctx: ToolContext): Promise<ToolResult> | ToolResult
}
