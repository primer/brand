import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import figmaImages from '@primer/figma-images'
import {parseFigmaNodeUrl} from '@primer/figma-images/parseFigmaNodeUrl'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import {visit} from 'unist-util-visit'
import {parse as parseYaml} from 'yaml'

export const FIGMA_FILE_KEY = 'kc69gOteR1MsL0aQtLdxLW'

const APP_ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIRECTORY = path.join(APP_ROOT, 'content')
const OUTPUT_DIRECTORY = path.join(APP_ROOT, 'public/images/figma')
const FILENAME_FORMAT = '{nodeName}-{nodeId}'
const FIGMA_IMAGE_PROPS = new Set(['src', 'darkModeSrc'])
const FIGMA_THUMBNAIL_FIELDS = new Set(['thumbnail', 'thumbnail_darkMode'])
const mdxParser = unified().use(remarkParse).use(remarkFrontmatter, ['yaml']).use(remarkMdx)

export function extractFigmaUrls(content, source = 'MDX content') {
  const urls = []
  let tree

  try {
    tree = mdxParser.parse({value: content, path: source})
  } catch (error) {
    throw new Error(`${source}: unable to parse MDX: ${error.message}`)
  }

  visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], node => {
    if (node.name !== 'FigmaImage') return

    for (const attribute of node.attributes) {
      if (attribute.type !== 'mdxJsxAttribute' || !FIGMA_IMAGE_PROPS.has(attribute.name)) continue

      if (typeof attribute.value !== 'string') {
        throw new Error(
          `${formatNodeLocation(source, attribute)}: FigmaImage ${attribute.name} must be a static quoted URL.`,
        )
      }

      urls.push(attribute.value)
    }
  })

  visit(tree, 'yaml', node => {
    let frontmatter

    try {
      frontmatter = parseYaml(node.value)
    } catch (error) {
      throw new Error(`${formatNodeLocation(source, node)}: unable to parse frontmatter: ${error.message}`)
    }

    if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) return

    for (const [field, value] of Object.entries(frontmatter)) {
      if (FIGMA_THUMBNAIL_FIELDS.has(field) && typeof value === 'string' && isFigmaHostedUrl(value)) {
        urls.push(value)
      }
    }
  })

  return [...new Set(urls)]
}

export async function discoverFigmaUrls(contentDirectory = CONTENT_DIRECTORY) {
  const files = await findMdxFiles(contentDirectory)
  const discovered = []
  const errors = []

  for (const filePath of files) {
    try {
      const content = await fs.readFile(filePath, 'utf8')
      for (const url of extractFigmaUrls(content, filePath)) {
        discovered.push({url, filePath})
      }
    } catch (error) {
      errors.push(error.message)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Unable to discover Figma images:\n- ${errors.join('\n- ')}`)
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
    throw new Error(`${source}: "${url}" must use an HTTPS design, file, or board node URL from www.figma.com.`)
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

  if (parsedNode.fileId !== FIGMA_FILE_KEY) {
    throw new Error(
      `${source}: Figma file key "${parsedNode.fileId}" is not approved. Use a frame from the Brand Interface Guidelines file (${FIGMA_FILE_KEY}).`,
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

  return [...new Map(validated.map(image => [image.basename, image])).values()]
}

export async function generateFigmaImages(
  validated,
  token,
  outputDirectory = OUTPUT_DIRECTORY,
  filenameFormat = FILENAME_FORMAT,
) {
  if (!token) {
    throw new Error(
      'FIGMA_ACCESS_TOKEN is required to generate Figma images. Add it to apps/next-docs/.env.local or your shell environment.',
    )
  }

  await figmaImages(token, {
    nodeURLs: validated.map(image => image.canonicalUrl),
    outputDir: outputDirectory,
    missingImagesLogLevel: 'fail',
    filenameFormat,
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

function isFigmaHostedUrl(value) {
  try {
    return ['figma.com', 'www.figma.com'].includes(new URL(value).hostname)
  } catch {
    return false
  }
}

function formatNodeLocation(source, node) {
  return node.position?.start.line ? `${source}:${node.position.start.line}:${node.position.start.column}` : source
}

export async function verifyFigmaImageAssets(validated, outputDirectory = OUTPUT_DIRECTORY) {
  const manifestPath = path.join(outputDirectory, 'images.json')
  let manifest

  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
  } catch (error) {
    throw new Error(`Unable to read the generated Figma image manifest at ${manifestPath}: ${error.message}`)
  }

  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error(`The generated Figma image manifest at ${manifestPath} must contain an object.`)
  }

  const expectedBasenames = new Set(validated.map(image => image.basename))
  const staleManifestEntries = Object.keys(manifest).filter(basename => !expectedBasenames.has(basename))
  if (staleManifestEntries.length > 0) {
    throw new Error(`Manifest entries remain for unreferenced Figma images: ${staleManifestEntries.join(', ')}`)
  }

  const expectedFiles = new Set()

  for (const image of validated) {
    const manifestEntry = manifest[image.basename]
    if (
      !manifestEntry ||
      !Number.isFinite(manifestEntry.width) ||
      !Number.isFinite(manifestEntry.height) ||
      typeof manifestEntry.filename !== 'string'
    ) {
      throw new Error(`The manifest entry for ${image.originalUrl} must include width, height, and filename.`)
    }
    expectedFiles.add(manifestEntry.filename)
  }

  const generatedFiles = (await fs.readdir(outputDirectory, {withFileTypes: true}))
    .filter(entry => entry.name !== 'images.json')
    .map(entry => entry.name)
  const staleGeneratedFiles = generatedFiles.filter(filename => !expectedFiles.has(filename))
  if (staleGeneratedFiles.length > 0) {
    throw new Error(`Generated files remain for unreferenced Figma images: ${staleGeneratedFiles.join(', ')}`)
  }

  for (const image of validated) {
    const manifestEntry = manifest[image.basename]
    try {
      await fs.access(path.join(outputDirectory, manifestEntry.filename))
    } catch {
      throw new Error(`Generated image is missing for ${image.originalUrl}: ${manifestEntry.filename}`)
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
