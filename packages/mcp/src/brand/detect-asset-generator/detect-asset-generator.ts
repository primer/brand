import {existsSync} from 'node:fs'
import {delimiter, join} from 'node:path'

const BIN_NAME = 'asset-generator-mcp'

/**
 * Returns true when the `asset-generator-mcp` CLI is resolvable on PATH
 */
export function detectAssetGenerator(env: NodeJS.ProcessEnv = process.env): {
  available: boolean
} {
  const pathValue = env.PATH ?? env.Path ?? ''
  if (!pathValue) return {available: false}

  const windowsExtensions = (env.PATHEXT ?? '').split(';').filter(Boolean)
  const candidates = [BIN_NAME, ...windowsExtensions.map(extension => `${BIN_NAME}${extension.toLowerCase()}`)]

  for (const directory of pathValue.split(delimiter)) {
    if (!directory) continue
    if (candidates.some(name => existsSync(join(directory, name)))) return {available: true}
  }
  return {available: false}
}
