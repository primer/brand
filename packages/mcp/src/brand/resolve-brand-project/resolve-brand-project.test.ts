import {mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

import {resolveBrandProject} from './resolve-brand-project.js'

describe('resolveBrandProject', () => {
  const directories: string[] = []
  const temporaryWorkspace = () => {
    const directory = realpathSync(mkdtempSync(join(tmpdir(), 'primer-brand-project-')))
    directories.push(directory)
    return directory
  }
  const writePackage = (directory: string, dependencies: Record<string, string> = {}) => {
    mkdirSync(directory, {recursive: true})
    writeFileSync(join(directory, 'package.json'), JSON.stringify({dependencies}))
  }

  afterEach(() => {
    for (const directory of directories.splice(0)) rmSync(directory, {recursive: true, force: true})
  })

  it('finds the only nested package declaring Primer Brand', () => {
    const workspace = temporaryWorkspace()
    writePackage(workspace, {react: '^19.0.0'})
    writePackage(join(workspace, 'apps', 'site'), {'@primer/react-brand': '^0.73.0'})
    writePackage(join(workspace, 'apps', 'api'), {express: '^5.0.0'})

    expect(resolveBrandProject(workspace)).toEqual({
      projectDir: join(workspace, 'apps', 'site'),
      candidates: [join(workspace, 'apps', 'site')],
    })
  })

  it('reports ambiguity when several packages declare Primer Brand', () => {
    const workspace = temporaryWorkspace()
    writePackage(join(workspace, 'apps', 'docs'), {'@primer/react-brand': '^0.73.0'})
    writePackage(join(workspace, 'apps', 'site'), {'@primer/react-brand': '^0.73.0'})

    expect(resolveBrandProject(workspace)).toMatchObject({
      projectDir: null,
      reason: 'ambiguous-brand-project',
      candidates: [join(workspace, 'apps', 'docs'), join(workspace, 'apps', 'site')],
    })
  })

  it('uses an explicitly requested declaring package', () => {
    const workspace = temporaryWorkspace()
    writePackage(join(workspace, 'apps', 'docs'), {'@primer/react-brand': '^0.73.0'})
    writePackage(join(workspace, 'apps', 'site'), {'@primer/react-brand': '^0.73.0'})

    expect(resolveBrandProject(workspace, 'apps/site')).toEqual({
      projectDir: join(workspace, 'apps', 'site'),
      candidates: [join(workspace, 'apps', 'site')],
    })
  })

  it('rejects requested folders outside the workspace or without the dependency', () => {
    const workspace = temporaryWorkspace()
    writePackage(join(workspace, 'apps', 'site'), {react: '^19.0.0'})

    expect(resolveBrandProject(workspace, 'apps/site').reason).toBe('invalid-brand-project')
    expect(resolveBrandProject(workspace, '..').reason).toBe('invalid-brand-project')
    expect(resolveBrandProject(workspace, join(workspace, 'apps', 'site')).reason).toBe('invalid-brand-project')
  })

  it('rejects a requested package symlink that resolves outside the workspace', () => {
    const workspace = temporaryWorkspace()
    const externalPackage = temporaryWorkspace()
    writePackage(externalPackage, {'@primer/react-brand': '^0.73.0'})
    mkdirSync(join(workspace, 'apps'), {recursive: true})
    symlinkSync(externalPackage, join(workspace, 'apps', 'site'), 'dir')

    expect(resolveBrandProject(workspace, 'apps/site')).toMatchObject({
      projectDir: null,
      reason: 'invalid-brand-project',
    })
  })

  it('reports when no declaring package or workspace root is available', () => {
    const workspace = temporaryWorkspace()
    writePackage(workspace, {react: '^19.0.0'})

    expect(resolveBrandProject(workspace).reason).toBe('brand-package-not-found')
    expect(resolveBrandProject(null).reason).toBe('no-workspace-root')
  })
})
