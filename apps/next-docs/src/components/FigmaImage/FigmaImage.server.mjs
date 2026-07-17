import fs from 'node:fs'
import path from 'node:path'
import {parseFigmaNodeUrl} from '@primer/figma-images/parseFigmaNodeUrl'

const FIGMA_IMAGE_DIRECTORY = path.join(process.cwd(), 'public/images/figma')
const FIGMA_IMAGE_MANIFEST_PATH = path.join(FIGMA_IMAGE_DIRECTORY, 'images.json')
const DOCTOCAT_BASE_PATH = process.env.GITHUB_ACTIONS === 'true' ? '/brand' : ''
const FIGMA_IMAGE_MANIFEST = readFigmaImageManifest()

function readFigmaImageManifest() {
  if (!fs.existsSync(FIGMA_IMAGE_MANIFEST_PATH)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(FIGMA_IMAGE_MANIFEST_PATH, 'utf8'))
}

function normalizeFigmaNodeUrl(url) {
  const parsedUrl = new URL(url, 'https://www.figma.com')
  const nodeId = parsedUrl.searchParams.get('node-id')

  if (nodeId) {
    parsedUrl.searchParams.set('node-id', nodeId.replaceAll(':', '-'))
  }

  return parsedUrl.toString()
}

export function resolveFigmaImageSource(url, basePath = DOCTOCAT_BASE_PATH) {
  try {
    const parsedNode = parseFigmaNodeUrl(normalizeFigmaNodeUrl(url))

    if (!parsedNode) {
      return {
        editUrl: url,
        missingReason: 'The selected Figma frame URL could not be parsed.',
      }
    }

    const manifestEntry = FIGMA_IMAGE_MANIFEST[parsedNode.basename]
    const imagePath = path.join(FIGMA_IMAGE_DIRECTORY, parsedNode.filename)

    if (!fs.existsSync(imagePath)) {
      return {
        editUrl: url,
        width: manifestEntry?.width,
        height: manifestEntry?.height,
        missingReason: 'The generated preview image is missing for this Figma frame.',
      }
    }

    return {
      assetUrl: `${basePath}/images/figma/${parsedNode.filename}`,
      editUrl: url,
      width: manifestEntry?.width,
      height: manifestEntry?.height,
    }
  } catch {
    return {
      editUrl: url,
      missingReason: 'The selected Figma frame URL could not be parsed.',
    }
  }
}

export function resolveFigmaPageMapThumbnails(pageMap) {
  return pageMap.map(item => {
    const resolvedItem = {...item}

    if ('children' in item) {
      resolvedItem.children = resolveFigmaPageMapThumbnails(item.children)
    }

    if ('frontMatter' in item && item.frontMatter) {
      resolvedItem.frontMatter = {
        ...item.frontMatter,
        thumbnail: resolveFigmaThumbnail(item.frontMatter.thumbnail, item.route),
        thumbnail_darkMode: resolveFigmaThumbnail(item.frontMatter.thumbnail_darkMode, item.route),
      }
    }

    return resolvedItem
  })
}

function resolveFigmaThumbnail(value, route) {
  if (typeof value !== 'string' || !value.startsWith('https://www.figma.com/')) {
    return value
  }

  const resolved = resolveFigmaImageSource(value, '')

  if (!resolved.assetUrl) {
    throw new Error(`${route}: ${resolved.missingReason}`)
  }

  return resolved.assetUrl
}
