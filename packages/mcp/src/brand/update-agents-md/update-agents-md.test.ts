import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {updateAgentsMd} from './update-agents-md.js'

describe('updateAgentsMd', () => {
  const directories: string[] = []
  const temporaryProject = () => {
    const directory = mkdtempSync(join(tmpdir(), 'primer-brand-agents-'))
    directories.push(directory)
    return directory
  }

  afterEach(() => {
    for (const directory of directories.splice(0)) rmSync(directory, {recursive: true, force: true})
  })

  it('creates AGENTS.md with a lightweight MCP and local-docs pointer', () => {
    const projectDir = temporaryProject()
    expect(updateAgentsMd(projectDir).action).toBe('created')

    const content = readFileSync(join(projectDir, 'AGENTS.md'), 'utf8')
    expect(content).toContain('<!-- BEGIN:primer-brand-mcp -->')
    expect(content).toContain('`primer_brand_docs`')
    expect(content).toContain('version-matched documentation bundled with the installed package')
    expect(content).toContain('Start page work with `primer_brand_page_design` and `primer_brand_examples`')
    expect(content).not.toContain('`primer_brand_setup`')
    expect(content).not.toContain('skill')
  })

  it('preserves existing content and appends the managed block', () => {
    const projectDir = temporaryProject()
    writeFileSync(join(projectDir, 'AGENTS.md'), '# Existing instructions\n\nKeep this.\n')

    expect(updateAgentsMd(projectDir).action).toBe('updated')
    const content = readFileSync(join(projectDir, 'AGENTS.md'), 'utf8')
    expect(content.startsWith('# Existing instructions\n\nKeep this.\n')).toBe(true)
    expect(content.match(/BEGIN:primer-brand-mcp/g)).toHaveLength(1)
  })

  it('updates only its managed block and is idempotent', () => {
    const projectDir = temporaryProject()
    const file = join(projectDir, 'AGENTS.md')
    writeFileSync(
      file,
      '# Existing\n\n<!-- BEGIN:primer-brand-mcp -->\nOld instructions\n<!-- END:primer-brand-mcp -->\n\n# End\n',
    )

    expect(updateAgentsMd(projectDir).action).toBe('updated')
    expect(updateAgentsMd(projectDir).action).toBe('unchanged')
    const content = readFileSync(file, 'utf8')
    expect(content).toContain('# Existing')
    expect(content).toContain('# End')
    expect(content).not.toContain('Old instructions')
    expect(content.match(/BEGIN:primer-brand-mcp/g)).toHaveLength(1)
  })

  it('preserves CRLF line endings', () => {
    const projectDir = temporaryProject()
    const file = join(projectDir, 'AGENTS.md')
    writeFileSync(file, '# Existing\r\n')

    updateAgentsMd(projectDir)
    const content = readFileSync(file, 'utf8')
    expect(content).toContain('\r\n<!-- BEGIN:primer-brand-mcp -->\r\n')
    expect(content.replaceAll('\r\n', '')).not.toContain('\n')
  })

  it('skips malformed blocks and incorrectly cased files', () => {
    const malformedDir = temporaryProject()
    writeFileSync(join(malformedDir, 'AGENTS.md'), '<!-- BEGIN:primer-brand-mcp -->\nDo not replace')
    expect(updateAgentsMd(malformedDir)).toMatchObject({action: 'skipped', reason: 'malformed-managed-block'})

    const wrongCaseDir = temporaryProject()
    writeFileSync(join(wrongCaseDir, 'agents.md'), '# Existing')
    expect(updateAgentsMd(wrongCaseDir)).toMatchObject({action: 'skipped', reason: 'incorrect-filename-case'})
  })

  it('skips when no project root is available', () => {
    expect(updateAgentsMd(null)).toEqual({action: 'skipped', path: null, reason: 'no-project-root'})
  })
})
