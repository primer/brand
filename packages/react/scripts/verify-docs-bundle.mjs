#!/usr/bin/env node
/**
 * This checks that the docs are correctly bundled in the package, and fall under size limits.
 * Runs in CI, but can be run locally too using npm run bundle:docs:verify
 */
import {execFileSync} from 'node:child_process'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Adds some headroom, but we generally don't want this too high as the package is vendored.
const maxBundleSize = 2048

const packOutput = execFileSync('npm', ['pack', '--dry-run', '--json'], {cwd: packageRoot, encoding: 'utf8'})

const report = JSON.parse(packOutput.slice(packOutput.indexOf('[')))[0]
const files = report.files || []
const paths = files.map(file => file.path)

const problems = []

for (const required of ['llms.txt', 'docs/index.md']) {
  if (!paths.includes(required)) problems.push(`Error: some files are missing: ${required}`)
}

const docPaths = paths.filter(path => path.startsWith('docs/'))
const minimumFiles = 50 // this should be a reasonable floor. Keep it below the total pages.
if (docPaths.length < minimumFiles) {
  problems.push(`Error: expected the full docs/ tree, found only ${docPaths.length} file(s)`)
}

const bundleKb = Math.round(
  files
    .filter(file => file.path === 'llms.txt' || file.path.startsWith('docs/'))
    .reduce((total, file) => total + (file.size || 0), 0) / 1024,
)
if (bundleKb > maxBundleSize) {
  problems.push(`docs bundle is ${bundleKb}KB, over the ${maxBundleSize}KB budget`)
}

if (problems.length) {
  process.stderr.write(`Error: docs bundle verification failed:\n- ${problems.join('\n- ')}\n`)
  process.exit(1)
}

process.stderr.write(`Success: docs bundle is OK: ${docPaths.length} files in docs/  + llms.txt, ${bundleKb}KB\n`)
