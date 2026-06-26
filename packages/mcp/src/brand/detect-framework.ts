import {existsSync, readFileSync} from 'node:fs'
import {dirname, join, sep} from 'node:path'

export type FrameworkId = 'next-app' | 'next-pages' | 'vite' | 'astro' | 'remix' | 'unknown'

export interface FrameworkInfo {
  id: FrameworkId
  label: string
  /** Uses React Server Components, so providers need a `'use client'` boundary. */
  rsc: boolean
  projectDir: string | null
}

/** Nearest `package.json` above `fromDir` that isn't inside `node_modules`. */
function findProjectDir(fromDir: string): string | null {
  let dir = fromDir
  for (;;) {
    if (!dir.split(sep).includes('node_modules') && existsSync(join(dir, 'package.json'))) return dir
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

function readDependencies(projectDir: string): Record<string, string> {
  try {
    const parsed = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    return {...parsed.dependencies, ...parsed.devDependencies}
  } catch {
    return {}
  }
}

/**
 * Best-effort detection of the consumer's framework so setup guidance can be tailored
 * (where providers go, whether a `'use client'` boundary is required, which style import to use).
 */
export function detectFramework(fromDir: string = process.cwd()): FrameworkInfo {
  const projectDir = findProjectDir(fromDir)
  if (!projectDir) return {id: 'unknown', label: 'a React project', rsc: false, projectDir: null}

  const deps = readDependencies(projectDir)
  if (deps.next) {
    const appRouter = existsSync(join(projectDir, 'app')) || existsSync(join(projectDir, 'src', 'app'))
    return appRouter
      ? {id: 'next-app', label: 'Next.js (App Router)', rsc: true, projectDir}
      : {id: 'next-pages', label: 'Next.js (Pages Router)', rsc: false, projectDir}
  }
  if (deps['@remix-run/react'] || deps['@remix-run/node']) {
    return {id: 'remix', label: 'Remix', rsc: false, projectDir}
  }
  if (deps.astro) return {id: 'astro', label: 'Astro', rsc: false, projectDir}
  if (deps.vite) return {id: 'vite', label: 'Vite + React', rsc: false, projectDir}
  return {id: 'unknown', label: 'a React project', rsc: false, projectDir}
}
