import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import figmaImages from '@primer/figma-images'
import {parseFigmaNodeUrl} from '@primer/figma-images/parseFigmaNodeUrl'

export const APPROVED_FIGMA_FILE_KEY = 'kc69gOteR1MsL0aQtLdxLW'

const APP_ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIRECTORY = path.join(APP_ROOT, 'content')
const OUTPUT_DIRECTORY = path.join(APP_ROOT, 'public/images/figma')
const FIGMA_URL_SOURCE = String.raw`https:\/\/www\.figma\.com\/(?:design|file|board)\/[^"'\s>]+`
const FIGMA_IMAGE_TAG_PATTERN = /<FigmaImage\b[\s\S]*?>/gi
const FIGMA_IMAGE_PROP_PATTERN = new RegExp(String.raw`\b(?:src|darkModeSrc)\s*=\s*(["'])(${FIGMA_URL_SOURCE})\1`, 'gi')
const FRONTMATTER_PATTERN = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
const FRONTMATTER_IMAGE_PATTERN = new RegExp(
  String.raw`^\s*(?:thumbnail|thumbnail_darkMode)\s*:\s*(?:(["'])(${FIGMA_URL_SOURCE})\1|(${FIGMA_URL_SOURCE}))\s*$`,
  'gim',
)

export function extractFigmaUrls(content) {
  const urls = []

  for (const tag of content.matchAll(FIGMA_IMAGE_TAG_PATTERN)) {
    for (const match of tag[0].matchAll(FIGMA_IMAGE_PROP_PATTERN)) {
      urls.push(match[2])
    }
  }

  const frontmatter = content.match(FRONTMATTER_PATTERN)?.[1]
  if (frontmatter) {
    for (const match of frontmatter.matchAll(FRONTMATTER_IMAGE_PATTERN)) {
      urls.push(match[2] ?? match[3])
    }
  }

  return [...new Set(urls)]
}

export async function discoverFigmaUrls(contentDirectory = CONTENT_DIRECTORY) {
  const files = await findMdxFiles(contentDirectory)
  const discovered = []

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf8')
    for (const url of extractFigmaUrls(content)) {
      discovered.push({url, filePath})
    }
  }

  return discovered
}

export function validateFigmaUrl(url, source = 'Figma image') {
  let parsedUrl

  try {
    parsedUrl = new URL(url, 'https://www.figma.com')
  } catch {
    throw new Error(`${source}: "${url}" is not a valid URL.`)
  }

  if (
    parsedUrl.protocol !== 'https:' ||
    parsedUrl.hostname !== 'www.figma.com' ||
    !['design', 'file', 'board'].includes(parsedUrl.pathname.split('/')[1])
  ) {
    throw new Error(`${source}: "${url}" must be an https://www.figma.com design, file, or board node URL.`)
  }

  const nodeId = parsedUrl.searchParams.get('node-id')
  if (!nodeId) {
    throw new Error(`${source}: "${url}" must include a node-id query parameter.`)
  }

  parsedUrl.searchParams.set('node-id', nodeId.replaceAll(':', '-'))
  const canonicalUrl = parsedUrl.toString()
  const parsedNode = parseFigmaNodeUrl(canonicalUrl)

  if (!parsedNode) {
    throw new Error(`${source}: "${url}" is not a valid Figma node URL.`)
  }

  if (parsedNode.fileId !== APPROVED_FIGMA_FILE_KEY) {
    throw new Error(
      `${source}: Figma file key "${parsedNode.fileId}" is not approved. Use a frame from the Brand Interface Guidelines file (${APPROVED_FIGMA_FILE_KEY}).`,
    )
  }

  return {
    originalUrl: url,
    canonicalUrl,
    ...parsedNode,
  }
}

export function validateFigmaUrls(discovered) {
  const validated = []
  const errors = []

  for (const {url, filePath} of discovered) {
    try {
      validated.push(validateFigmaUrl(url, filePath))
    } catch (error) {
      errors.push(error.message)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Figma image validation failed:\n- ${errors.join('\n- ')}`)
  }

  return [...new Map(validated.map(image => [image.canonicalUrl, image])).values()]
}

export async function generateFigmaImages(validated, token, outputDirectory = OUTPUT_DIRECTORY) {
  if (!token) {
    throw new Error(
      'FIGMA_ACCESS_TOKEN is required to generate Figma images. Add it to apps/next-docs/.env.local or the command environment.',
    )
  }

  await figmaImages(token, {
    nodeURLs: validated.map(image => image.canonicalUrl),
    outputDir: outputDirectory,
    missingImagesLogLevel: 'fail',
    clean: true,
  })

  await verifyFigmaImageAssets(validated, outputDirectory)
}

async function findMdxFiles(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true})
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findMdxFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push(entryPath)
    }
  }

  return files.sort()
}

export async function verifyFigmaImageAssets(validated, outputDirectory = OUTPUT_DIRECTORY) {
  const manifestPath = path.join(outputDirectory, 'images.json')
  let manifest

  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
  } catch (error) {
    throw new Error(`Unable to read the generated Figma image manifest at ${manifestPath}: ${error.message}`)
  }

  for (const image of validated) {
    const dimensions = manifest[image.basename]
    if (!dimensions || !Number.isFinite(dimensions.width) || !Number.isFinite(dimensions.height)) {
      throw new Error(`Generated dimensions are missing for ${image.originalUrl}.`)
    }
    try {
      await fs.access(path.join(outputDirectory, image.filename))
    } catch {
      throw new Error(`Generated image is missing for ${image.originalUrl}: ${image.filename}`)
    }
  }
}

async function run() {
  const command = process.argv[2]
  const discovered = await discoverFigmaUrls()
  const validated = validateFigmaUrls(discovered)

  if (command === 'validate') {
    await verifyFigmaImageAssets(validated)
    // eslint-disable-next-line no-console
    console.log(
      `Validated ${validated.length} Figma image URL${validated.length === 1 ? '' : 's'} and committed asset${
        validated.length === 1 ? '' : 's'
      }.`,
    )
    return
  }

  if (command === 'generate') {
    await generateFigmaImages(validated, process.env.FIGMA_ACCESS_TOKEN)
    return
  }

  throw new Error('Usage: node scripts/figma-images.mjs <validate|generate>')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await run()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message)
    process.exitCode = 1
  }
}
