import {mkdirSync, mkdtempSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {detectFramework} from './detect-framework.js'

describe('detectFramework', () => {
  const projectWith = (deps: Record<string, string>, options: {appDir?: boolean} = {}): string => {
    const dir = mkdtempSync(join(tmpdir(), 'primer-brand-mcp-fw-'))
    writeFileSync(join(dir, 'package.json'), JSON.stringify({dependencies: deps}))
    if (options.appDir) mkdirSync(join(dir, 'app'))
    return dir
  }

  it('detects Vite', () => {
    expect(detectFramework(projectWith({vite: '^5', react: '^19'})).id).toBe('vite')
  })

  it('detects Next App Router when an app/ dir exists (and flags RSC)', () => {
    const framework = detectFramework(projectWith({next: '^15'}, {appDir: true}))
    expect(framework.id).toBe('next-app')
    expect(framework.rsc).toBe(true)
  })

  it('detects Next Pages Router without an app/ dir', () => {
    const framework = detectFramework(projectWith({next: '^15'}))
    expect(framework.id).toBe('next-pages')
    expect(framework.rsc).toBe(false)
  })

  it('detects Remix', () => {
    expect(detectFramework(projectWith({'@remix-run/react': '^2'})).id).toBe('remix')
  })

  it('detects Astro', () => {
    expect(detectFramework(projectWith({astro: '^5', react: '^19'})).id).toBe('astro')
  })

  it('detects Next App Router from a src/app directory', () => {
    const dir = projectWith({next: '^15'})
    mkdirSync(join(dir, 'src', 'app'), {recursive: true})
    expect(detectFramework(dir).id).toBe('next-app')
  })

  it('falls back to unknown when there is no project', () => {
    expect(detectFramework('/no/such/directory/anywhere').id).toBe('unknown')
  })
})
