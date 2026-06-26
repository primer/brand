#!/usr/bin/env node
/**
 * Builds `dist/catalog.json` from other workspace packages react source, Storybook stories, next-docs
 * pages, installed icon packages, and built design tokens.
 */
import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(scriptDir, '..')
const repoRoot = resolve(packageRoot, '..', '..')
const reactSrc = resolve(repoRoot, 'packages', 'react', 'src')
const docsContentRoot = resolve(repoRoot, 'apps', 'next-docs', 'content')
const nodeModules = resolve(repoRoot, 'node_modules')
const outFile = resolve(packageRoot, 'dist', 'catalog.json')

const writeStderrLog = message => process.stderr.write(`[generate-catalog] ${message}\n`)

const readFileOrNull = path => {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return null
  }
}

/** Capture a balanced `{...}` or `(...)` region starting at the opening delimiter index. */
function captureBalanced(source, openIndex, open, close) {
  let depth = 0
  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index]
    if (char === open) depth += 1
    else if (char === close) {
      depth -= 1
      if (depth === 0) return source.slice(openIndex, index + 1)
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

// Public components via the barrel and the sub-barrels it re-exports; mirrors the real surface
// (incl. nested `river/River`, `forms/Checkbox`) and skips internal `recipes/`.
function discoverComponentFiles() {
  const found = []
  const seen = new Set()

  const findComponentFile = (relativeDirectory, name) => {
    const nestedPath = join(reactSrc, relativeDirectory, name, `${name}.tsx`)
    if (existsSync(nestedPath)) return {name, dir: join(relativeDirectory, name), file: nestedPath}
    const flatPath = join(reactSrc, relativeDirectory, `${name}.tsx`)
    if (existsSync(flatPath)) return {name, dir: relativeDirectory, file: flatPath}
    return null
  }

  const scanBarrel = relativeDirectory => {
    const barrel = readFileOrNull(join(reactSrc, relativeDirectory, 'index.ts'))
    if (!barrel) return
    for (const match of barrel.matchAll(/export \* from ['"]\.\/([\w/-]+)['"]/g)) {
      const exportPath = match[1]
      const baseName = exportPath.split('/').pop()
      if (/^[A-Z]/.test(baseName)) {
        const component = findComponentFile(relativeDirectory, exportPath)
        if (component && !seen.has(component.name)) {
          seen.add(component.name)
          found.push(component)
        }
      } else if (existsSync(join(reactSrc, relativeDirectory, exportPath, 'index.ts'))) {
        scanBarrel(join(relativeDirectory, exportPath))
      }
    }
  }

  scanBarrel('')
  if (found.length === 0) writeStderrLog(`no components discovered under ${reactSrc}`)
  return found
}

/** Sub-components from `Object.assign(Root, {Heading: ...})` and `Name.Sub = ...` assignments. */
function extractSubcomponents(name, source) {
  const subcomponents = new Set()
  for (const match of source.matchAll(/Object\.assign\(/g)) {
    const openBraceIndex = source.indexOf('{', match.index)
    if (openBraceIndex === -1) continue
    const assignedObject = captureBalanced(source, openBraceIndex, '{', '}')
    if (!assignedObject) continue
    // Capture both `Heading: ...` and shorthand `Visual` keys (the latter is a property whose key
    // is its value, e.g. `Object.assign(Root, {Visual, Content: RiverContent})`).
    for (const propertyKey of assignedObject.matchAll(/(?:^|[{,])\s*([A-Za-z_$][\w$]*)\s*(?=[:,}])/g))
      subcomponents.add(`${name}.${propertyKey[1]}`)
  }
  for (const match of source.matchAll(new RegExp(`\\b${name}\\.(\\w+)\\s*=`, 'g'))) {
    subcomponents.add(`${name}.${match[1]}`)
  }
  return [...subcomponents]
}

/** True only for a pure string-literal union like `'a' | 'b'` — not generics, indexing, or brackets. */
function isClosedStringUnion(type) {
  return /^'[^']*'(\s*\|\s*'[^']*')*$/.test(type.trim())
}

/** `const X = ['a', 'b'] as const` arrays in a source, keyed by name — only PURE string-literal
 * arrays, since a stray identifier would yield a partial enum that wrongly rejects valid values. */
function collectConstArrays(source) {
  const arrays = new Map()
  for (const match of source.matchAll(/(?:export\s+)?const\s+(\w+)\s*=\s*\[([^\]]*)\]\s*as\s+const/g)) {
    const arrayContents = match[2]
    const values = [...arrayContents.matchAll(/'([^']+)'|"([^"]+)"/g)].map(entry => entry[1] ?? entry[2])
    const leftover = arrayContents.replace(/'[^']*'|"[^"]*"/g, '').replace(/[\s,]/g, '')
    if (values.length > 0 && leftover === '') arrays.set(match[1], values)
  }
  return arrays
}

/** Parse the members of a props object literal, attaching each prop's preceding JSDoc as its description. */
function parsePropsBlock(block, arrays) {
  const props = []
  let depth = 0
  let pendingDoc = []
  const takePendingDescription = () => {
    const text = pendingDoc.join(' ').replace(/\s+/g, ' ').trim()
    pendingDoc = []
    if (text.length === 0) return undefined
    return text.length > 240 ? `${text.slice(0, 240).replace(/\s+\S*$/, '')}…` : text
  }
  for (const rawLine of block.slice(1, -1).split('\n')) {
    const line = rawLine.trim()
    if (line === '') {
      pendingDoc = []
      continue
    }
    // A JSDoc/comment immediately above a prop becomes that prop's description.
    if (line.startsWith('/*') || line.startsWith('*') || line.startsWith('//')) {
      const text = line
        .replace(/^\/\*\*?/, '')
        .replace(/\*\/$/, '')
        .replace(/^\*\s?/, '')
        .replace(/^\/\/\s?/, '')
        .trim()
      if (text && !text.startsWith('@')) pendingDoc.push(text)
      continue
    }
    const braceDepthDelta = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length
    if (depth > 0) {
      depth += braceDepthDelta
      continue
    }
    const match = /^'?([A-Za-z][\w-]*)'?(\??):\s*(.+?);?\s*$/.exec(line)
    if (match) {
      const [, propName, optional, rawType] = match
      let type = rawType.trim()
      const opensObject = type === '{' || type.endsWith('{')
      const description = takePendingDescription()
      if (propName !== 'data-testid' && !type.includes('=>')) {
        if (opensObject) type = 'object'
        // Allowed values for a CLOSED string-literal union, else a `(typeof X)[number]` indexed const
        // array. A wrong/partial enum would make primer_brand_review reject valid values, so otherwise omit.
        const arrayMatch = /^\(?\s*typeof\s+(\w+)\s*\)?\[number\]$/.exec(type) ?? /^(\w+)\[number\]$/.exec(type)
        const enumValues = isClosedStringUnion(type)
          ? [...type.matchAll(/'([^']+)'/g)].map(value => value[1])
          : arrayMatch && arrays.get(arrayMatch[1])
        props.push({
          name: propName,
          type,
          ...(enumValues && enumValues.length > 0 ? {enum: enumValues} : {}),
          ...(description ? {description} : {}),
          required: optional !== '?',
        })
      }
    } else {
      pendingDoc = []
    }
    depth += braceDepthDelta
  }
  return props
}

// Props from the exported props type alias (suffix varies). A reference alias or discriminated
// union has no object literal, so it yields no props rather than scraping a later unrelated block.
function extractProps(name, source) {
  const arrays = collectConstArrays(source)
  for (const typeAliasName of [`type ${name}Props`, `type ${name}RootProps`, `type ${name}BaseProps`]) {
    const aliasOffset = source.indexOf(typeAliasName)
    if (aliasOffset === -1) continue
    const open = source.indexOf('{', aliasOffset)
    const nextDeclarationOffset = source
      .slice(aliasOffset)
      .search(/\n\s*(export|const|let|var|function|interface|enum)\b/)
    const declarationEnd = nextDeclarationOffset === -1 ? source.length : aliasOffset + nextDeclarationOffset
    if (open === -1 || open > declarationEnd) continue
    const block = captureBalanced(source, open, '{', '}')
    if (block) return parsePropsBlock(block, arrays)
  }
  return []
}

const EXAMPLE_NOISE = [
  /\bstyles\./g,
  /\buse(?:State|Effect|Ref|Callback|Transition|Memo)\b/g,
  /className=/g,
  /\bdecorators\b/g,
  /lorem ipsum/gi,
]

/**
 * Mirror primer_brand_review's two error-level rules (unknown sub-component, invalid enum value) so a
 * surfaced example can never contradict the catalog it ships inside.
 */
function exampleContradictsCatalog(code, byName) {
  for (const match of code.matchAll(/<([A-Z][A-Za-z0-9]*)\.([A-Z][A-Za-z0-9]*)/g)) {
    const component = byName.get(match[1])
    if (component && !component.subcomponents.includes(`${match[1]}.${match[2]}`)) return true
  }
  for (const component of byName.values()) {
    const enumProps = component.props.filter(prop => Array.isArray(prop.enum) && prop.enum.length > 0)
    if (enumProps.length === 0) continue
    for (const usage of code.matchAll(new RegExp(`<${component.name}\\b[^>]*>`, 'g'))) {
      for (const prop of enumProps) {
        for (const attributeMatch of usage[0].matchAll(new RegExp(`\\b${prop.name}=["']([^"']+)["']`, 'g'))) {
          if (!prop.enum.includes(attributeMatch[1])) return true
        }
      }
    }
  }
  return false
}

// The single best tested story example for a component, or undefined. Each matching story file's
// `export const`/`export function` regions yield balanced `=> (…)`/`return (…)` JSX, scored so
// sub-composition helps and Storybook plumbing/length hurt.
function bestStoryExample(directory, name, byName) {
  // Story files whose basename matches the component; examples before features.
  const storyFiles = () => {
    const storyDir = join(reactSrc, directory)
    let entries
    try {
      entries = readdirSync(storyDir)
    } catch {
      return []
    }
    const lowerName = name.toLowerCase()
    const filesWithSuffix = suffix =>
      entries
        .filter(entry => entry.toLowerCase() === `${lowerName}.${suffix}.stories.tsx`)
        .map(entry => join(storyDir, entry))
    return [...filesWithSuffix('examples'), ...filesWithSuffix('features')]
  }

  // Balanced JSX from each top-level story declaration.
  const jsxSnippets = source => {
    const exportMatches = [...source.matchAll(/^export (?:const|function) (\w+)/gm)]
    const snippets = []
    for (let index = 0; index < exportMatches.length; index += 1) {
      const declarationBody = source.slice(exportMatches[index].index, exportMatches[index + 1]?.index ?? source.length)
      for (const match of declarationBody.matchAll(/(?:=>|\breturn)\s*\(/g)) {
        const capturedJsx = captureBalanced(declarationBody, match.index + match[0].length - 1, '(', ')')
        if (capturedJsx && capturedJsx.includes('<')) snippets.push(capturedJsx)
      }
    }
    return snippets
  }

  // Strip wrapping parens and dedent into a copyable block.
  const dedentJsx = capturedJsx => {
    let jsxBody = capturedJsx.trim()
    if (jsxBody.startsWith('(') && jsxBody.endsWith(')')) jsxBody = jsxBody.slice(1, -1)
    const lines = jsxBody
      .replace(/^\s*\n/, '')
      .replace(/\s+$/, '')
      .split('\n')
    const indents = lines.filter(line => line.trim()).map(line => line.match(/^[ \t]*/)[0].length)
    const dedent = indents.length > 0 ? Math.min(...indents) : 0
    return lines
      .map(line => line.slice(dedent))
      .join('\n')
      .trim()
  }

  // Must render the component; sub-composition helps, plumbing/length hurt. -1 rejects.
  const scoreSnippet = (code, fromExamplesFile) => {
    if (!new RegExp(`<${name}(?:\\b|\\.)`).test(code)) return -1
    let total = fromExamplesFile ? 3 : 0
    total += (code.match(new RegExp(`<${name}\\.`, 'g')) || []).length
    for (const pattern of EXAMPLE_NOISE) total -= (code.match(pattern) || []).length
    if (code.length < 40) total -= 5
    if (code.length > 2200) total -= Math.ceil((code.length - 2200) / 400)
    return total
  }

  let bestExample
  for (const file of storyFiles()) {
    const source = readFileOrNull(file)
    if (!source) continue
    const fromExamplesFile = /\.examples\.stories\.tsx$/i.test(file)
    for (const capturedJsx of jsxSnippets(source)) {
      const code = dedentJsx(capturedJsx)
      if (code.length > 4000 || exampleContradictsCatalog(code, byName)) continue
      const relevanceScore = scoreSnippet(code, fromExamplesFile)
      if (relevanceScore >= 0 && (!bestExample || relevanceScore > bestExample.score))
        bestExample = {code, score: relevanceScore}
    }
  }
  return bestExample?.code
}

// Best curated example from a component's docs page — the fallback when no tested story exists, so
// primitives (Stack, Text, the form controls) still get one. `noinline` playground blocks (no
// leading `<`) are skipped; the earliest, most sub-composed block that renders the component wins.
function bestDocsExample(name, byName, docsDir) {
  const source = readFileOrNull(join(docsDir, 'react.mdx'))
  if (!source) return undefined
  let bestExample
  for (const fencedBlock of source.matchAll(/```(?:jsx|tsx)[^\n]*\n([\s\S]*?)```/g)) {
    const code = fencedBlock[1].trim()
    if (
      !code.startsWith('<') ||
      code.length > 2000 ||
      !new RegExp(`<${name}(?:\\b|\\.)`).test(code) ||
      exampleContradictsCatalog(code, byName)
    ) {
      continue
    }
    let snippetScore = 10 + (code.match(new RegExp(`<${name}\\.`, 'g')) || []).length
    if (code.length > 1200) snippetScore -= Math.ceil((code.length - 1200) / 400)
    if (!bestExample || snippetScore > bestExample.score) bestExample = {code, score: snippetScore}
  }
  return bestExample?.code
}

/**
 * A one-line description authored as a JSDoc comment directly above the component's declaration
 * (e.g. `/** Use the hero… *\/ export const Hero = …`). Anchored to the declaration so file-section
 * banners such as `/** Design tokens *\/` are never mistaken for a description. Returns the first
 * sentence, or `undefined` when no such comment exists yet — the common case today, which is why
 * descriptions fall back to the docs pages below. This is the preferred source so a future backfill
 * that annotates the component source is picked up automatically with no change here.
 */
function jsdocDescription(name, source) {
  // Tempered `(?:(?!\*\/)[\s\S])*?` keeps the comment a single block immediately adjacent to the
  // declaration, so an earlier prop doc can never be swallowed and mistaken for the component's.
  const jsdocRegex = new RegExp(
    `/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*(?:export\\s+)?(?:const|function|class)\\s+${name}(?:Root)?\\b`,
  )
  const match = jsdocRegex.exec(source)
  if (!match) return undefined
  const text = match[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
    .trim()
  // A comment that is just a doc-site pointer (`{@link \u2026}`) is navigation, not a description \u2014
  // defer to the docs page, which carries real prose.
  if (/\{@link/i.test(text)) return undefined
  const sentence = (text.split(/(?<=\.)\s/)[0] ?? '').trim()
  if (sentence.length < 12 || /design token|stylesheet|css module/i.test(sentence)) return undefined
  return sentence
}

/** The raw body of the component's adjacent JSDoc block (same anchoring as `jsdocDescription`). */
function jsdocBody(name, source) {
  const match = new RegExp(
    `/\\*\\*((?:(?!\\*/)[\\s\\S])*?)\\*/\\s*(?:export\\s+)?(?:const|function|class)\\s+${name}(?:Root)?\\b`,
  ).exec(source)
  if (!match) return ''
  return match[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .trim()
}

/** Text of a JSDoc `@tag` block, from the tag to the next `@tag` or end; surrounding code fences stripped. */
function jsdocTag(body, tag) {
  const match = new RegExp(`(?:^|\\n)@${tag}\\b[ \\t]*([\\s\\S]*?)(?=\\n@\\w+|$)`).exec(body)
  if (!match) return undefined
  const text = match[1]
    .trim()
    .replace(/^```\w*\n?/, '')
    .replace(/\n?```$/, '')
    .trim()
  return text || undefined
}

// Description (lead JSDoc sentence), `@remarks` note, and `@example` snippet from a component's source.
function componentGuidance(name, source) {
  const body = jsdocBody(name, source)
  const note = body ? jsdocTag(body, 'remarks') : undefined
  return {
    description: jsdocDescription(name, source),
    note: note ? note.replace(/\s+/g, ' ') : undefined,
    example: body ? jsdocTag(body, 'example') : undefined,
  }
}

// Map docs folders to their page, keyed by lowercased name, scanning every section. Lowercasing
// absorbs casing drift (e.g. `Textarea` source vs the `TextArea` docs folder).
function buildDocsIndex() {
  const index = new Map()
  let sections
  try {
    sections = readdirSync(docsContentRoot, {withFileTypes: true})
  } catch {
    return index
  }
  for (const section of sections) {
    if (!section.isDirectory()) continue
    let entries
    try {
      entries = readdirSync(join(docsContentRoot, section.name), {withFileTypes: true})
    } catch {
      continue
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue
      const directory = join(docsContentRoot, section.name, entry.name)
      const key = entry.name.toLowerCase()
      if (!index.has(key) && existsSync(join(directory, 'index.mdx'))) index.set(key, directory)
    }
  }
  return index
}

// description/keywords from the component's next-docs frontmatter; nothing for undocumented primitives.
function docsMeta(name, docsIndex) {
  const directory = docsIndex.get(name.toLowerCase())
  const source = directory ? readFileOrNull(join(directory, 'index.mdx')) : null
  if (!source) return {}
  const frontmatter = /^---\n([\s\S]*?)\n---/.exec(source)
  if (!frontmatter) return {}
  const block = frontmatter[1]
  const descriptionMatch = /^description:\s*(.+)$/m.exec(block)
  const description = descriptionMatch ? descriptionMatch[1].trim().replace(/^['"]|['"]$/g, '') : undefined
  const keywordsMatch = /^keywords:\s*\[([^\]]*)\]/m.exec(block)
  const keywords = keywordsMatch
    ? [...keywordsMatch[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map(entry => entry[1] ?? entry[2]).filter(Boolean)
    : undefined
  return {description, keywords}
}

function buildComponents() {
  const discovered = discoverComponentFiles()
  const docsIndex = buildDocsIndex()
  const jsdocExamples = new Map()
  // Phase 1 — API metadata straight from each component's own source, plus human-facing copy
  // (description, note, keywords): a source JSDoc is preferred, with the docs page as fallback.
  const components = discovered.map(({name, file}) => {
    const source = readFileOrNull(file) ?? ''
    const docsFrontmatter = docsMeta(name, docsIndex)
    const guidance = componentGuidance(name, source)
    if (guidance.example) jsdocExamples.set(name, guidance.example)
    const description = guidance.description ?? docsFrontmatter.description
    return {
      name,
      module: '@primer/react-brand',
      subcomponents: extractSubcomponents(name, source),
      props: extractProps(name, source),
      examples: [],
      ...(description ? {description} : {}),
      ...(docsFrontmatter.keywords && docsFrontmatter.keywords.length > 0 ? {keywords: docsFrontmatter.keywords} : {}),
      ...(guidance.note ? {note: guidance.note} : {}),
    }
  })
  // Phase 2 — attach one example, kept consistent with the metadata above (so it passes
  // primer_brand_review): an authored JSDoc `@example` wins, else the best tested story, else a curated
  // docs example so primitives are not left empty.
  const byName = new Map(components.map(component => [component.name, component]))
  for (const [index, {dir}] of discovered.entries()) {
    const component = components[index]
    const jsdocCode = jsdocExamples.get(component.name)
    if (jsdocCode && !exampleContradictsCatalog(jsdocCode, byName)) {
      component.examples = [{title: `${component.name} example`, code: jsdocCode, source: 'jsdoc'}]
      continue
    }
    const storyCode = bestStoryExample(dir, component.name, byName)
    if (storyCode) {
      component.examples = [{title: `${component.name} example`, code: storyCode, source: 'story'}]
      continue
    }
    const docsDir = docsIndex.get(component.name.toLowerCase())
    const docsCode = docsDir ? bestDocsExample(component.name, byName, docsDir) : undefined
    if (docsCode) component.examples = [{title: `${component.name} example`, code: docsCode, source: 'docs'}]
  }
  return components
}

// ---------------------------------------------------------------------------
// Assets (Octicons + Octovisuals)
// ---------------------------------------------------------------------------

function exportedNames(packageName) {
  const packageDir = join(nodeModules, ...packageName.split('/'))
  const names = new Set()
  for (const subPath of ['dist', 'lib', '.']) {
    let entries
    try {
      entries = readdirSync(join(packageDir, subPath))
    } catch {
      continue
    }
    for (const entry of entries) {
      if (!entry.endsWith('.d.ts')) continue
      const types = readFileOrNull(join(packageDir, subPath, entry)) ?? ''
      // `declare const AlertIcon: Icon` (octicons) and `export declare const Foo` (octovisuals).
      for (const match of types.matchAll(/(?:export\s+)?declare\s+const\s+([A-Z]\w+)/g)) names.add(match[1])
      for (const match of types.matchAll(/export\s+const\s+([A-Z]\w+)/g)) names.add(match[1])
      for (const match of types.matchAll(/export\s*\{([^}]*)\}/g)) {
        for (const specifier of match[1].split(',')) {
          const identifier = specifier
            .trim()
            .split(/\s+as\s+/)
            .pop()
            ?.trim()
          if (identifier && /^[A-Z]\w+$/.test(identifier)) names.add(identifier)
        }
      }
    }
  }
  return [...names]
}

function buildAssets() {
  const assets = []
  for (const name of exportedNames('@primer/octicons-react')) {
    if (name.endsWith('Icon')) assets.push({name, module: '@primer/octicons-react', kind: 'icon'})
  }
  for (const name of exportedNames('@primer/octovisuals-react')) {
    // Octovisuals components are also named `...Icon`; they are distinguished by package, not suffix.
    if (/^[A-Z]/.test(name) && !/(Props|Type|Metadata)$/.test(name)) {
      assets.push({name, module: '@primer/octovisuals-react', kind: 'illustration'})
    }
  }
  return assets
}

// ---------------------------------------------------------------------------
// Tokens (built CSS custom properties)
// ---------------------------------------------------------------------------

function collectCssFiles(directory, files = []) {
  let entries
  try {
    entries = readdirSync(directory, {withFileTypes: true})
  } catch {
    return files
  }
  for (const entry of entries) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) collectCssFiles(fullPath, files)
    else if (entry.name.endsWith('.css')) files.push(fullPath)
  }
  return files
}

function buildTokens() {
  const tokensRoot = join(nodeModules, '@primer', 'brand-primitives', 'lib', 'design-tokens', 'css', 'tokens')
  if (!existsSync(tokensRoot)) {
    writeStderrLog('design tokens not built; skipping token catalog (run build:lib to include them)')
    return []
  }
  const byName = new Map()
  for (const file of collectCssFiles(tokensRoot)) {
    const group =
      dirname(file)
        .slice(tokensRoot.length + 1)
        .split('/')[0] || 'base'
    for (const match of (readFileOrNull(file) ?? '').matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
      const name = match[1]
      if (!byName.has(name)) byName.set(name, {name, value: match[2].trim(), group})
    }
  }
  return [...byName.values()]
}

// ---------------------------------------------------------------------------

function main() {
  const components = runPhaseSafely('components', buildComponents, [])
  const assets = runPhaseSafely('assets', buildAssets, [])
  const tokens = runPhaseSafely('tokens', buildTokens, [])

  // Sanity floor: fail loudly if extraction collapses, rather than silently shipping a broken
  // catalog. Thresholds sit far below normal output (~70 components, ~400 assets), so they only
  // fire on a structural regression — the "we went a level deeper and never noticed" case.
  assertMinimumCount('components', components, 50)
  assertMinimumCount('assets', assets, 200)
  if (tokens.length === 0) {
    writeStderrLog('WARNING: 0 design tokens — build @primer/brand-primitives (npm run build:lib) to include them')
  }

  const generatedFromVersion = (() => {
    const packageJsonText = readFileOrNull(resolve(repoRoot, 'packages', 'react', 'package.json'))
    try {
      return packageJsonText ? JSON.parse(packageJsonText).version ?? 'unknown' : 'unknown'
    } catch {
      return 'unknown'
    }
  })()
  const catalog = {
    brandPackage: '@primer/react-brand',
    generatedFromVersion,
    generatedAt: new Date().toISOString(),
    components,
    assets,
    tokens,
  }

  mkdirSync(dirname(outFile), {recursive: true})
  writeFileSync(outFile, `${JSON.stringify(catalog, null, 2)}\n`)
  writeStderrLog(
    `wrote ${components.length} components, ${assets.length} assets, ${tokens.length} tokens -> ${outFile}`,
  )
}

function assertMinimumCount(label, items, minimum) {
  if (items.length < minimum) {
    throw new Error(
      `catalog sanity check failed: ${label} = ${items.length} (expected >= ${minimum}). Extraction likely regressed; refusing to write a broken catalog.`,
    )
  }
}

function runPhaseSafely(label, phase, fallback) {
  try {
    return phase()
  } catch (error) {
    writeStderrLog(`phase "${label}" failed: ${error.message}`)
    return fallback
  }
}

main()
