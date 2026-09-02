/* eslint-disable github/unescaped-html-literal, import/extensions */
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {afterEach, describe, it} from 'node:test'

import {
  resolveFigmaImageSource,
  resolveFigmaPageMapThumbnails,
} from '../src/components/FigmaImage/FigmaImage.server.mjs'
import {
  FIGMA_FILE_KEY,
  discoverFigmaUrls,
  extractFigmaUrls,
  validateFigmaUrl,
  validateFigmaUrls,
  verifyFigmaImageAssets,
} from './figma-images.mjs'

const temporaryDirectories = []
const approvedUrl = `https://www.figma.com/design/${FIGMA_FILE_KEY}/Brand?node-id=1804-8382`

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(directory => fs.rm(directory, {recursive: true, force: true})))
})

describe('Figma image workflow', () => {
  it('discovers and validates supported references', async () => {
    const contentDirectory = await createTemporaryDirectory()
    await fs.writeFile(
      path.join(contentDirectory, 'example.mdx'),
      `---
thumbnail: https://www.figma.com/file/${FIGMA_FILE_KEY}/Brand?node-id=1804-8383
---

<FigmaImage src="${approvedUrl}" darkModeSrc="${approvedUrl}&t=dark" alt="Example" />
`,
    )

    const discovered = await discoverFigmaUrls(contentDirectory)
    const validated = validateFigmaUrls(discovered)

    assert.equal(discovered.length, 3)
    assert.deepEqual(
      validated.map(image => image.basename),
      [`${FIGMA_FILE_KEY}-1804-8382`, `${FIGMA_FILE_KEY}-1804-8383`],
    )
  })

  it('rejects dynamic and unapproved references', () => {
    assert.throws(
      () => extractFigmaUrls('<FigmaImage src={figmaUrl} />', 'example.mdx'),
      /example\.mdx.*must be a static quoted URL/,
    )
    assert.throws(
      () => validateFigmaUrl('https://www.figma.com/design/foreign-file/Other?node-id=1-2'),
      /file key "foreign-file" is not approved/,
    )
  })

  it('verifies generated assets without allowing manifest paths to escape the output directory', async () => {
    const outputDirectory = await createTemporaryDirectory()
    const image = validateFigmaUrl(approvedUrl)
    const manifestPath = path.join(outputDirectory, 'images.json')
    const filename = 'preview.png'

    await fs.writeFile(manifestPath, JSON.stringify({[image.basename]: {width: 100, height: 100, filename}}))
    await fs.writeFile(path.join(outputDirectory, filename), 'image')

    await verifyFigmaImageAssets([image], outputDirectory)

    await fs.writeFile(
      manifestPath,
      JSON.stringify({[image.basename]: {width: 100, height: 100, filename: '../outside.png'}}),
    )

    await assert.rejects(verifyFigmaImageAssets([image], outputDirectory), /must not contain path segments/)
  })

  it('only exposes canonical Figma edit links', () => {
    const source = resolveFigmaImageSource(`/design/${FIGMA_FILE_KEY}/Brand?node-id=1804%3A8382`)

    assert.equal(source.editUrl, approvedUrl)
    assert.equal(resolveFigmaImageSource('javascript:alert(1)').editUrl, undefined)
    assert.equal(
      resolveFigmaImageSource(`https://example.com/design/${FIGMA_FILE_KEY}/Brand?node-id=1804-8382`).editUrl,
      undefined,
    )
  })

  it('maps Figma thumbnails to committed assets', () => {
    const pageMap = [
      {
        route: '/example',
        frontMatter: {
          thumbnail: approvedUrl,
          thumbnail_darkMode: '/images/example-dark.png',
        },
      },
    ]

    const resolved = resolveFigmaPageMapThumbnails(pageMap)

    assert.equal(resolved[0].frontMatter.thumbnail, '/images/figma/anatomy-1804-8382.png')
    assert.equal(resolved[0].frontMatter.thumbnail_darkMode, '/images/example-dark.png')
  })
})

async function createTemporaryDirectory() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'brand-figma-images-'))
  temporaryDirectories.push(directory)
  return directory
}
