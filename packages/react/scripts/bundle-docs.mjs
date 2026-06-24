#!/usr/bin/env node
/**
 * Bundles version-pinned, agent-readable Markdown docs into @primer/react-brand
 * Also outputs an llms.txt, which serves as a table of contents for LLMs
 * For complete accuracy, we transpile all the MDX to flat Markdown bcause we have a lot
 * of React components in our docs, which would otherwise appear blank.
 */
import {readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync, statSync} from 'node:fs'
import {dirname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkStringify from 'remark-stringify'
import {toString as mdToString} from 'mdast-util-to-string'
;(() => {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const packageRoot = resolve(scriptDir, '..')
  const contentDir = resolve(packageRoot, '..', '..', 'apps', 'next-docs', 'content')
  const outDir = join(packageRoot, 'docs')
  const llmsPath = join(packageRoot, 'llms.txt')
  const {name, version} = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'))
  const siteBaseUrl = 'https://primer.style/brand'

  const sections = [
    {dir: 'getting-started', title: 'Getting started', flat: true},
    {dir: 'introduction', title: 'Introduction', flat: true},
    {dir: 'primitives', title: 'Primitives', flat: true},
    {dir: 'layout', title: 'Layout'},
    {dir: 'typography', title: 'Typography'},
    {dir: 'components', title: 'Components'},
    {dir: 'forms', title: 'Forms'},
  ]

  // Frontmatter exclusion list.
  const droppedFrontMatterKeys = new Set(['thumbnail', 'thumbnail_darkMode', 'show-tabs', 'tab-label', 'menu-position'])

  // Use third-party to parse the MDX
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkMdx)
    .use(remarkStringify, {bullet: '-', emphasis: '_', fences: true, listItemIndent: 'one', rule: '-'})

  let pageIndex = new Map()

  const textNode = value => ({type: 'text', value})
  const paragraph = children => ({type: 'paragraph', children})
  const inlineCode = value => ({type: 'inlineCode', value})

  const phrasingTypes = new Set(['text', 'emphasis', 'strong', 'inlineCode', 'link', 'image', 'break', 'delete'])
  const flowContainers = new Set(['root', 'blockquote', 'listItem'])
  const wrapStrayPhrasing = node => {
    if (!node.children) return
    for (const child of node.children) wrapStrayPhrasing(child)
    if (!flowContainers.has(node.type)) return
    const next = []
    let run = []
    for (const child of node.children) {
      if (phrasingTypes.has(child.type)) {
        run.push(child)
      } else {
        if (run.length) {
          next.push(paragraph(run))
          run = []
        }
        next.push(child)
      }
    }
    if (run.length) next.push(paragraph(run))
    node.children = next
  }

  const recurseMDX = dir =>
    readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
      if (entry.name.startsWith('.')) return []
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return recurseMDX(full)
      return entry.name.endsWith('.mdx') ? [full] : []
    })

  const propRendererCache = new Map()
  const propRenderers = sourceDir => {
    if (propRendererCache.has(sourceDir)) return propRendererCache.get(sourceDir)
    const renderers = new Map()
    const tsxPath = join(sourceDir, 'react.tsx')
    if (existsSync(tsxPath)) {
      // TypeScript, not Markdown, so a small regex over the source is appropriate:
      //   export const ButtonVariantsProp = () => <PropTableValues values={['a', 'b']} />
      const pattern = /export const (\w+)\s*=\s*\(\)\s*=>\s*\(?\s*<PropTableValues\s+values=\{(\[[^\]]*\])\}/g
      const tsxSource = readFileSync(tsxPath, 'utf8')
      for (let match = pattern.exec(tsxSource); match; match = pattern.exec(tsxSource)) {
        const values = match[2]
          .slice(1, -1)
          .split(',')
          .map(token => token.trim())
          .filter(Boolean)
          .map(token => {
            // Quote real string literals; show spreads/identifiers as type references.
            const literal = /^['"`](.*)['"`]$/.exec(token)
            return literal ? `'${literal[1]}'` : token.replace(/^\.\.\./, '')
          })
        // Stored unescaped (`a | b`); remark escapes the pipe when it lands in a table cell.
        if (values.length) renderers.set(match[1], values.join(' | '))
      }
    }
    propRendererCache.set(sourceDir, renderers)
    return renderers
  }

  const resolveRelativePaths = relativePath => {
    const dir = join(contentDir, relativePath)
    if (existsSync(dir) && statSync(dir).isDirectory()) {
      if (existsSync(join(dir, 'index.mdx'))) return `${relativePath}/index.md`
      if (existsSync(join(dir, 'react.mdx'))) return `${relativePath}/react.md`
      return null
    }
    return existsSync(`${dir}.mdx`) ? `${relativePath}.md` : null
  }

  const resolveDocLink = (url, fileOutDir) => {
    const hashIdx = url.indexOf('#')
    const linkPath = hashIdx === -1 ? url : url.slice(0, hashIdx)
    const anchor = hashIdx === -1 ? '' : url.slice(hashIdx)
    if (linkPath === '') return url // pure anchor

    const stripped = linkPath.replace(/^https?:\/\/primer\.style\/brand/, '')
    if (/^(https?:|mailto:|tel:)/.test(stripped)) return url // external / mail / tel

    const fromSite = stripped.startsWith('/brand') ? stripped.slice('/brand'.length) : stripped
    const base = stripped.startsWith('/') ? '' : relative(outDir, fileOutDir).split('\\').join('/')
    const relativePath = join('/', base, fromSite)
      .split('\\')
      .join('/')
      .replace(/^\/+|\/+$/g, '')
      .replace(/\.(mdx|md)$/, '')
    const name = relativePath.split('/').pop().replace(/^\.+/, '')
    const target = resolveRelativePaths(relativePath) || (name ? pageIndex.get(name.toLowerCase()) : null)
    if (!target) return null

    let outputPath = relative(fileOutDir, join(outDir, target)).split('\\').join('/')
    if (!outputPath.startsWith('.')) outputPath = `./${outputPath}`
    return `${outputPath}${anchor}`
  }

  const jsxAttribute = (node, attributeName) => {
    const attribute = (node.attributes || []).find(
      candidate => candidate.type === 'mdxJsxAttribute' && candidate.name === attributeName,
    )
    return attribute && typeof attribute.value === 'string' ? attribute.value : null
  }

  const transformTree = (tree, fileOutDir, propMap) => {
    const linkOrText = (url, children) => {
      const href = url == null ? null : resolveDocLink(url, fileOutDir)
      return href ? [{type: 'link', url: href, title: null, children}] : children
    }

    const mapJsxElement = node => {
      const children = node.children || []
      switch (node.name) {
        case 'img': {
          const src = jsxAttribute(node, 'src')
          if (!src || !/^https?:\/\//.test(src)) return [] // local/imported image, not bundled
          return [{type: 'image', url: src, title: null, alt: jsxAttribute(node, 'alt') || ''}]
        }
        case 'a':
          return linkOrText(jsxAttribute(node, 'href'), children)
        case 'Caption':
          return [paragraph([{type: 'emphasis', children: [textNode(mdToString(node).trim())]}])]
        case 'Note':
          return [{type: 'blockquote', children}]
        case 'Label':
          return [inlineCode(mdToString(node).trim())]
        case 'Do':
          return [paragraph([{type: 'strong', children: [textNode('✅ Do')]}]), ...children]
        case 'Dont':
          return [paragraph([{type: 'strong', children: [textNode("❌ Don't")]}]), ...children]
        case 'DoDontContainer':
          return children
        case 'video':
          // eslint-disable-next-line i18n-text/no-en -- bundled doc content, not UI copy
          return [paragraph([{type: 'emphasis', children: [textNode('Video demonstration — see the online docs.')]}])]
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          return [{type: 'heading', depth: Number(node.name.slice(1)), children}]
        default:
          if (propMap.has(node.name)) return [inlineCode(propMap.get(node.name))]
          return children // unknown component: unwrap and keep its content
      }
    }

    const mapNode = node => {
      switch (node.type) {
        case 'yaml': {
          const kept = node.value
            .split('\n')
            .filter(line => !droppedFrontMatterKeys.has(line.slice(0, line.indexOf(':')).trim()))
          if (kept.join('').trim() === '') return []
          node.value = kept.join('\n')
          return [node]
        }
        case 'mdxjsEsm': // import / export
        case 'mdxFlowExpression': // {/* comments */} and other {expressions}
        case 'mdxTextExpression':
          return []
        case 'image':
          return /^https?:\/\//.test(node.url) ? [node] : [] // keep remote, drop local
        case 'link':
          return linkOrText(node.url, node.children)
        case 'code':
          if (!node.value.trim()) return [] // drop empty fences
          if (node.meta) node.meta = node.meta.replace(/\blive\b/g, '').trim() || null
          return [node]
        case 'mdxJsxFlowElement':
        case 'mdxJsxTextElement':
          return mapJsxElement(node)
        default:
          return [node]
      }
    }

    const walk = parent => {
      if (!parent.children) return
      const next = []
      for (const child of parent.children) {
        walk(child)
        next.push(...mapNode(child))
      }
      parent.children = next
    }
    walk(tree)
    wrapStrayPhrasing(tree)
  }

  const renderDoc = (raw, fileOutDir, propMap) => {
    const tree = processor.parse(raw)
    transformTree(tree, fileOutDir, propMap)
    return processor.stringify(tree)
  }

  const frontmatterReader = raw => {
    const match = /^---\n([\s\S]*?)\n---/.exec(raw)
    const lines = match ? match[1].split('\n') : []
    return key => {
      const matchedLine = lines.find(line => line.startsWith(`${key}:`))
      return matchedLine
        ? matchedLine
            .slice(key.length + 1)
            .trim()
            .replace(/^['"]|['"]$/g, '')
        : ''
    }
  }

  const titleFromPath = relPath => {
    const segments = relPath.split('/')
    // Component-style docs (Name/index.mdx, Name/react.mdx) use the dir name.
    return segments.length >= 2 ? segments[segments.length - 2] : segments[segments.length - 1].replace(/\.mdx$/, '')
  }

  // One catalog entry per component
  const primaryEntries = (entries, flat) => {
    if (flat) return [...entries].sort((entryA, entryB) => entryA.title.localeCompare(entryB.title))
    const byDirectory = new Map()
    for (const entry of entries) {
      const key = dirname(entry.relOut)
      const existing = byDirectory.get(key)
      if (!existing || (entry.isReact && !existing.isReact)) byDirectory.set(key, entry)
    }
    return [...byDirectory.values()].sort((entryA, entryB) => entryA.title.localeCompare(entryB.title))
  }

  const displayTitle = (entry, flat) =>
    flat && !entry.relOut.endsWith('/index.md') && entry.tabLabel && entry.tabLabel !== 'Default'
      ? `${entry.title} (${entry.tabLabel})`
      : entry.title

  // BUILD STARTS HERE
  if (!existsSync(contentDir)) {
    throw new Error(`Cannot bundle docs: content directory not found at ${contentDir}`)
  }
  rmSync(outDir, {recursive: true, force: true})
  rmSync(llmsPath, {force: true})
  mkdirSync(outDir, {recursive: true})

  // 1. Enumerate every doc and index it by name for cross-section links.
  const docs = []
  for (const {dir} of sections) {
    const sectionDir = join(contentDir, dir)
    if (!existsSync(sectionDir)) continue
    for (const sourcePath of recurseMDX(sectionDir)) {
      const relFromContent = relative(contentDir, sourcePath).split('\\').join('/')
      docs.push({dir, sourcePath, relFromContent, relOut: relFromContent.replace(/\.mdx$/, '.md')})
    }
  }
  pageIndex = new Map()
  for (const {relOut} of docs) {
    const parts = relOut.split('/')
    const named =
      parts.length === 3
        ? parts[1] // <section>/<Name>/{index,react}.md
        : parts.length === 2
        ? parts[1] === 'index.md'
          ? parts[0] // section landing
          : parts[1].replace(/\.md$/, '') // flat page
        : null
    if (!named) continue
    const key = named.toLowerCase()
    const current = pageIndex.get(key)
    if (!current || (relOut.endsWith('/index.md') && !current.endsWith('/index.md'))) pageIndex.set(key, relOut)
  }

  // 2. Transform each doc to Markdown and collect catalog metadata.
  const catalog = new Map(sections.map(section => [section.dir, []]))
  for (const {dir, sourcePath, relFromContent, relOut} of docs) {
    const targetPath = join(outDir, relOut)
    const fileOutDir = dirname(targetPath)
    const raw = readFileSync(sourcePath, 'utf8')
    const markdown = renderDoc(raw, fileOutDir, propRenderers(dirname(sourcePath)))

    mkdirSync(fileOutDir, {recursive: true})
    writeFileSync(targetPath, markdown)

    const readFrontmatter = frontmatterReader(raw)
    catalog.get(dir).push({
      relOut,
      title: readFrontmatter('title') || titleFromPath(relFromContent),
      description: readFrontmatter('description'),
      tabLabel: readFrontmatter('tab-label'),
      isReact: /\/react\.md$/.test(relOut),
      empty: markdown.replace(/^---\n[\s\S]*?\n---\n?/, '').trim() === '',
    })
  }

  // Some pages have no Markdown body like index or React-only files
  for (const {dir, flat} of sections) {
    for (const entry of catalog.get(dir).filter(candidate => candidate.empty)) {
      const targetPath = join(outDir, entry.relOut)
      const head = readFileSync(targetPath, 'utf8').trim()
      let body
      if (entry.relOut === `${dir}/index.md`) {
        const items = primaryEntries(catalog.get(dir), flat)
          .filter(sibling => sibling.relOut !== entry.relOut)
          .map(sibling => {
            const relativePath = relative(dirname(targetPath), join(outDir, sibling.relOut)).split('\\').join('/')
            return `- [${displayTitle(sibling, flat)}](${relativePath})${
              sibling.description ? `: ${sibling.description}` : ''
            }`
          })
        body = `## In this section\n\n${items.join('\n')}`
      } else {
        body =
          `This page is an interactive demo, so it has no static Markdown form. The primitives it ` +
          `showcases ship with this package: load \`${name}/lib/css/main.css\` and read the design ` +
          `tokens bundled under \`lib/design-tokens/\`.`
      }
      writeFileSync(targetPath, head ? `${head}\n\n${body}\n` : `${body}\n`)
    }
  }

  // create llms.txt
  const llmsLines = []
  const indexLines = []
  for (const {dir, title, flat} of sections) {
    const entries = catalog.get(dir)
    if (!entries.length) continue
    llmsLines.push(`## ${title}`, '')
    indexLines.push(`## ${title}`, '')
    for (const entry of primaryEntries(entries, flat)) {
      const label = displayTitle(entry, flat)
      const descriptionSuffix = entry.description ? `: ${entry.description}` : ''
      llmsLines.push(`- [${label}](docs/${entry.relOut})${descriptionSuffix}`)
      indexLines.push(`- [${label}](${entry.relOut})${descriptionSuffix}`)
    }
    llmsLines.push('')
    indexLines.push('')
  }

  writeFileSync(
    llmsPath,
    `# Primer Brand — ${name} v${version}

> Version-pinned documentation for ${name} v${version}, bundled with the installed package.
> These docs match this exact release; prefer them over ${siteBaseUrl} when the
> installed version differs from the latest. All links below are relative to this file.

${llmsLines.join('\n').trim()}
`,
  )

  writeFileSync(
    join(outDir, 'index.md'),
    `# Primer Brand docs (v${version})

These docs are bundled with \`${name}@${version}\` and match your installed version.

New here? Start with [Getting started](getting-started/index.md) for installation, global
stylesheet and font setup. Component directories are named after their import (e.g.
\`components/Button\`), and \`react.md\` holds the import line, live examples and props.

${indexLines.join('\n').trim()}
`,
  )

  process.stderr.write(
    // eslint-disable-next-line i18n-text/no-en
    `Bundled ${docs.length} doc pages into ${relative(packageRoot, outDir)}/ + llms.txt (v${version})\n`,
  )
})()
