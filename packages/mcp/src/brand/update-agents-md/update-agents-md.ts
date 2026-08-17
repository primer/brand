import {lstatSync, readFileSync, readdirSync, realpathSync, writeFileSync} from 'node:fs'
import {isAbsolute, join, relative, sep} from 'node:path'

export type AgentsMdUpdateResult = {
  action: 'created' | 'updated' | 'unchanged' | 'skipped'
  path: string | null
  reason?: 'no-project-root' | 'incorrect-filename-case' | 'malformed-managed-block' | 'unsafe-agents-path'
}

/** Create or update the managed Primer Brand instructions in a project's root AGENTS.md. */
export function updateAgentsMd(projectDir: string | null): AgentsMdUpdateResult {
  const filename = 'AGENTS.md'
  const startMarker = '<!-- BEGIN:primer-brand-mcp -->'
  const endMarker = '<!-- END:primer-brand-mcp -->'
  const block = `${startMarker}
## Primer Brand

When building brand-led marketing or landing pages with \`@primer/react-brand\`, use the available \`primer_brand_*\` MCP tools.

Prefer \`primer_brand_docs\` over fetching primer.style/brand directly. It reads version-matched documentation bundled with the installed package first and only falls back to the live site when necessary.

Start page work with \`primer_brand_page_design\` and \`primer_brand_examples\`. Use \`primer_brand_component\` for exact APIs and \`primer_brand_review\` before finishing.
${endMarker}`

  if (!projectDir) return {action: 'skipped', path: null, reason: 'no-project-root'}

  let canonicalProjectDir: string
  try {
    canonicalProjectDir = realpathSync(projectDir)
  } catch {
    return {action: 'skipped', path: null, reason: 'no-project-root'}
  }

  const agentMdCustomSetupPath = join(canonicalProjectDir, filename)
  const caseInsensitiveMatch = readdirSync(canonicalProjectDir).find(
    entry => entry.toLowerCase() === filename.toLowerCase(),
  )
  if (caseInsensitiveMatch && caseInsensitiveMatch !== filename) {
    return {action: 'skipped', path: agentMdCustomSetupPath, reason: 'incorrect-filename-case'}
  }

  const fileStats = lstatSync(agentMdCustomSetupPath, {throwIfNoEntry: false})
  if (fileStats?.isSymbolicLink()) {
    return {action: 'skipped', path: agentMdCustomSetupPath, reason: 'unsafe-agents-path'}
  }

  if (!fileStats) {
    writeFileSync(agentMdCustomSetupPath, `${block}\n`, 'utf8')
    return {action: 'created', path: agentMdCustomSetupPath}
  }

  let canonicalAgentsPath: string
  try {
    canonicalAgentsPath = realpathSync(agentMdCustomSetupPath)
  } catch {
    return {action: 'skipped', path: agentMdCustomSetupPath, reason: 'unsafe-agents-path'}
  }
  const relativeAgentsPath = relative(canonicalProjectDir, canonicalAgentsPath)
  if (relativeAgentsPath === '..' || relativeAgentsPath.startsWith(`..${sep}`) || isAbsolute(relativeAgentsPath)) {
    return {action: 'skipped', path: agentMdCustomSetupPath, reason: 'unsafe-agents-path'}
  }

  const existing = readFileSync(agentMdCustomSetupPath, 'utf8')
  const eol = existing.includes('\r\n') ? '\r\n' : '\n'
  const normalizedBlock = block.replaceAll('\n', eol)
  const startIndex = existing.indexOf(startMarker)
  const endIndex = existing.indexOf(endMarker)
  const hasStartMarker = startIndex !== -1
  const hasEndMarker = endIndex !== -1
  const hasDuplicateMarkers =
    startIndex !== existing.lastIndexOf(startMarker) || endIndex !== existing.lastIndexOf(endMarker)

  if (hasStartMarker !== hasEndMarker || hasDuplicateMarkers || (hasStartMarker && endIndex < startIndex)) {
    return {action: 'skipped', path: agentMdCustomSetupPath, reason: 'malformed-managed-block'}
  }

  let updated: string
  if (hasStartMarker) {
    updated = `${existing.slice(0, startIndex)}${normalizedBlock}${existing.slice(endIndex + endMarker.length)}`
  } else {
    const separator = existing.length === 0 || /\r?\n$/.test(existing) ? eol : `${eol}${eol}`
    updated = `${existing}${separator}${normalizedBlock}${eol}`
  }

  if (updated === existing) return {action: 'unchanged', path: agentMdCustomSetupPath}
  writeFileSync(agentMdCustomSetupPath, updated, 'utf8')
  return {action: 'updated', path: agentMdCustomSetupPath}
}
