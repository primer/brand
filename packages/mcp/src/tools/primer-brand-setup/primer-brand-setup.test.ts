import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {makeContext} from '../../test-utils/catalog.js'
import {primerBrandSetupTool} from './primer-brand-setup.js'

describe('primer_brand_setup', () => {
  it('discloses its AGENTS.md side effect without managed-block implementation detail', () => {
    expect(primerBrandSetupTool.description).toContain('package that declares `@primer/react-brand`')
    expect(primerBrandSetupTool.description).toContain('Primer Brand tools and local docs')
    expect(primerBrandSetupTool.description).not.toContain('managed')
  })

  it('uses the ESM import path + fonts for Vite, with no use-client boundary or lib css import', async () => {
    const result = await primerBrandSetupTool.run({framework: 'vite'}, makeContext())
    expect(result.text).toContain("from '@primer/react-brand/esm'")
    expect(result.text).toContain('@primer/react-brand/fonts/fonts.css')
    expect(result.text).toContain('main.tsx')
    expect(result.text).not.toContain("'use client'")
    expect(result.text).not.toContain("from '@primer/react-brand/lib")
  })

  it('includes a use-client boundary and RSC note for Next App Router', async () => {
    const result = await primerBrandSetupTool.run({framework: 'next-app'}, makeContext())
    expect(result.text).toContain("'use client'")
    expect(result.text).toContain('app/layout.tsx')
    expect(result.text).toContain('RSC boundary')
  })

  it('returns Pages Router setup without a use-client boundary', async () => {
    const result = await primerBrandSetupTool.run({framework: 'next-pages'}, makeContext())
    expect(result.text).toContain('pages/_app.tsx')
    expect(result.text).not.toContain("'use client'")
  })

  it('returns Remix and Astro setups', async () => {
    expect((await primerBrandSetupTool.run({framework: 'remix'}, makeContext())).text).toContain('app/root.tsx')
    expect((await primerBrandSetupTool.run({framework: 'astro'}, makeContext())).text).toContain('client:load')
  })

  it('warns against double-loading styles and notes the colorMode option', async () => {
    const result = await primerBrandSetupTool.run({framework: 'vite'}, makeContext())
    expect(result.text).toContain('main.css')
    expect(result.text).toContain('colorMode')
  })

  it('falls back to a generic root snippet + tool pointers when the framework is unknown', async () => {
    const result = await primerBrandSetupTool.run({framework: 'auto'}, makeContext())
    expect(result.text).toContain('Wrap the very root')
    expect(result.text).toContain('primer_brand_review')
  })

  it('creates managed agent instructions and reports subsequent calls as unchanged', async () => {
    const projectDir = mkdtempSync(join(tmpdir(), 'primer-brand-setup-'))
    writeFileSync(
      join(projectDir, 'package.json'),
      JSON.stringify({dependencies: {vite: '^7.0.0', '@primer/react-brand': '^0.73.0'}}),
    )
    const context = makeContext({
      workspaceDir: projectDir,
      framework: {id: 'vite', label: 'Vite + React', rsc: false, projectDir},
    })

    try {
      const created = await primerBrandSetupTool.run({framework: 'auto'}, context)
      expect(created.text).toContain('## 7. Add/update AGENTS.md pointer')
      expect(created.text).toContain('Created `AGENTS.md` beside the selected package.json')
      expect(created.text).toContain('src/main.tsx')
      expect(readFileSync(join(projectDir, 'AGENTS.md'), 'utf8')).toContain('`primer_brand_docs`')

      const unchanged = await primerBrandSetupTool.run({framework: 'auto'}, context)
      expect(unchanged.text).toContain('already has the current managed Primer Brand instructions')
    } finally {
      rmSync(projectDir, {recursive: true, force: true})
    }
  })

  it('requires projectDir when several workspace packages declare Primer Brand', async () => {
    const workspaceDir = mkdtempSync(join(tmpdir(), 'primer-brand-monorepo-'))
    const docsDir = join(workspaceDir, 'apps', 'docs')
    const siteDir = join(workspaceDir, 'apps', 'site')
    for (const projectDir of [docsDir, siteDir]) {
      mkdirSync(projectDir, {recursive: true})
      writeFileSync(
        join(projectDir, 'package.json'),
        JSON.stringify({dependencies: {'@primer/react-brand': '^0.73.0'}}),
      )
    }
    const context = makeContext({
      workspaceDir,
      framework: {id: 'unknown', label: 'a React project', rsc: false, projectDir: workspaceDir},
    })

    try {
      const ambiguous = await primerBrandSetupTool.run({framework: 'auto'}, context)
      expect(ambiguous.text).toContain('multiple package.json files declare `@primer/react-brand`')
      expect(ambiguous.text).toContain('`projectDir`')
      expect(existsSync(join(docsDir, 'AGENTS.md'))).toBe(false)
      expect(existsSync(join(siteDir, 'AGENTS.md'))).toBe(false)

      const selected = await primerBrandSetupTool.run({framework: 'auto', projectDir: 'apps/site'}, context)
      expect(selected.text).toContain('Created `AGENTS.md` beside the selected package.json')
      expect(existsSync(join(siteDir, 'AGENTS.md'))).toBe(true)
      expect(existsSync(join(docsDir, 'AGENTS.md'))).toBe(false)
    } finally {
      rmSync(workspaceDir, {recursive: true, force: true})
    }
  })

  it('declares its managed workspace update as non-destructive and idempotent', () => {
    expect(primerBrandSetupTool.annotations).toEqual({
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    })
  })
})
