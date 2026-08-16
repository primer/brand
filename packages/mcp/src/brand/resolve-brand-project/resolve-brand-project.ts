import {readdirSync, readFileSync, realpathSync} from 'node:fs'
import {isAbsolute, join, relative, resolve, sep} from 'node:path'

export type BrandProjectResolution = {
  projectDir: string | null
  candidates: string[]
  reason?: 'no-workspace-root' | 'brand-package-not-found' | 'ambiguous-brand-project' | 'invalid-brand-project'
}

/** Resolve the package folder whose package.json directly declares @primer/react-brand. */
export function resolveBrandProject(workspaceDir: string | null, requestedProjectDir?: string): BrandProjectResolution {
  const dependencyName = '@primer/react-brand'
  const ignoredDirectories = new Set([
    '.git',
    '.next',
    'build',
    'coverage',
    'dist',
    'node_modules',
    'out',
    'storybook-static',
  ])

  const declaresBrand = (directory: string): boolean => {
    try {
      const manifest = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8')) as Record<
        string,
        Record<string, string> | undefined
      >
      return ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].some(group =>
        Boolean(manifest[group]?.[dependencyName]),
      )
    } catch {
      return false
    }
  }

  if (!workspaceDir) return {projectDir: null, candidates: [], reason: 'no-workspace-root'}

  let canonicalWorkspaceDir: string
  try {
    canonicalWorkspaceDir = realpathSync(workspaceDir)
  } catch {
    return {projectDir: null, candidates: [], reason: 'no-workspace-root'}
  }

  const isWithinWorkspace = (candidate: string): boolean => {
    const relativeCandidate = relative(canonicalWorkspaceDir, candidate)
    return relativeCandidate !== '..' && !relativeCandidate.startsWith(`..${sep}`) && !isAbsolute(relativeCandidate)
  }

  if (requestedProjectDir) {
    if (isAbsolute(requestedProjectDir)) {
      return {projectDir: null, candidates: [], reason: 'invalid-brand-project'}
    }
    let canonicalCandidate: string
    try {
      canonicalCandidate = realpathSync(resolve(canonicalWorkspaceDir, requestedProjectDir))
    } catch {
      return {projectDir: null, candidates: [], reason: 'invalid-brand-project'}
    }
    return isWithinWorkspace(canonicalCandidate) && declaresBrand(canonicalCandidate)
      ? {projectDir: canonicalCandidate, candidates: [canonicalCandidate]}
      : {projectDir: null, candidates: [], reason: 'invalid-brand-project'}
  }

  const candidates: string[] = []
  const visit = (directory: string): void => {
    if (declaresBrand(directory)) candidates.push(directory)

    let entries
    try {
      entries = readdirSync(directory, {withFileTypes: true})
    } catch {
      return
    }
    for (const entry of entries) {
      if (!entry.isDirectory() || ignoredDirectories.has(entry.name)) continue
      visit(join(directory, entry.name))
    }
  }
  visit(canonicalWorkspaceDir)
  candidates.sort()

  if (candidates.length === 1) return {projectDir: candidates[0] ?? null, candidates}
  if (candidates.length > 1) return {projectDir: null, candidates, reason: 'ambiguous-brand-project'}
  return {projectDir: null, candidates, reason: 'brand-package-not-found'}
}
