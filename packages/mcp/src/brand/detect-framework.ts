import {existsSync, readFileSync} from 'node:fs'
import {dirname, join, sep} from 'node:path'

export type FrameworkId = 'next-app' | 'next-pages' | 'vite' | 'astro' | 'remix' | 'unknown'

export type FrameworkInfo = {
  id: FrameworkId
  label: string
  /** Uses React Server Components, so providers need a `'use client'` boundary. */
  rsc: boolean
  projectDir: string | null
}

/**
 * A best-effort detection of the consumer's UI framework so setup guidance can be tailored
 */
export function detectFramework(fromDir: string = process.cwd()): FrameworkInfo {
  // Walk up from `fromDir` to the nearest package.json, ignoring any inside node_modules.
  let projectDir: string | null = null
  for (let dir = fromDir; ; ) {
    if (!dir.split(sep).includes('node_modules') && existsSync(join(dir, 'package.json'))) {
      projectDir = dir
      break
    }
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  if (!projectDir) return {id: 'unknown', label: 'a React project', rsc: false, projectDir: null}

  // Merge direct + dev dependencies; an unreadable or invalid package.json yields no deps.
  let deps: Record<string, string> = {}
  try {
    const parsed = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    deps = {...parsed.dependencies, ...parsed.devDependencies}
  } catch {
    // ignore — treat as no deps
  }

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
