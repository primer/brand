/* eslint-disable github/unescaped-html-literal, import/extensions */
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {afterEach, describe, it} from 'node:test'
import {
  FIGMA_FILE_KEY,
  discoverFigmaUrls,
  extractFigmaUrls,
  generateFigmaImages,
  validateFigmaUrl,
  validateFigmaUrls,
  verifyFigmaImageAssets,
} from './figma-images.mjs'
import {resolveFigmaPageMapThumbnails} from '../src/components/FigmaImage/FigmaImage.server.mjs'
import {getActiveFigmaSource, resolveImageDimensions} from '../src/components/FigmaImage/FigmaImage.utils.ts'

const temporaryDirectories = []
const approvedUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Brand?node-id=1804-8382`

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory => fs.rm(directory, {recursive: true, force: true})))
})

describe('extractFigmaUrls', () => {
  it('extracts quoted FigmaImage sources and Figma-backed thumbnails', () => {
    const content = `---
thumbnail: '${approvedUrl}'
thumbnail_darkMode: "https://www.figma.com/file/${FIGMA_FILE_KEY}/Brand?node-id=1804%3A8383"
figma: 'https://www.figma.com/design/foreign-file/metadata?node-id=1-2'
---

<FigmaImage
  src="${approvedUrl}"
  darkModeSrc='https://www.figma.com/board/${FIGMA_FILE_KEY}/Brand?node-id=1804-8384'
  alt="Example"
/>
`

    assert.deepEqual(extractFigmaUrls(content), [
      approvedUrl,
      `https://www.figma.com/board/${FIGMA_FILE_KEY}/Brand?node-id=1804-8384`,
      `https://www.figma.com/file/${FIGMA_FILE_KEY}/Brand?node-id=1804%3A8383`,
    ])
  })

  it('ignores unrelated Figma metadata and component props', () => {
    const content = `---
figma: '${approvedUrl}'
---

<Example src="${approvedUrl}" />
`

    assert.deepEqual(extractFigmaUrls(content), [])
  })
})

describe('discoverFigmaUrls', () => {
  it('only scans MDX files below the provided content directory', async () => {
    const root = await createTemporaryDirectory()
    const contentDirectory = path.join(root, 'content')
    await fs.mkdir(path.join(contentDirectory, 'components'), {recursive: true})
    await fs.writeFile(
      path.join(contentDirectory, 'components/example.mdx'),
      `<FigmaImage src="${approvedUrl}" alt="Example" />`,
    )
    await fs.writeFile(path.join(contentDirectory, 'components/example.tsx'), `<FigmaImage src="${approvedUrl}" />`)
    await fs.writeFile(path.join(root, 'outside.mdx'), `<FigmaImage src="${approvedUrl}" alt="Example" />`)

    const discovered = await discoverFigmaUrls(contentDirectory)

    assert.equal(discovered.length, 1)
    assert.equal(discovered[0].url, approvedUrl)
    assert.equal(discovered[0].filePath, path.join(contentDirectory, 'components/example.mdx'))
  })
})

describe('validateFigmaUrl', () => {
  it('accepts approved design and file URLs', () => {
    assert.equal(validateFigmaUrl(approvedUrl).fileId, FIGMA_FILE_KEY)
    assert.equal(
      validateFigmaUrl(`https://www.figma.com/file/${FIGMA_FILE_KEY}/Brand?node-id=1804-8382&t=example`).fileId,
      FIGMA_FILE_KEY,
    )
  })

  it('rejects URLs from foreign files with an actionable error', () => {
    assert.throws(
      () =>
        validateFigmaUrls([{url: 'https://www.figma.com/design/foreign-file/Other?node-id=1-2', filePath: 'x.mdx'}]),
      error => {
        assert.match(error.message, /foreign-file/)
        assert.match(error.message, new RegExp(FIGMA_FILE_KEY))
        assert.match(error.message, /x\.mdx/)
        return true
      },
    )
  })

  it('normalizes colon node IDs while preserving the original edit URL', () => {
    const originalUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Brand?node-id=1804%3A8382&t=example`
    const parsed = validateFigmaUrl(originalUrl)

    assert.equal(parsed.originalUrl, originalUrl)
    assert.equal(parsed.nodeId, '1804:8382')
    assert.equal(parsed.basename, `${FIGMA_FILE_KEY}-1804-8382`)
    assert.match(parsed.canonicalUrl, /node-id=1804-8382/)
    assert.match(parsed.canonicalUrl, /t=example/)
  })
})

describe('generateFigmaImages', () => {
  it('requires FIGMA_ACCESS_TOKEN before generation', async () => {
    await assert.rejects(generateFigmaImages([validateFigmaUrl(approvedUrl)], ''), /FIGMA_ACCESS_TOKEN/)
  })

  it('cleans stale generated files when no URLs remain', async () => {
    const outputDirectory = await createTemporaryDirectory()
    await fs.writeFile(path.join(outputDirectory, 'stale.png'), 'stale')
    await fs.writeFile(path.join(outputDirectory, 'images.json'), '{"stale": true}')

    await generateFigmaImages([], 'test-token', outputDirectory)

    assert.deepEqual(JSON.parse(await fs.readFile(path.join(outputDirectory, 'images.json'), 'utf8')), {})
    await assert.rejects(fs.access(path.join(outputDirectory, 'stale.png')))
  })
})

describe('verifyFigmaImageAssets', () => {
  it('rejects approved references without committed generated assets', async () => {
    const outputDirectory = await createTemporaryDirectory()
    await fs.writeFile(path.join(outputDirectory, 'images.json'), '{}')

    await assert.rejects(
      verifyFigmaImageAssets([validateFigmaUrl(approvedUrl)], outputDirectory),
      /Generated dimensions are missing/,
    )
  })
})

describe('resolveFigmaPageMapThumbnails', () => {
  it('maps Figma-backed frontmatter thumbnails to generated public asset paths', () => {
    const pageMap = [
      {
        name: 'example',
        route: '/example',
        frontMatter: {
          thumbnail: approvedUrl,
          thumbnail_darkMode: '/images/example-dark.png',
        },
      },
    ]

    const resolved = resolveFigmaPageMapThumbnails(pageMap)

    assert.equal(resolved[0].frontMatter.thumbnail, `/images/figma/${FIGMA_FILE_KEY}-1804-8382.png`)
    assert.equal(resolved[0].frontMatter.thumbnail_darkMode, '/images/example-dark.png')
  })
})

describe('FigmaImage utilities', () => {
  it('uses the light source as the dark-mode fallback', () => {
    const lightSource = {assetUrl: '/light.png', editUrl: approvedUrl}

    assert.equal(getActiveFigmaSource('dark', lightSource), lightSource)
  })

  it('preserves the generated aspect ratio for one explicit dimension', () => {
    const source = {editUrl: approvedUrl, width: 1452, height: 765}

    assert.deepEqual(resolveImageDimensions(source, 726), {width: 726, height: 383})
    assert.deepEqual(resolveImageDimensions(source, undefined, 255), {width: 484, height: 255})
  })
})

async function createTemporaryDirectory() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'brand-figma-images-'))
  temporaryDirectories.push(directory)
  return directory
}
